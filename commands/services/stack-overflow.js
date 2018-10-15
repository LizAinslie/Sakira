const Command = require("../../structures/Command")
const { MessageEmbed } = require("discord.js")
const request = require("node-superfetch")
const { STACK_OVERFLOW } = process.env

module.exports = class StackOverflowCommand extends Command {
    constructor(client) {
        super(client, {
            name: "stack-overflow",
            aliases: ["stack-exchange", "so"],
            group: "services",
            memberName: "stack-overflow",
            description: "Searches Stack Overflow for your query.",
            clientPermissions: ["EMBED_LINKS"],
            args: [
                {
                    key: "query",
                    prompt: "What question would you like to search for?",
                    type: "string"
                }
            ]
        })
    }

    async run(msg, { query }) {
        try {
            const { body } = await request
                .get("http://api.stackexchange.com/2.2/search/advanced")
                .query({
                    page: 1,
                    pagesize: 1,
                    order: "asc",
                    sort: "relevance",
                    answers: 1,
                    q: query,
                    site: "stackoverflow",
                    key: STACK_OVERFLOW
                })
            if (!body.items.length) return msg.say("Could not find any results.")
            const data = body.items[0]
            const embed = new MessageEmbed()
                .setColor("0x36393F")
                .setAuthor("Stack Overflow", "https://i.imgur.com/P2jAgE3.png", "https://stackoverflow.com/")
                .setURL(data.link)
                .setTitle(data.title)
                .addField("ID", data.question_id, true)
                .addField("Asker", `[${data.owner.display_name}](${data.owner.link})`, true)
                .addField("Views", data.view_count, true)
                .addField("Score", data.score, true)
                .addField("Creation Date", new Date(data.creation_date * 1000).toDateString(), true)
                .addField("Last Activity", new Date(data.last_activity_date * 1000).toDateString(), true)
            return msg.embed(embed)
        } catch (err) {
            return msg.reply(`Oh well that sucks, an error occurred: \`${err.message}\`. Try again later!`)
        }
    }
}