const Command = require("../../structures/Command")
const { MessageEmbed } = require("discord.js")
const request = require("node-superfetch")
const { shorten } = require("../../util/Util")

module.exports = class WikipediaCommand extends Command {
    constructor(client) {
        super(client, {
            name: "wikipedia",
            aliases: ["wikipedia-article"],
            group: "services",
            memberName: "wikipedia",
            description: "Searches Wikipedia for your query.",
            clientPermissions: ["EMBED_LINKS"],
            nsfw: true,
            args: [
                {
                    key: "query",
                    prompt: "What article would you like to search for?",
                    type: "string"
                }
            ]
        })
    }

    async run(msg, { query }) {
        try {
            const { body } = await request
                .get("https://en.wikipedia.org/w/api.php")
                .query({
                    action: "query",
                    prop: "extracts|pageimages",
                    format: "json",
                    titles: query,
                    exintro: "",
                    explaintext: "",
                    pithumbsize: 150,
                    redirects: "",
                    formatversion: 2
                })
            const data = body.query.pages[0]
            if (data.missing) return msg.say("Welp the results ran off...")
            const embed = new MessageEmbed()
                .setColor("0x36393F")
                .setTitle("Wikipedia | " + data.title)
                .setThumbnail(data.thumbnail ? data.thumbnail.source : null)
                .setURL(`https://en.wikipedia.org/wiki/${encodeURIComponent(query).replace(/\)/g, "%29")}`)
                .setDescription(shorten(data.extract.replace(/\n/g, "\n\n")))
            return msg.embed(embed)
        } catch (err) {
            return msg.reply(`Oh welp, an error occurred: \`${err.message}\`. Try again later!`)
        }
    }
}