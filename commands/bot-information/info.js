const Command = require("../../structures/Command")
const { MessageEmbed } = require("discord.js")
const { OWNERS } = process.env
const circleci = require("circleci")
const ci = new circleci({
    auth: "7fdb048a9001fd58e6f86d35bb81f252b1b38408"
})

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
        const res = await ci.getBuilds({ username: "axelgreavette", project: "Sakira" })
        
        const embed = new MessageEmbed()
            .setTitle(this.client.user.username)
            .setColor("0x36393F")
            .setDescription("A bot with enough features to make you want to ~~die~~ jump up and down")
            .addField(`Creator${(OWNERS.split(",").length === 1) ? ":":"s:"}`, "**Kirox#3435** and **Kerox#1558**")
            .addField("Code:", "My entire source is available on [Github](https://github.com/axelgreavette/sakira)")
            .addField("Build:", `${res[0].status === "success" ? "Passing" : "Failing"}`)
        msg.embed(embed)
    }
}
