const Command = require("../../structures/Command")
const { createCanvas, loadImage } = require("canvas")
const request = require("node-superfetch")
const { silhouette } = require("../../util/Canvas")

module.exports = class SilhouetteCommand extends Command {
    constructor(client) {
        super(client, {
            name: "silhouette",
            group: "fun",
            memberName: "silhouette",
            description: "Draws a silhouette of an image or a user's avatar",
            throttling: {
                usages: 1,
                duration: 10
            },
            clientPermissions: ["ATTACH_FILES"],
            args: [
                {
                    key: "image",
                    prompt: "What image would you like to edit?",
                    type: "image|avatar",
                    default: msg => msg.author.displayAvatarURL({ format: "png", size: 512 })
                }
            ]
        })
    }

    async run(msg, { image }) {
        try {
            msg.channel.startTyping()
            const { body } = await request.get(image)
            const data = await loadImage(body)
            const canvas = createCanvas(data.width, data.height)
            const ctx = canvas.getContext("2d")
            ctx.drawImage(data, 0, 0)
            silhouette(ctx, 0, 0, data.width, data.height)
            const attachment = canvas.toBuffer()
            if (Buffer.byteLength(attachment) > 8e+6) return msg.reply("Resulting image was above 8 MB.")
            msg.say({ files: [{ attachment, name: "silhouette.png" }] })
            msg.channel.stopTyping()
        } catch (err) {
            return msg.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`)
        }
    }
}