const Command = require("../../structures/Command")

module.exports = class ScientificNotationCommand extends Command {
    constructor(client) {
        super(client, {
            name: "scientific-notation",
            aliases: ["science-notation", "exponential-notation"],
            group: "services",
            memberName: "scientific-notation",
            description: "Converts a given number to scientific notation.",
            args: [
                {
                    key: "number",
                    prompt: "What number do you want to convert to scientific notation?",
                    type: "float"
                }
            ]
        })
    }

    run(msg, { number }) {
        return msg.say(number.toExponential())
    }
}