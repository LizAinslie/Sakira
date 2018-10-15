const Command = require("../../structures/Command")
const { MessageEmbed } = require("discord.js")

module.exports = class supportCommand extends Command {
    constructor(client) {
        super(client, {
            name: "support",
            group: "bot-information",
            memberName: "support",
            description: "Invite to the support guild",
            examples: ["support"]
        })
    }
    run(msg) {
        const embed = new MessageEmbed()
            .setTitle("Support Guild Invite Link:")
            .setDescription("[Click Here](https://discord.gg/yw6nrwz)")
            .setColor("0x36393F")
        msg.embed(embed)
    }
}
