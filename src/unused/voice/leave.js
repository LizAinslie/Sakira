const Command = require("../../structures/Command")

module.exports = class LeaveVoiceChannelCommand extends Command {
    constructor(client) {
        super(client, {
            name: "leave-voice-channel",
            aliases: ["leave-vc"],
            group: "voice",
            memberName: "leave",
            description: "Forces the bot to leave the voice chat",
            details: "Credits to **dragonfire535** for original voice commands",
            guildOnly: true,
            userPermissions: ["MOVE_MEMBERS"]
        })
    }

    run(msg) {
        if (!this.client.voiceConnections.has(msg.guild.id)) return msg.say("I am not currently in a voice channel")
        const {
            channel
        } = this.client.voiceConnections.get(msg.guild.id)
        channel.leave()
        return msg.say(`Left **${channel.name}**.`)
    }
}