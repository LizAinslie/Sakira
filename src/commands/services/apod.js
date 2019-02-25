const Command = require("../../structures/Command")
const { MessageEmbed } = require("discord.js")
const request = require("request")

module.exports = class ApodCommand extends Command {
    constructor(client) {
        super(client, {
            name: "apod",
            group: "services",
            memberName: "apod",
            description: "Astronomy Picture of the Day",
            examples: ["apod"]
        })
    }

    run(msg) {
        request("https://api.nasa.gov/planetary/apod?api_key=H4CFOXuqE5jfle1VkvMDhoLBfRboxyOlC2VncL2m", function(error, response, body) {
            var apod = JSON.parse(body)
            const embed = new MessageEmbed()
                .setTitle(`Astronomy Picture of the Day: ${apod.title}`)
                .setDescription(apod.explanation)
                .setColor("0x36393F")
                .setImage(apod.hdurl)
                .setFooter(`Copyright ${apod.copright}`)
                .setTimestamp(apod.date)
            return msg.embed(embed)
        })

    }
}
