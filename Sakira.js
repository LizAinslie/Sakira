require("dotenv").config()
const { SAKIRA_TOKEN, OWNERS, SAKIRA_PREFIX, INVITE, TWITCH_CLIENT_ID, SAKIRA_VERSION, SAKIRA_SENTRY_DSN } = process.env
const path = require("path")
const Client = require("./structures/Client")
const request = require("request")
//const trbmb = require("./util/Trbmb")
const sqlite = require("sqlite")
const { SQLiteProvider } = require("discord.js-commando")
//const Sentry = require("@sentry/node")

/*sentry initialization
Sentry.init({ 
    dsn: SAKIRA_SENTRY_DSN,
    release: `sakira@${SAKIRA_VERSION}`
})
*/
//client setup
const client = new Client({
    commandPrefix: SAKIRA_PREFIX,
    owner: OWNERS.split(","),
    invite: INVITE,
    disableEveryone: true,
    unknownCommandResponse: false
})


sqlite.open(path.join(__dirname, "database.sqlite3")).then((db) => {
    client.setProvider(new SQLiteProvider(db))
})


//register commands
client.registry
    .registerDefaultTypes()
    .registerTypesIn(path.join(__dirname, "types"))
    .registerGroups([
        ["fun", "Fun:"],
        ["services", "Services:"],
        ["tags", "Tags:"],
        ["administrative", "Administrative:"],
        ["bot-information", "Bot Information:"],
        ["profiles", "Profiles:"],
        ["owner", "Bot Owner:"],
        ["voice", "Voice Chat:"]
    ])
    .registerDefaultGroups()
    .registerDefaultCommands({
        ping: false,
        commandState: false,
        eval: false
    })
    .registerCommandsIn(path.join(__dirname, "commands"))


//events
client.on("ready", () => {
    console.log("Logged into Discord as Sakira")
    var options = {
        url: "https://api.twitch.tv/helix/streams?user_login=axelgreavette",
        headers: {
            "Client-ID": TWITCH_CLIENT_ID
        }
    }
    //request to twitch
    request(options, function(error, response, body) {
        try {
            var bod = JSON.parse(body)
            if (bod.data[0] == undefined) {
                client.user.setActivity("YmlyZSBQbmZmdnFs", {
                    type: "WATCHING"
                })
            } else {
                client.user.setActivity(bod.data[0].title, {
                    type: "STREAMING",
                    url: "https://twitch.tv/axelgreavette"
                })
                console.log(`Set presence to "Streaming ${bod.data[0].title}"`)
            }
        } catch (e) {
            console.log(`${e}`)
        }
    })
    //interval
    setInterval(() => {
        request(options, function(error, response, body) {
            try {
                var bod = JSON.parse(body)
                if (bod.data[0] == undefined) {
                    client.user.setActivity("YmlyZSBQbmZmdnFs", {
                        type: "WATCHING"
                    })
                } else {
                    client.user.setActivity(bod.data[0].title, {
                        type: "STREAMING",
                        url: "https://twitch.tv/axelgreavette"
                    })
                    console.log(`Set presence to "Streaming ${bod.data[0].title}"`)
                }
            } catch (e) {
                console.log(`${e}`)
            }
        })
    }, 300000)
})
client.on("error", e => {
    console.log(e)
})
client.on("warn", warn => {
    console.warn(warn)
})
client.on("rateLimit", function (msg, rateLimitInfo) {
    msg.channel.send("An error occured. Please try again momentarily.")
    console.log(JSON.stringify(rateLimitInfo))
})
client.on("disconnect", e => {
    setInterval(() => {
        client.login(SAKIRA_TOKEN)
    }, 120000)
    console.log(e)
})
client.on("reconnect", () =>{
    console.log("I reconnected successfully")
})
/* Disabled until it's fixed
client.on("unknownCommand", msg => {
    try{
        if ((msg.guild) ? !msg.content.startsWith(msg.guild._commandPrefix) : !msg.content.match(/^\$/) && !msg.content.match(/^\>\>/)) {
            return false
        }else if(msg.channel.type === "dm"){
            return false
        }else{
            const input = msg.content.replace(`<@${client.user.id}> `, "").replace(`<!@${client.user.id}> `, "")
            msg.channel.startTyping()
            if (encodeURI(input.toUpperCase()) === "IP") return msg.channel.send("haha yeah no")
            request(`http://ask.pannous.com/api?input=${input}`, function (error, response, body) {
                body = JSON.parse(body)
                msg.channel.send((body.output[0]) ? body.output[0].actions.say.text.replace("Jeannie", "Sakira") : new trbmb().trbmb)
            })
            msg.channel.stopTyping()
        }
    }catch(e){
        console.log(e)
    }
})
*/
client.on("guildMemberAdd", async (member) => {
    if (member.guild.settings.get("wc") && member.guild.settings.get("wm")) {
        const wc = await member.guild.channels.get(member.guild.settings.get("wc"))
        const wm = await member.guild.settings.get("wm")
        wc.send(wm.replace(/\$\$USER/g, member.displayName).replace(/\$\$GUILD/g, member.guild.name).replace(/\$\$MENTION/g, member))
    }
    if (member.guild.settings.get("arr")) {
        await member.roles.add(member.guild.settings.get("arr"))
    }
})

process.on("unhandledRejection", r=>{
    setInterval(() => {
        client.login(SAKIRA_TOKEN)
    }, 120000)
    console.log(r)
})

//login to client
client.login(SAKIRA_TOKEN)
