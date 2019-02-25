const Command = require("../../structures/Command")

module.exports = class pruneCheckCommand extends Command {
    constructor(client) {
        super(client, {
            name: "prunecheck",
            aliases: ["prunecheck"],
            group: "administrative",
            memberName: "prunecheck",
            description: "Check how many people will be pruned with the `prunemembers` command with the specified time period",
            examples: ["prunecheck"],
            userPermissions: ["KICK_MEMBERS"],
            clientPermissions: ["KICK_MEMBERS"],
            args: [
                {
                    key: "input",
                    prompt: "How many days of inactivity should I check for?",
                    type: "integer",
                    validate: num => {
                        if(num < 30) return true
                        return "Time period must be under or equal to **30**d"
                    }
                }
            ]
        })
    }
    run(msg, { input }) {
        msg.guild.pruneMembers(input, true).then(amount => {
            msg.say(`If you use the \`prunemembers\` command for that time period (**${input}**d) **${amount}** people will be removed`)
        }).catch()
    }
}
