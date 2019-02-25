const Command = require("../../structures/Command")
const puppeteer = require("puppeteer")

module.exports = class pdfCommand extends Command {
    constructor(client) {
        super(client, {
            name: "pdf",
            group: "services",
            memberName: "pdf",
            description: "Create a pdf of a website.",
            throttling: {
                usages: 1,
                duration: 10
            },
            ownerOnly: true,
            args: [
                {
                    key: "website",
                    prompt: "What website should I make a pdf of?",
                    type: "string"
                }
            ]
        })
    }

    async run(msg, { website }) {
        try {
            msg.channel.startTyping()
            const browser = await puppeteer.launch({
                headless: true,
                args: ["--no-sandbox", "--disable-setuid-sandbox"]
            })
            const page = await browser.newPage()
            await page.goto(website)
            await page.setViewport({ width: 1000, height: 500 })
            await page.pdf({ encoding: "binary", type: "png"}).then(img => {
                msg.say({ files: [{ attachment: img, name: `${website.replace("http://", "").replace("https://", "")}.pdf` }] })
            })
            msg.channel.stopTyping(true)
        } catch (err) {
            msg.say("Either an invalid url was provided or I decided I didn't want to be played with :(.\n\`\`\`" + err + "\`\`\`")
            msg.channel.stopTyping(true)
        }
    }
}