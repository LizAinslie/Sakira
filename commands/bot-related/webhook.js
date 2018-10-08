const Command = require('../../structures/Command');

module.exports = class WebhookCommand extends Command {
    constructor(client){
        super(client,{
            name: 'webhook',
            aliases: ['announce'],
            group: 'bot-related',
            memberName: 'webhook',
            description: 'Bot owners can use this to send messages to the DarkSakira webhook in Central',
            examples: ['permissions', 'perms'],
            ownerOnly: true,
            args: [
                {
                    key: 'content',
                    prompt: 'What would you like to proclaim?',
                    type: 'string'
                }
            ]
        })
    }
    async run(msg, { content }){
        if (msg.channel.type === 'text' && msg.deletable) await msg.delete();
        this.client.webhook.send(content)
        return null;
    }
}
