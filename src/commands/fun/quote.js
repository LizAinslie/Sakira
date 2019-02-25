const Command = require("../../structures/Command")
const request = require("request")
const { MessageEmbed } = require("discord.js")

module.exports = class quoteCommand extends Command {
    constructor(client) {
        super(client, {
            name: "quote",
            aliases: ["inspiration", "inspirational-quote", "inspire"],
            group: "fun",
            memberName: "quote",
            description: "Inspirational quotes",
            examples: ["quote"]
        })
    }
    run(msg) {
        request("http://inspirobot.me/api?generate=true&oy=vey", function(error, response, body) {
            const embed = new MessageEmbed()
                .setImage(body)
                .setColor("0x36393F")
            return msg.embed(embed)
        })
    }
}
