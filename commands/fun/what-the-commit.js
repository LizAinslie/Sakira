const Command = require("../../structures/Command")
const request = require("request")

module.exports = class whatTheCommitCommand extends Command {
    constructor(client) {
        super(client, {
            name: "what-the-commit",
            group: "fun",
            aliases: ["wtc", "what-commit"],
            memberName: "what-the-commit",
            description: "Commits as a service"
        })
    }

    async run(msg) {
        request("http://whatthecommit.com/index.txt", function(error, response, body) {
            msg.say(body)
        })
    }
}