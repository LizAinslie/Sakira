const Command = require("../../structures/Command")

module.exports = class setAutoRoleCommand extends Command {
    constructor(client){
        super(client, {
            name: "reset-settings",
            group: "administrative",
            memberName: "reset-settings",
            description: "Reset all guild specific settings",
            userPermissions: ["ADMINISTRATOR"]
        })
    }
    async run(msg){
        const om = await msg.say("Are you sure you wish to do that?")
        om.react("✅")
        om.react("❌")
        const yes = (reaction, user) => reaction.emoji.name === "✅" && user.id === msg.author.id
        const no = (reaction, user) => reaction.emoji.name === "❌" && user.id === msg.author.id
        const yc = om.createReactionCollector(yes)
        const nc = om.createReactionCollector(no)
        yc.on("collect", async function() {
            om.reactions.removeAll()
            await msg.guild.settings.remove("arr")
            await msg.guild.settings.remove("wc")
            await msg.guild.settings.remove("wm")
            await om.edit("I reset all my settings in **this** guild")
        })
        nc.on("collect", async function() {
            om.reactions.removeAll()
            await om.edit("I left the settings the way they were")
        })
    }
}