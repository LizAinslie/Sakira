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
        try{ 
            const options = {
                url: `https://api.github.com/users/${name}`,
                headers: {
                "User-Agent": "Sakira"
                }
            }
            request(options, function(error, response, body) {
                const git = JSON.parse(body)
                const embed = new MessageEmbed()
                    .setDescription((git.bio) ? git.bio : "Not set")
                    .addField("­", `**Public Repos**: ${(git.repos) ? git.repos : "None"}**\nFollowers**: ${git.followers}**\nName**: ${(git.name) ? git.name : "None set"}`, true)
                    .addField("­", `**Following**: ${git.following}**\nUrl**: ${git.html_url}`, true)
                    .setThumbnail(git.avatar_url)
                    //.setTimestamp(git.created_at)
                    .setFooter("Profile created ")
                    .setColor("0x36393F")
                    .setTitle(`${git.login}'s Github Profile`)
                msg.embed(embed)
            })
        }catch(e){
            msg.say(`An error occured: \n ${e}`)
        }
    }
}
