const Command = require("../../structures/Command")
const { MessageEmbed } = require("discord.js")

module.exports = class inviteCommand extends Command {
    constructor(client) {
        super(client, {
            name: "invite",
            group: "bot-information",
            memberName: "invite",
            description: "Invite me to your guild",
            examples: ["invite"]
        })
    }
    run(msg) {
        const embed = new MessageEmbed()
            .setTitle("Invite Link:")
            .setDescription("[Click Here](https://discordapp.com/api/oauth2/authorize?client_id=477658589742497792&permissions=8&scope=bot )")
            .setColor("0x36393F")
        msg.embed(embed)
    }
}
