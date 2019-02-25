const Command = require("../../structures/Command")

module.exports = class pruneMembersCommand extends Command {
    constructor(client) {
        super(client, {
            name: "prunemembers",
            aliases: ["prunemembers"],
            group: "administrative",
            memberName: "prunemembers",
            description: "Prune guild members based on a specified amount of days of inactivity",
            examples: ["prunemembers"],
            userPermissions: ["KICK_MEMBERS"],
            args: [
                {
                    key: "input",
                    prompt: "How many days of inactivity should I prune for?",
                    type: "integer"
                }
            ]
        })
    }
    run(msg, { input }) {
        msg.guild.pruneMembers(input).then(() => {
            msg.say("👌 Done")
        }).catch()
    }
}
