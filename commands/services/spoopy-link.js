const Command = require("../../structures/Command")
const request = require("node-superfetch")
const { MessageEmbed } = require("discord.js")
const { firstUpperCase } = require("../../util/Util")

module.exports = class SpoopyLinkCommand extends Command {
    constructor(client) {
        super(client, {
            name: "spoopy-link",
            aliases: ["spooy-link", "link-check", "scary-link"],
            group: "services",
            memberName: "spoopy-link",
            description: "Determines if a link is spoopy [safe] or not. A ✅ means good and a ❌ means bad, and ℹ means more info",
            args: [
                {
                    key: "site",
                    prompt: "What site do you wish me to check?",
                    type: "string",
                    parse: site => encodeURIComponent(site)
                }
            ]
        })
    }

    async run(msg, { site }) {
        try {
            const { body } = await request.get(`https://spoopy.link/api/${site}`)
            if (body.chain[0].safe === true) msg.react("✅")
            if (body.chain[0].safe === false) {
                msg.react("❌")
                msg.react("ℹ")
                let info = (reaction, user) => reaction.emoji.name === "ℹ" && user.id === msg.author.id
                info = msg.createReactionCollector(info)
                info.on("collect", async () => {
                    const embed = new MessageEmbed()
                        .setTitle("Spoopiness Reasons:")
                        .setDescription(`\n${firstUpperCase(body.chain[0].reasons.join(", ").toLowerCase()).replace(/\_/g, " ")}`)
                    msg.embed(embed)
                })
            }
        } catch (err) {
            return msg.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`)
        }
    }
}