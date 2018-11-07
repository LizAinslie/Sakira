const Command = require("../../structures/Command")

module.exports = class usageCommand extends Command {
    constructor(client) {
        super(client, {
            name: "usage",
            aliases: ["command-usage"],
            group: "bot-information",
            memberName: "usage",
            description: "Responds with correct usage of the specified command",
            guarded: true,
            args: [
                {
                    key: "command",
                    prompt: "What command do you want to identify?",
                    type: "string",
                    validate: command => client.registry.findCommands(command, true)[0]
                }
            ]
        })
    }

    async run(msg, { command }) {
        msg.say(this.client.registry.findCommands(command, true)[0].usage())
    }
}