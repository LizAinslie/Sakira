const Command = require("../../structures/Command")
const request = require("request")
const image2base64 = require("image-to-base64")
const { MessageEmbed } = require("discord.js")
const Anime = require("malapi").Anime
const { shorten } = require("../../util/Util")

module.exports = class tracemoeCommand extends Command {
    constructor(client) {
        super(client, {
            name: "anime-trace",
            aliases: ["trace.moe"],
            group: "services",
            memberName: "trace",
            description: "Searchs trace.moe for the given screenshot",
            args: [{
                key: "image",
                prompt: "What image do you want to lookup?",
                type: "image",
            }],
            throttling: {
                usages: 5,
                duration: 10,
            }
        })
    }

    async run(msg, { image }) {
        const imageURL = await image2base64(image)
        const options = {
            method: "POST",
            url: "https://trace.moe/api/search",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({image: `data:image/jpeg;base64,${imageURL}`})
        }
        try {
            request(options, function(error, response, body) {
                body = JSON.parse(body)
                Anime.fromId(body.docs[0].mal_id).then(anime => {
                    const embed = new MessageEmbed()
                        .setTitle(`${body.docs[0].anime} - Episode ${body.docs[0].episode} - ${body.docs[0].title_english}`)
                        .setDescription(shorten(anime.synopsis.replace("[Written by MAL Rewrite]", ""), 250))
                        .setColor("0x36393F")
                        .setFooter(`Genre(s): ${anime.genres.join(", ")}`)
                        .addField("­", `Rating (/10): **${anime.statistics.score.value}**\nVote #: **${anime.statistics.score.count}**\n**[Episodes](${anime.episodesLink})**`, true)
                        .addField("­", `Episodes: **${anime.episodes}**\nSeason: **${body.docs[0].season}**\n**[Details](${anime.detailsLink})**`, true)
                        .setThumbnail(anime.image)
                    msg.embed(embed)
                })
            })
        } catch (error) {
            msg.say("Welp: \`\`\`" + error + "\`\`\`")
        }
    }
}