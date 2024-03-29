const Command = require("../../structures/Command")
const { createCanvas, loadImage } = require("canvas")
const request = require("node-superfetch")
const path = require("path")

module.exports = class IHaveThePowerCommand extends Command {
    constructor(client) {
        super(client, {
            name: "i-have-the-power",
            aliases: ["he-man"],
            group: "fun",
            memberName: "i-have-the-power",
            description: "You have the power",
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
            const base = await loadImage(path.join(__dirname, "..", "..", "assets", "images", "i-have-the-power.png"))
            const { body } = await request.get(avatarURL)
            const avatar = await loadImage(body)
            const canvas = createCanvas(base.width, base.height)
            const ctx = canvas.getContext("2d")
            ctx.drawImage(base, 0, 0)
            ctx.rotate(18.3 * (Math.PI / 180))
            ctx.drawImage(avatar, 332, -125, 175, 175)
            ctx.rotate(-18.3 * (Math.PI / 180))
            msg.say({ files: [{ attachment: canvas.toBuffer(), name: "i-have-the-power.png" }] })
            msg.channel.stopTyping()
        } catch (err) {
            return msg.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`)
        }
    }
}