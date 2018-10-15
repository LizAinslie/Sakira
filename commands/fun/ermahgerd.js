const Command = require("../../structures/Command")
const ermahgerd = require("node-ermahgerd")

module.exports = class ermahgerdCommand extends Command {
    constructor(client) {
        super(client, {
            name: "ermahgerd",
            group: "fun",
            memberName: "ermahgerd",
            description: "Ermahgerd it!",
            examples: ["ermahgerd"],
            args: [
                {
                    key: "input",
                    prompt: "What do you want to ermahgerdify?",
                    type: "string"
                }
            ]
        })
    }
    run(msg, { input }) {
        return msg.say(ermahgerd.translate(input))
    }
}
