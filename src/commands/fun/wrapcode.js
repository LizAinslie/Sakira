const Command = require("../../structures/Command")

module.exports = class wrapcodeCommand extends Command {
    constructor(client) {
        super(client, {
            name: "wrapcode",
            aliases: ["wrap", "wrapmini"],
            group: "fun",
            memberName: "wrapcode",
            description: "Discord Quick code markdown",
            examples: ["wrapcode"],
            nsfw: true
        })
    }
    run(msg) {
        msg.say("Surround code with:\n\\`\\`\\`language\nfoo = 42\n\\`\\`\\`\n\nThis outputs:\n\`\`\`foo = 42\`\`\`\n\nReplace \"language\" in the example with java, cpp, python, etc. There should no space/line between the language and the first backtick (\`), not to be confused with a single quote (').")
    }
}
