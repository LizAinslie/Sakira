const Command = require("../../structures/Command")
const { MessageEmbed } = require("discord.js")
const request = require("node-superfetch")

module.exports = class MDNCommand extends Command {
    constructor(client) {
        super(client, {
            name: "mdn",
            aliases: ["mozilla-developer-network"],
            group: "services",
            memberName: "mdn",
            description: "Searches MDN for your query.",
            clientPermissions: ["EMBED_LINKS"],
            args: [
                {
                    key: "query",
                    prompt: "What article would you like to search for?",
                    type: "string",
                    parse: query => query.replace(/#/g, ".prototype.")
                }
            ]
        })
    }

    async run(msg, { query }) {
        try {
            const { body } = await request
                .get("https://developer.mozilla.org/en-US/search.json")
                .query({
                    q: query,
                    locale: "en-US",
                    highlight: false
                })
            if (!body.documents.length) return msg.say("Could not find any results.")
            const data = body.documents[0]
            const embed = new MessageEmbed()
                .setColor("0x36393F")
                .setAuthor("MDN", "https://i.imgur.com/DFGXabG.png", "https://developer.mozilla.org/")
                .setURL(data.url)
                .setTitle(data.title)
                .setDescription(data.excerpt)
            return msg.embed(embed)
        } catch (err) {
            return msg.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`)
        }
    }
}