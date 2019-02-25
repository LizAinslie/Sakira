const Command = require("../../structures/Command")
const numerals = require("../../assets/json/roman-numeral.json")

module.exports = class RomanCommand extends Command {
    constructor(client) {
        super(client, {
            name: "roman",
            aliases: ["roman-numeral"],
            group: "services",
            memberName: "roman",
            description: "Converts a number to roman numerals.",
            args: [
                {
                    key: "number",
                    prompt: "What number would you like to convert to roman numerals?",
                    type: "integer",
                    min: 0,
                    max: 4999
                }
            ]
        })
    }

    run(msg, { number }) {
        if (number === 0) return msg.say("*NaN*... Oh wait yeah it is... How about *Not a Roman Numeral?*, or *NaRN* for short.")
        let result = ""
        for (const [numeral, value] of Object.entries(numerals)) {
            while (number >= value) {
                result += numeral
                number -= value
            }
        }
        return msg.say(result)
    }
}