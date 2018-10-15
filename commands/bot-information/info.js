const Command = require("../../structures/Command")
const { MessageEmbed } = require("discord.js")
const { OWNERS } = process.env

module.exports = class infoCommand extends Command {
    constructor(client) {
        super(client, {
            name: "info",
            group: "bot-information",
            memberName: "info",
            description: "General bot infomation.",
            examples: ["info"]
        })
    }
    async run(msg) {
        const embed = new MessageEmbed()
            .setTitle(this.client.user.username)
            .setColor("0x36393F")
            .setDescription("A bot with enough features to make you want to ~~die~~ jump up and down")
            .addField(`Creator${(OWNERS.split(",").length === 1) ? ":":"s:"}`, "**Kirox#3435** and **Kerox#1558**")
            .addField("Code:", "My entire source is available on [Github](https://github.com/axelgreavette/sakira)")
        msg.embed(embed)
    }
}
