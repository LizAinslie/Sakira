const Command = require("../../structures/Command")
const { MessageEmbed } = require("discord.js")

module.exports = class setAutoRoleCommand extends Command {
    constructor(client){
        super(client, {
            name: "settings",
            group: "administrative",
            memberName: "settings",
            description: "See your guild settings",
            userPermissions: ["ADMINISTRATOR"]
        })
    }
    async run(msg){
        const embed = new MessageEmbed()
            .setTitle("Guild Settings")
            .setDescription("See all of Sakira's Guild specific settings here")
            .setColor("0x36393F")
            .addField("Welcome Channel:", (msg.guild.settings.get("wc")) ? `<#${msg.guild.settings.get("wc")}>` : `Set it using ${msg.guild.commandPrefix}set-welcome`, true)
            .addField("Auto Role:", (msg.guild.settings.get("arr")) ? `<@&${msg.guild.settings.get("arr")}>` : `Set it using ${msg.guild.commandPrefix}set-auto-role`, true)
            .addField("Welcome Message:", (msg.guild.settings.get("wm")) ? msg.guild.settings.get("wm") : `Set it using ${msg.guild.commandPrefix}set-welcome`, false)
        msg.embed(embed)
    }
}