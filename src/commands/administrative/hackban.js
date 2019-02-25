const Command = require("../../structures/Command")

module.exports = class hackBanCommand extends Command {
    constructor(client) {
        super(client, {
            name: "hackban",
            aliases: ["hackban"],
            group: "administrative",
            memberName: "hackban",
            description: "Permanantly hackban someone from the guild",
            examples: ["hackban"],
            userPermissions: ["BAN_MEMBERS"],
            clientPermissions: ["BAN_MEMBERS"],
            args: [
                {
                    key: "input",
                    prompt: "I need the id of the person you want to hackban.",
                    type: "string"
                }
            ]
        })
    }
    run(msg, { input }) {
        msg.guild.ban(input).then(() => {
            msg.say("👌")
        }).catch()
    }
}
