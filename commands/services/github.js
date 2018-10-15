const Command = require("../../structures/Command")
const { MessageEmbed } = require("discord.js")
const request = require("request")

module.exports = class githubCommand extends Command {
    constructor(client) {
        super(client, {
            name: "github",
            group: "services",
            aliases: ["gh", "git"],
            memberName: "github",
            description: "Lookup a Github user",
            examples: ["github"],
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
        const options = {
            url: `https://api.github.com/users/${name}`,
            headers: {
                "User-Agent": "Sakira"
            }
        }
        request(options, function(error, response, body) {
            const git = JSON.parse(body)
            let daBio = git.bio
            let daName
            let daRepos
            if (git.bio == null) {
                daBio = "No bio set"
            } else if (git.bio != null) {
                daBio = git.bio
            }
            if (git.name == null) {
                daName = "No name set"
            } else if (git.name != null) {
                daName = git.name
            }
            if (git.public_repos == null) {
                daRepos = "No Public Repos"
            } else if (git.public_repos != null) {
                daRepos = git.public_repos
            }
            //console.log(git)
            const embed = new MessageEmbed()
                .setDescription(daBio)
                .addField("­", `**Public Repos**: ${daRepos}**\nFollowers**: ${git.followers}**\nName**: ${daName}`, true)
                .addField("­", `**Following**: ${git.following}**\nUrl**: ${git.html_url}`, true)
                .setThumbnail(git.avatar_url)
                .setTimestamp(git.created_at)
                .setFooter("Profile created ")
                .setColor("0x36393F")
                .setTitle(`${git.login}'s Github Profile`)
            msg.embed(embed)
        })
    }
}
