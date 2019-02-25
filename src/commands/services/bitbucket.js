const Command = require("../../structures/Command")
const { MessageEmbed } = require("discord.js")
const request = require("request")

module.exports = class bitbucketCommand extends Command {
    constructor(client) {
        super(client, {
            name: "bitbucket",
            group: "services",
            aliases: ["bb", "bit-bucket"],
            memberName: "bitbucket",
            description: "Lookup a BitBucket user",
            examples: ["bitbucket"],
            args: [
                {
                    key: "name",
                    prompt: "Whats the users name?",
                    type: "string"
                }
            ]
        })
    }
    run(msg, { name }) {
        request(`https://api.bitbucket.org/2.0/users/${name}`, function(error, response, body) {
            const bitbucket = JSON.parse(body)
            let isStaff = bitbucket.is_staff
            if (isStaff == true) {
                isStaff = "Yes <:bbl:465762458120749057>"
            } else {
                isStaff = "No"
            }
            //	console.log(bitbucket)
            const embed = new MessageEmbed()
                .setTitle(`BitBucket Profile for ${bitbucket.username}`)
                .setThumbnail(bitbucket.links.avatar.href)
                .setColor("0x36393F")
                .addField("­", `Name: **${bitbucket.display_name}**\nStaff: **${isStaff}**\nType: **${bitbucket.type}**`, true)
                .addField("­", `Link: **${bitbucket.links.html.href}**`, true)
                .setFooter("Profile created ")
                .setTimestamp(bitbucket.created_on)
            msg.embed(embed)
        })
    }
}
