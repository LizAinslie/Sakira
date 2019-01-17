const Command = require("../../structures/Command")
const moment = require("moment")
const { MessageEmbed } = require("discord.js")
const request = require("node-superfetch")
const { shorten } = require("../../util/Util")
const { GITHUB } = process.env


module.exports = class GithubCommand extends Command {
    constructor(client) {
        super(client, {
            name: "github-repo",
            aliases: ["github-repository", "gh-repo"],
            group: "services",
            memberName: "repo",
            description: "Responds with information on the inputed Github repo.",
            clientPermissions: ["EMBED_LINKS"],
            args: [
                {
                    key: "author",
                    prompt: "I need an author to search for",
                    type: "string",
                    parse: author => encodeURIComponent(author)
                },
                {
                    key: "repository",
                    prompt: "And a repo that they own to retrieve.",
                    type: "string",
                    parse: repository => encodeURIComponent(repository)
                }
            ]
        })
    }

    async run(msg, { author, repository }) {
        try {
            const { body } = await request
                .get(`https://api.github.com/repos/${author}/${repository}`)
                .set({ Authorization: GITHUB })
            const embed = new MessageEmbed()
                .setColor("0x36393F")
                .setTitle(body.full_name)
                .setURL(body.html_url)
                .setDescription(body.description ? shorten(body.description) : "No description.")
                .setThumbnail(body.owner.avatar_url)
                .addField("­", `Stars: **${body.stargazers_count}**\nForks: **${body.forks}**\nIssues: **${body.open_issues}**`, true)
                .addField("­", `Language: **${body.language || "???"}**\nCreation Date: **${moment.utc(body.created_at).format("MM/DD/YYYY h:mm A")}**\nModification Date: **${moment.utc(body.updated_at).format("MM/DD/YYYY h:mm A")}**`, true)
            return msg.embed(embed)
        } catch (err) {
            if (err.status === 404) return msg.say("I'm sowwy mistwah, I couwdn't fwind any wesults fuh dawt...")
            return msg.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`)
        }
    }
}