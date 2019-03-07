const Command = require("../../structures/Command")
const { join } = require("path")

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
        msg.say({files: [{attachment: join(__dirname, "..", "..", "assets", "images", "14fAAmethystgemclamia.png"), name:"Markdown.png" }] })
    }
}
