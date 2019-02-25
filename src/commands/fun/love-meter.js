const Command = require("../../structures/Command")
const { createCanvas, loadImage } = require("canvas")
const request = require("node-superfetch")
const path = require("path")

module.exports = class DrakepostingCommand extends Command {
    constructor(client) {
        super(client, {
            name: "love-meter",
            aliases: ["love"],
            group: "fun",
            memberName: "love-meter",
            description: "How much do two users love eacho ther?",
            throttling: {
                usages: 1,
                duration: 10
            },
            clientPermissions: ["ATTACH_FILES"],
            args: [
                {
                    key: "one",
                    prompt: "I need two people, so lets start with the first",
                    type: "user"
                },
                {
                    key: "two",
                    prompt: "Now I need a second",
                    type: "user",
                    default: ""
                }
            ]
        })
    }

    async run(msg, { one, two }) {
        const oneAvatarURL = one.displayAvatarURL({ format: "png", size: 512 })
        const twoAvatarURL = (two == undefined) ? two.displayAvatarURL({ format: "png", size: 512 }) : msg.author.displayAvatarURL({ format: "png", size: 512 })
        const rating = Math.floor(Math.random() * 100) + 1
        try {
            if(rating >= 75) {
                msg.channel.startTyping()
                const base = await loadImage(path.join(__dirname, "..", "..", "assets", "images", "love-back.png"))
                const oneAvatarData = await request.get(oneAvatarURL)
                const oneAvatar = await loadImage(oneAvatarData.body)
                const twoAvatarData = await request.get(twoAvatarURL)
                const twoAvatar = await loadImage(twoAvatarData.body)
                const canvas = createCanvas(base.width, base.height)
                const ctx = canvas.getContext("2d")
                ctx.drawImage(base, 0, 0)
                ctx.drawImage(twoAvatar, 0, 0, 512, 512)
                ctx.drawImage(oneAvatar, 1024, 0, 512, 512)
                msg.say(`**${(two == undefined)?two.username:msg.author.username}#${(two == undefined)?two.discriminator:msg.author.discriminator}** loves **${one.username}#${one.discriminator}** a whopping **${rating}%**`, {
                    files: [{ 
                        attachment: canvas.toBuffer(), 
                        name: "love-meter.png" 
                    }] 
                })
                msg.channel.stopTyping()
            }else{
                msg.channel.startTyping()
                const base = await loadImage(path.join(__dirname, "..", "..", "assets", "images", "no-love-back.png"))
                const oneAvatarData = await request.get(oneAvatarURL)
                const oneAvatar = await loadImage(oneAvatarData.body)
                const twoAvatarData = await request.get(twoAvatarURL)
                const twoAvatar = await loadImage(twoAvatarData.body)
                const canvas = createCanvas(base.width, base.height)
                const ctx = canvas.getContext("2d")
                ctx.drawImage(base, 0, 0)
                ctx.drawImage(twoAvatar, 0, 0, 512, 512)
                ctx.drawImage(oneAvatar, 1024, 0, 512, 512)
                msg.say(`**${(two == undefined)?two.username:msg.author.username}#${(two == undefined)?two.discriminator:msg.author.discriminator}** loves **${one.username}#${one.discriminator}** a whopping **${rating}%**`, {
                    files: [{
                        attachment: canvas.toBuffer(),
                        name: "love-meter.png"
                    }]
                })
                msg.channel.stopTyping()
            }
        } catch (err) {
            return msg.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`)
        }
    }
}