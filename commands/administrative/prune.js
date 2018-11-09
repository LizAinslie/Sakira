const Command = require("../../structures/Command")

module.exports = class pruneCommand extends Command {
    constructor(client) {
        super(client, {
            name: "prune",
            aliases: ["clean", "clear", "tidy", "cleanup"],
            group: "administrative",
            memberName: "prune",
            description: "Delete **x** amount of messages",
            examples: ["prune 10"],
            userPermissions: ["MANAGE_MESSAGES"],
            clientPermissions: ["MANAGE_MESSAGES"],
            args: [
                {
                    key: "input",
                    prompt: "How many messages should I delete?",
                    type: "integer",
                    validate: num => num <= 99,
                    parse: num => num + 1
                }
            ]
        })
    }
    run(msg, { input }) {
        try{
            msg.channel.bulkDelete(input).then(() => {
                msg.channel.send(`Deleted ${input} messages`).then(message => setTimeout(() => {message.delete()}, 10000))
            })
        }catch(e){
            msg.say(`Well, sorry, but it looks like there was an error: \n ${e}`)
        }
    }
}
