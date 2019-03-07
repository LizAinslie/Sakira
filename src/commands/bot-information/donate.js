const Command = require("../../structures/Command")
const { MessageEmbed } = require("discord.js")

module.exports = class DonateCommand extends Command {
    constructor(client) {
        super(client, {
            name: "donate",
            aliases: ["patreon", "paypal"],
            group: "bot-information",
            memberName: "donate",
            description: "Responds with the bot's donation links.",
            guarded: true
        })
    }

    run(msg) {
        const embed = new MessageEmbed()
            .setTitle("Donation Links:")
            .setDescription("Contribute to Sakira (and other projects) continued development!")
            .setColor("0x36393F")
            .addField("­", "**[Patreon](https://www.patreon.com/bePatron?u=10511182)**")
            .addField("­", "**[Paypal](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=MKJAGRH3FSD68&item_name=To+buy+a+Coca+Cola+with&currency_code=CAD&amount=5&source=url)**")
        msg.embed(embed)
    }
}
