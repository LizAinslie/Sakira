const Command = require("../../structures/Command")
const { createCanvas, loadImage } = require("canvas")
const request = require("node-superfetch")
const path = require("path")

module.exports = class BobRossCommand extends Command {
    constructor(client) {
        super(client, {
            name: "bob-ross",
            aliases: ["ross"],
            group: "fun",
            memberName: "bob-ross",
            description: "Paint a happy little mess",
            throttling: {
                usages: 1,
                duration: 10
            },
            clientPermissions: ["ATTACH_FILES"],
            args: [
                {
                    key: "user",
                    prompt: "Which user would you like to edit the avatar of?",
                    type: "user",
                    default: msg => msg.author
                }
            ]
        })
    }

    async run(msg, { user }) {
        const avatarURL = user.displayAvatarURL({ format: "png", size: 512 })
        try {
            msg.channel.startTyping()
            const base = await loadImage(path.join(__dirname, "..", "..", "assets", "images", "bob-ross.png"))
            const { body } = await request.get(avatarURL)
            const avatar = await loadImage(body)
            const canvas = createCanvas(base.width, base.height)
            const ctx = canvas.getContext("2d")
            ctx.fillStyle = "white"
            ctx.fillRect(0, 0, base.width, base.height)
            ctx.rotate(3 * (Math.PI / 180))
            ctx.drawImage(avatar, 69, 102, 256, 256)
            ctx.rotate(-3 * (Math.PI / 180))
            ctx.drawImage(base, 0, 0)
            msg.say({ files: [{ attachment: canvas.toBuffer(), name: "bob-ross.png" }] })
            msg.channel.stopTyping()
        } catch (err) {
            return msg.reply(`Oh no, the mess wasn't happy :( \`${err.message}\`. Try again later!`)
        }
    }
}