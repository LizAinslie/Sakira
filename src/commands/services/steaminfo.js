const Command = require("../../structures/Command")
const { MessageEmbed } = require("discord.js")
const request = require("request")
const { STEAM } = process.env
const steam = require("steamidconvert")(STEAM)

module.exports = class steaminfoCommando extends Command {
    constructor(client) {
        super(client, {
            name: "steaminfo",
            group: "services",
            aliases: ["steam", "steam-info"],
            memberName: "steaminfo",
            description: "Lookup a Steam user",
            examples: ["steam"],
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
        steam.convertVanity(name, function(err, res) {
            if (err) {
                msg.say(`No user found with the name ${name}`)
            } else {
                request(`http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${STEAM}&steamids=${res}&format=json`, function(error, response, body) {
                    const steamData = JSON.parse(body)
                    const stm = steamData.response.players
                    const embed = new MessageEmbed()
                        .setTitle(`Userdata for ${stm[0].personaname}`)
                        .setThumbnail(stm[0].avatarfull)
                        .setColor("0x36393F")
                        .addField("­", `Name: **${stm[0].realname}**\nCountry: **${stm[0].loccountrycode}**\n`, true)
                        .addField("­", `SteamID: **${res}**\nSteamID64: **${steam.convertToText(res)}**\nNew SteamID: **${steam.convertToNewFormat(steam.convertToText(res))}**`, true)
                        .addBlankField(true)
                        .addField("­", `Base URL: **https://steamcommunity.com/${res}**\nVanity URL: **${stm[0].profileurl}**`)
                        .setFooter("api.steampowered.com")
                    msg.embed(embed)
                })
            }
        })
    }
}
