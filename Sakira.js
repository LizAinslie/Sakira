require("dotenv").config()
const { SAKIRA_TOKEN, OWNERS, SAKIRA_PREFIX, INVITE, TWITCH_CLIENT_ID } = process.env
const path = require("path")
const Client = require("./structures/Client")
const request = require("request")
const trbmb = require("./util/Trbmb")
const sqlite = require("sqlite")
const { SQLiteProvider } = require("discord.js-commando")

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
client.on("debug", dbg => {
    console.debug(dbg)
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
client.on("unknownCommand", msg => {
    try{
        if(msg.content.match(/^\$/ || /^>>/) || msg.content.startsWith(msg.guild._commandPrefix)) return false
        const input = msg.content.replace(`<@${client.user.id}> `, "").replace(`<!@${client.user.id}> `, "")
        if (encodeURI(input.toUpperCase()) === "IP") return msg.channel.send("haha yeah no")
        request(`http://ask.pannous.com/api?input=${input}`, function (error, response, body) {
            body = JSON.parse(body)
            msg.channel.send((body.output[0]) ? body.output[0].actions.say.text.replace("Jeannie", "Sakira") : new trbmb().trbmb)
        })
    }catch(e){
        console.log(e)
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
