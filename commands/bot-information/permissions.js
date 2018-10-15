const Command = require("../../structures/Command")
const { firstUpperCase } = require("../../util/Util")

module.exports = class statsCommand extends Command {
    constructor(client) {
        super(client, {
            name: "permissions",
            aliases: ["perms"],
            group: "bot-information",
            memberName: "permissions",
            description: "List bot permissions for the current server.",
            examples: ["permissions", "perms"]
        })
    }
    async run(msg) {
        msg.channel.send(`Guild Perms:\n${msg.guild.me.permissions.toArray().map(i => `${firstUpperCase(i.toLowerCase().replace(/_/g, " "))}`).join(", ")}\n\nChannel Perms: \n${msg.channel.permissionsFor(msg.author.id).toArray().map(i => `${firstUpperCase(i.toLowerCase().replace(/_/g, " "))}`).join(", ")}`)
    }
}