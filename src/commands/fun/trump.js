const Command = require("../../structures/Command")
const { createCanvas, loadImage, registerFont } = require("canvas")
const path = require("path")
registerFont(path.join(__dirname, "..", "..", "assets", "fonts", "Noto-Regular.ttf"), { family: "Noto" })
registerFont(path.join(__dirname, "..", "..", "assets", "fonts", "Noto-CJK.otf"), { family: "Noto" })
registerFont(path.join(__dirname, "..", "..", "assets", "fonts", "Noto-Emoji.ttf"), { family: "Noto" })

module.exports = class TrumpCommand extends Command {
    constructor(client) {
        super(client, {
            name: "trump",
            group: "fun",
            aliases: ["donald-trump", "donald"],
            memberName: "trump",
            description: "Covfefe.",
            throttling: {
                usages: 1,
                duration: 10
            },
            clientPermissions: ["ATTACH_FILES"],
            args: [
                {
                    key: "text",
                    prompt: "What should Mr. Trump say?",
                    type: "string",
                }
            ]
        })
    }

    async run(msg, { text }) {
        try {
            msg.channel.startTyping()
            const base = await loadImage(path.join(__dirname, "..", "..", "assets", "images", "trump.png"))
            const canvas = createCanvas(base.width, base.height)
            const ctx = canvas.getContext("2d")
            ctx.drawImage(base, 0, 0)
            //ctx.rotate(8 * (Math.PI / 180))
            ctx.beginPath()
            ctx.fillStyle = "#00000"
            ctx.font = "36px Arial, sans-serif"
            //ctx.rotate(-0.05)
            ctx.fillText(text, 55, 198)
            msg.say({ files: [{ attachment: canvas.toBuffer(), name: "trump.png" }] })
            msg.channel.stopTyping()
        } catch (err) {
            return msg.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`)
        }
    }
}