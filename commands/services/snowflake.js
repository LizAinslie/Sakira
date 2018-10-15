const Command = require("../../structures/Command")

module.exports = class snowflakeCommand extends Command {
    constructor(client) {
        super(client, {
            name: "snowflake",
            group: "services",
            memberName: "snowflake",
            description: "Find out when a message was sent from a message snowflake",
            examples: ["snowflake"],
            args: [
                {
                    key: "input",
                    prompt: "I need a snowflake for that!",
                    type: "string"
                }
            ]
        })
    }
    run(msg, { input }) {
        msg.say(new Date((input*Math.pow(2, -22)) + 1420070400000).toUTCString())
    }
}
