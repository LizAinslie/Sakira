const Command = require("../../structures/Command")

module.exports = class banCommand extends Command {
    constructor(client) {
        super(client, {
            name: "ban",
            aliases: ["ban"],
            group: "administrative",
            memberName: "ban",
            description: "Permanantly ban someone from the guild",
            examples: ["ban"],
            userPermissions: ["BAN_MEMBERS"],
            clientPermissions: ["BAN_MEMBERS"],
            args: [
                {
                    key: "input",
                    prompt: "I need a member to ban.",
                    type: "string"
                }
            ]
        })
    }
    run(msg, { input }) {

        function findMember(msg, suffix, self = false) {
            if (!suffix) {
                if (self) return msg.member
                else return null
            } else {
                let member = msg.mentions.members.first() || msg.guild.members.get(suffix) || msg.guild.members.find(m => m.displayName.toLowerCase().includes(suffix.toLowerCase()) || m.user.username.toLowerCase().includes(suffix.toLowerCase()))
                return member
            }
        }
        findMember(msg, input, false).ban().then(() => {
            msg.say("👌")
        }).catch()
    }
}
