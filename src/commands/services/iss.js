const Command = require("../../structures/Command")
const { MessageEmbed } = require("discord.js")
const request = require("request")

module.exports = class issCommand extends Command {
    constructor(client) {
        super(client, {
            name: "iss",
            group: "services",
            memberName: "iss",
            description: "ISS stats",
            examples: ["iss"]
        })
    }

    run(msg) {
        request("https://api.wheretheiss.at/v1/satellites/25544", function(error, response, body) {
            const iss = JSON.parse(body)
            const embed = new MessageEmbed()
                .setTitle("Current ISS Location Stats:")
                .setColor("0x36393F")
                .addField("Latitude:", iss.latitude, true)
                .addField("Longitude:", iss.longitude, true)
                .addField("Altitude:", iss.altitude, true)
                .addField("Velocity:", iss.velocity, true)
                .addField("Visibility:", iss.visibility, true)
                .addField("Footprint:", iss.footprint, true)
            return msg.embed(embed)
        })

    }
}
