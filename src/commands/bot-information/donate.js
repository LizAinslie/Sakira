const Command = require("../../structures/Command")
const { stripIndents } = require("common-tags")

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
        return msg.say("Contribute to my (and other projects) continued development!\n**[Patreon](https://www.patreon.com/bePatron?u=10511182)** or **[Paypal](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=MKJAGRH3FSD68&item_name=To+buy+a+Coca+Cola+with&currency_code=CAD&amount=5&source=url)**")
    }
}
