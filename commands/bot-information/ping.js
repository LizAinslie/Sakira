const Command = require("../../structures/Command")
const { MessageEmbed } = require("discord.js")

module.exports = class PingCommand extends Command {
    constructor(client) {
        super(client, {
            name: "ping",
            memberName: "ping",
            group: "bot-information",
            description: "Ping pong paddy yong.",
            examples: ["ping"]
        })
    }
    async run(msg) {
        const sent = await msg.say("Ponging...")
        const embed = new MessageEmbed()
            .setTitle("Pong!")
            .setColor("0x36393F")
            .addField("» Gateway:", this.client.ws.ping.toFixed(2) + "ms", true)
            .addField("» Message:", sent.createdTimestamp - msg.createdTimestamp + "ms", true)
        sent.edit(embed)
    }
}
