const Command = require("../../structures/Command")

module.exports = class setAutoRoleCommand extends Command {
    constructor(client) {
        super(client, {
            name: "remove-welcome",
            group: "administrative",
            memberName: "remove-welcome",
            description: "Remove the set welcome message and channel",
            userPermissions: ["ADMINISTRATOR"]
        })
    }
    async run(msg) {
        const om = await msg.say("Are you sure you wish to remove that?")
        om.react("✅")
        om.react("❌")
        const yes = (reaction, user) => reaction.emoji.name === "✅" && user.id === msg.author.id
        const no = (reaction, user) => reaction.emoji.name === "❌" && user.id === msg.author.id
        const yc = om.createReactionCollector(yes)
        const nc = om.createReactionCollector(no)
        yc.on("collect", async function () {
            om.reactions.removeAll()
            await msg.guild.settings.remove("arr")
            await om.edit("I removed the welcome message and channel")
        })
        nc.on("collect", async function () {
            om.reactions.removeAll()
            await om.edit("I left the settings in place.")
        })
    }
}