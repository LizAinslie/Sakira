const Command = require("../../structures/Command")
const { MessageEmbed } = require("discord.js")
const request = require("request")

module.exports = class npmCommand extends Command {
    constructor(client) {
        super(client, {
            name: "npm",
            group: "services",
            memberName: "npm",
            description: "Lookup NPM packages",
            examples: ["npm"],
            args: [
                {
                    key: "name",
                    prompt: "Whats the packages name?",
                    type: "string"
                }
            ]
        })
    }
    run(msg, { name }) {
        request(`https://registry.npmjs.com/${name}`, function(error, response, body) {
            const npm = JSON.parse(body)
            let maintainers = []
            npm.maintainers.forEach(n => {
                maintainers.push(n.name)
            })
            const embed = new MessageEmbed()
                .setTitle(npm.name)
                .setDescription(npm.description)
                .setURL(`https://npmjs.com/package/${name}`)
                .addField("Author:", npm.author.name, true)
                .addField("License:", npm.license, true)
                .addField("Maintainers:", maintainers.join(", "), true)
                .setColor("0x36393F")
                .setFooter(`Latest v${npm["dist-tags"].latest ? npm["dist-tags"].latest : "????"}`)
            msg.embed(embed)
        })
    }
}
