const Command = require("../../structures/Command")

module.exports = class markdownCommand extends Command {
    constructor(client) {
        super(client, {
            name: "markdown",
            aliases: ["md"],
            group: "fun",
            memberName: "markdown",
            description: "Discord Quick markdown",
            examples: ["wrapcode"]
        })
    }
    run(msg) {
        msg.say({file: "https://cdn.shodanbot.com/2849824/14fAAmethystgemclamia.png"})
    }
}
