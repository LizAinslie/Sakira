const Command = require("../../structures/Command")
const { createCanvas, loadImage } = require("canvas")
const request = require("node-superfetch")

module.exports = class PixelizeCommand extends Command {
    constructor(client) {
        super(client, {
            name: "pixelize",
            aliases: ["pixel"],
            group: "fun",
            memberName: "pixelize",
            description: "Create a pixilized version of an uploaded image or someone's avatar",
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
                    default: msg => msg.author.displayAvatarURL({ format: "png", size: 256 })
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
            ctx.imageSmoothingEnabled = false
            const width = canvas.width * 0.15
            const height = canvas.height * 0.15
            ctx.drawImage(data, 0, 0, width, height)
            ctx.drawImage(canvas, 0, 0, width, height, 0, 0, canvas.width, canvas.height)
            const attachment = canvas.toBuffer()
            if (Buffer.byteLength(attachment) > 8e+6) return msg.reply("Resulting image was above 8 MB.")
            msg.say({ files: [{ attachment, name: "pixelize.png" }] })
            msg.channel.stopTyping()
        } catch (err) {
            return msg.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`)
        }
    }
}