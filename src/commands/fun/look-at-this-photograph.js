const Command = require("../../structures/Command")
const { createCanvas, loadImage } = require("canvas")
const request = require("node-superfetch")
const path = require("path")

module.exports = class LookAtThisPhotographCommand extends Command {
    constructor(client) {
        super(client, {
            name: "look-at-this-photograph",
            aliases: ["photo", "nickelback", "look-at-this-photo", "photograph"],
            group: "fun",
            memberName: "look-at-this-photograph",
            description: "Draws a user's avatar over Nickelback's photograph.",
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
            const base = await loadImage(path.join(__dirname, "..", "..", "assets", "images", "look-at-this-photograph.png"))
            const { body } = await request.get(avatarURL)
            const avatar = await loadImage(body)
            const black = await loadImage(path.join(__dirname, "..", "..", "assets", "images", "black.png"))
            const canvas = createCanvas(base.width, base.height)
            const ctx = canvas.getContext("2d")
            ctx.drawImage(base, 0, 0)
            ctx.rotate(-13.5 * (Math.PI / 180))
            ctx.drawImage(black, 280, 218, 175, 125)
            ctx.drawImage(avatar, 305, 218, 125, 125)
            ctx.rotate(13.5 * (Math.PI / 180))
            msg.say({ files: [{ attachment: canvas.toBuffer(), name: "look-at-this-photograph.png" }] })
            msg.channel.stopTyping()
        } catch (err) {
            return msg.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`)
        }
    }
}