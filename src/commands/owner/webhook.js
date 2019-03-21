const Command = require("../../structures/Command")

module.exports = class WebhookCommand extends Command {
    constructor(client){
        super(client,{
            name: "webhook",
            aliases: ["announce"],
            group: "owner",
            memberName: "webhook",
            description: "Bot owners can use this to send messages to the DarkSakira webhook in Central",
            examples: ["permissions", "perms"],
            ownerOnly: true,
            hidden: true,
            args: [
                {
                    key: "content",
                    prompt: "What would you like to proclaim?",
                    type: "string"
                },
                {
                    key: "webhook",
                    prompt: "Which webhook should I send it to?",
                    type: "string",
                    oneOf: [ "pmd", "ksc", "PMD", "KSC"]
                }
            ]
        })
    }
    async run(msg, { content, webhook }){
        if (msg.channel.type === "text" && msg.deletable) await msg.delete()
        if (webhook.toUpperCase() === "PMD") this.client.webhook.PMD.send(content)
        else if (webhook.toUpperCase() == "KSC") this.client.webhook.KSC.send(content)
        return null
    }
}
