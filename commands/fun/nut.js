const Command = require("../../structures/Command")
const { createCanvas, loadImage, registerFont } = require("canvas")
const path = require("path")
registerFont(path.join(__dirname, "..", "..", "assets", "fonts", "Noto-Regular.ttf"), { family: "Noto" })
registerFont(path.join(__dirname, "..", "..", "assets", "fonts", "Noto-CJK.otf"), { family: "Noto" })
registerFont(path.join(__dirname, "..", "..", "assets", "fonts", "Noto-Emoji.ttf"), { family: "Noto" })

module.exports = class NutCommand extends Command {
    constructor(client) {
        super(client, {
            name: "nut",
            group: "fun",
            memberName: "nut",
            description: "Nut button",
            throttling: {
                usages: 1,
                duration: 10
            },
            clientPermissions: ["ATTACH_FILES"],
            args: [
                {
                    key: "text",
                    prompt: "What should the justification for nut button be?",
                    type: "string",
                }
            ]
        })
    }

    async run(msg, { text }) {
        try {
            msg.channel.startTyping()
            const base = await loadImage(path.join(__dirname, "..", "..", "assets", "images", "nut.jpg"))
            const canvas = createCanvas(base.width, base.height)
            const ctx = canvas.getContext("2d")
            ctx.drawImage(base, 0, 0)
            ctx.beginPath()
            ctx.fillStyle = "#00000"
            ctx.font = "36px Arial, sans-serif"
            ctx.fillText(text, 21, 50)
            msg.say({ files: [{ attachment: canvas.toBuffer(), name: "nut.png" }] })
            msg.channel.stopTyping()
        } catch (err) {
            return msg.reply(`Shite! It's No Nut Novemeber! Actually, well, an error occured: \`${err.message}\`. Try again later!`)
        }
    }
}