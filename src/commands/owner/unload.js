const { oneLine } = require("common-tags")
const Command = require("../../structures/Command")

module.exports = class UnloadCommandCommand extends Command {
    constructor(client) {
        super(client, {
            name: "unload",
            aliases: ["unload-command"],
            group: "owner",
            memberName: "unload",
            description: "Unloads a command.",
            details: oneLine`
				The argument must be the name/ID (partial or whole) of a command.
				Only the bot owner(s) may use this command.
			`,
            examples: ["unload some-command"],
            ownerOnly: true,
            guarded: true,
            hidden: true,
            args: [
                {
                    key: "command",
                    prompt: "Which command would you like to unload?",
                    type: "command"
                }
            ]
        })
    }
    async run(msg, args) {
        args.command.unload()
        if(this.client.shard) {
            try {
                await this.client.shard.broadcastEval(`
					if(this.shard.id !== ${this.client.shard.id}) this.registry.commands.get('${args.command.name}').unload();
				`)
            } catch(err) {
                this.client.emit("warn", "Error when broadcasting command unload to other shards")
                this.client.emit("error", err)
                await msg.reply(`Unloaded \`${args.command.name}\` command, but failed to unload on other shards.`)
                return null
            }
        }
        await msg.reply(`Unloaded \`${args.command.name}\` command${this.client.shard ? " on all shards" : ""}.`)
        return null
    }
}
