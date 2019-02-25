const Command = require("../../structures/Command")
const { MessageEmbed } = require("discord.js")
const request = require("request")

module.exports = class owCommand extends Command {
    constructor(client) {
        super(client, {
            name: "ow",
            aliases: ["overwatch"],
            group: "services",
            memberName: "ow",
            description: "Lookup Overwatch player stats",
            examples: ["ow"],
            args: [
                {
                    key: "platform",
                    prompt: "Whats the players platform?",
                    type: "string"
                },
                {
                    key: "region",
                    prompt: "What region is this player?",
                    type: "string"
                },
                {
                    key: "name",
                    prompt: "Whats the players name?",
                    type: "string"
                }

            ]
        })
    }
    run(msg, { name, platform, region }) {
        try{
            request(`https://ow-api.com/v1/stats/${platform}/${region}/${name.replace("#", "-")}/profile/`, function(error, response, body) {
                if(error) return msg.channel.send("An error occured. Please try again in a moment.")
                const ow = JSON.parse(body)
                const embed = new MessageEmbed()
                    .setTitle(`Profile for **${ow.name}**`)
                    .setColor("0x36393F")
                    .setThumbnail(ow.icon)
                    .addField("Level:", `**${ow.level}**`, true)
                    .addField("Rating:", `**${ow.ratingName}**`, true)
                    .addField("Total Games Won:", `**${ow.gamesWon}**`, true)
                    .addField("Total Medals Won:", `**${ow.quickPlayStats.awards.medals}**`, true)
                    .addBlankField(true)
                    .addBlankField(true)
                    .addField("Cards Won:", `**${ow.quickPlayStats.awards.cards}**`, true)
                    .addField("Bronze Medals Won:", `**${ow.quickPlayStats.awards.medalsBronze}**`, true)
                    .addField("Silver Medals Won:", `**${ow.quickPlayStats.awards.medalsSilver}**`, true)
                    .addField("Gold Medals Won:", `**${ow.quickPlayStats.awards.medalsGold}**`, true)

                //.setDescription(`Awards:\nCards: **${ow.quickPlayStats.awards.cards}**, Bronze Medals: **${ow.quickPlayStats.awards.medalsBronze}**, Silver Medals:**${ow.quickPlayStats.awards.medalsSilver}**, Gold Medals:**${ow.quickPlayStats.awards.medalsGold}**\nTotal Medal Count:**${ow.quickPlayStats.awards.medals}**`, true)
                msg.embed(embed)
            })
        }catch(e){
            msg.say("An error occured. Please try again.\nCommon causes are: Wrong order of given values, missing value, incorrect username")
        }
    }
}
