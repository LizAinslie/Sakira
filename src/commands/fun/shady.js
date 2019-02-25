const Command = require("../../structures/Command")
const { randCap } = require("../../util/Util")

module.exports = class shadyCommand extends Command {
    constructor(client) {
        super(client, {
            name: "shady",
            aliases: ["shady-text"],
            group: "fun",
            memberName: "shady",
            description: "ShadY TExt",
            examples: ["urban"],
            args: [
                {
                    key: "input",
                    prompt: "I NeeD SomethING to SEArch fOr",
                    type: "string"
                }
            ]
        })
    }
    run(msg, { input }) {
        try {
            return msg.say(randCap(input))
        }catch(e){
            msg.say(`${e}. pLeAse TrY A DIffERent queRy.`)
        }
    }
}
