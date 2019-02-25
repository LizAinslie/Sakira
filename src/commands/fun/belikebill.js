const Command = require("../../structures/Command")
const { MessageEmbed } = require("discord.js")

module.exports = class BeLikeBillCommand extends Command {
    constructor(client) {
        super(client, {
            name: "belikebill",
            group: "fun",
            memberName: "belikebill",
            description: "Be Like Bill memes",
            examples: ["belikebill"],
            args: [
                {
                    key: "Name",
                    prompt: "What's your name?",
                    type: "string"
                },
                {
                    key: "Sex",
                    prompt: "What sex do you identify as?",
                    type: "string"
                }
            ]
        })
    }

    run(msg, { Name }, { Sex }) {
        const embed = new MessageEmbed()
            .setImage(`http://belikebill.azurewebsites.net/billgen-API.php?default=1&name=${Name}&sex=${Sex}`)
            .setColor("0x36393F")
        msg.embed(embed)
    }
}
