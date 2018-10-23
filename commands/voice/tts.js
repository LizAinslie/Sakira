const Command = require("../../structures/Command")
const request = require("node-superfetch")

module.exports = class tts extends Command {
    constructor(client) {
        super(client, {
            name: "tts",
            aliases: ["moon-base-alpha", "text-to-speech", "dectalk"],
            group: "voice",
            memberName: "tts",
            description: "The world's best Text-to-Speech.",
            details: "Credits to **dragonfire535** for original voice commands",
            guildOnly: true,
            throttling: {
                usages: 1,
                duration: 10
            },
            userPermissions: ["CONNECT", "SPEAK"],
            clientPermissions: ["ADD_REACTIONS", "READ_MESSAGE_HISTORY"],
            args: [
                {
                    key: "text",
                    prompt: "What text do you want to say?",
                    type: "string",
                    max: 1024
                }
            ]
        })
    }

    async run(msg, { text }) {
        const voiceChannel = msg.member.voice.channel
        if (!voiceChannel) return msg.say("Please enter a voice channel first.")
        if (!voiceChannel.permissionsFor(this.client.user).has(["CONNECT", "SPEAK"])) {
            return msg.say("Missing the **Connect** or**Speak** permission for the voice channel.")
        }
        if (!voiceChannel.joinable) return msg.say("Your voice channel is not joinable.")
        if (this.client.voiceConnections.has(voiceChannel.guild.id)) return msg.say("I am already playing a sound. Please wait.")
        try {
            const connection = await voiceChannel.join()
            const { url } = await request
                .get("http://tts.cyzon.us/tts")
                .query({ text })
            const dispatcher = connection.play(url)
            await msg.react("🔉")
            dispatcher.once("finish", () => voiceChannel.leave())
            dispatcher.once("error", () => voiceChannel.leave())
            return null
        } catch (err) {
            voiceChannel.leave()
            return msg.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`)
        }
    }
}