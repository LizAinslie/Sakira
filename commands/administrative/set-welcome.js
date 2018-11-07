const Command = require("../../structures/Command")

module.exports = class setWelcomeCommand extends Command {
    constructor(client){
        super(client, {
            name: "set-welcome",
            aliases: ["welcome-set"],
            group: "administrative",
            memberName: "set-welcome",
            description: "Set a server welcome message and or welcome channel. `$$USER` will be replaced with the users display name, `$$MENTION` will mention them, and `$$GUILD` will be replaced with the Guild's name",
            userPermissions: ["ADMINISTRATOR"],
            args: [
                {
                    key: "wc",
                    prompt: "What channel would you like to confine welcome messages to?",
                    type: "channel"
                },
                {
                    key: "wm",
                    prompt: "What do you want the welcome message to say?",
                    type: "string",
                    mix: 2,
                    max: 2500
                }
            ]
        })
    }
    async run(msg, { wm, wc }){
        if(msg.guild.settings.get("wc")){
            const m = await msg.say(`I am already bound to <#${await msg.guild.settings.get("wc")}>. Would you like to rebind my channel?`)
            m.react("✅")
            m.react("❌")
            const yes = (reaction, user) => reaction.emoji.name === "✅" && user.id === msg.author.id
            const no = (reaction, user) => reaction.emoji.name === "❌" && user.id === msg.author.id
            const yc = m.createReactionCollector(yes)
            const nc = m.createReactionCollector(no)
            yc.on("collect", () => {
                msg.guild.settings.set("wc", wc.id).then(async () => {
                    m.reactions.removeAll()
                    await m.edit(`Rebound my channel to <#${msg.guild.settings.get("wc")}>`)
                })
            })
            nc.on("collect", async () => {
                m.reactions.removeAll()
                await m.edit("I'll stay put then")
            })
        }
        if (msg.guild.settings.get("wm")) {
            const m = await msg.say("My welcome message is already set! Would you like to change it?")
            m.react("✅")
            m.react("❌")
            const yes = (reaction, user) => reaction.emoji.name === "✅" && user.id === msg.author.id
            const no = (reaction, user) => reaction.emoji.name === "❌" && user.id === msg.author.id
            const yc = m.createReactionCollector(yes)
            const nc = m.createReactionCollector(no)
            yc.on("collect", () => {
                msg.guild.settings.set("wm", wm).then(async ()=>{
                    m.reactions.removeAll()
                    await m.edit(`Changed my welcome message to\n${msg.guild.settings.get("wm")}`)
                })
            })
            nc.on("collect", async () => {
                m.reactions.removeAll()
                await m.edit("I'll keep it retro then.")
            })
        }
        if (!msg.guild.settings.get("wm") && !msg.guild.settings.get("wc")){
            await msg.guild.settings.set("wc", wc.id)
            await msg.guild.settings.set("wm", wm)
            await msg.say(`Bound myself to <#${wc.id}>, and set my greeting to \n"${wm}"`)
        }
    }
}