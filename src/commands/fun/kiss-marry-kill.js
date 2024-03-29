const Command = require("../../structures/Command")
const { shuffle } = require("../../util/Util")

module.exports = class KissMarryKillCommand extends Command {
    constructor(client) {
        super(client, {
            name: "kiss-marry-kill",
            aliases: ["kiss-kill-marry", "kill-kiss-marry", "kill-marry-kiss", "marry-kiss-kill", "marry-kill-kiss"],
            group: "fun",
            memberName: "kiss-marry-kill",
            description: "Determines who to kiss, who to marry, and who to kill.",
            args: [
                {
                    key: "first",
                    label: "first name",
                    prompt: "Who is the first person you choose?",
                    type: "string",
                    max: 500
                },
                {
                    key: "second",
                    label: "second name",
                    prompt: "Who is the second person you choose?",
                    type: "string",
                    max: 500
                },
                {
                    key: "third",
                    label: "third name",
                    prompt: "Who is the third person you choose?",
                    type: "string",
                    max: 500
                }
            ]
        })
    }

    run(msg, { first, second, third }) {
        const things = shuffle([first, second, third])
        return msg.say(`I'd kiss ${things[0]}, marry ${things[1]}, and kill ${things[2]}.`)
    }
}