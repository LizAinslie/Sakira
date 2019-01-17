const Command = require("../../structures/Command")
const request = require("request")

module.exports = class hastebinCommand extends Command {
    constructor(client) {
        super(client, {
            name: "hastebin",
            group: "services",
            memberName: "hastebin",
            description: "Uploads the given code to a hastebin",
            args: [
                {
                    key: "code",
                    prompt: "What code do you want to upload?",
                    type: "string",
                    parse: c => c.replace(/\`/g, "")
                }
            ],
            throttling: {
                usages: 5,
                duration: 10,
            }
        })
    }

    run(msg, { code }) {
        const options = {
            method: "POST",
            url: "https://hastebin.com/documents",
            headers: {
                "cache-control": "no-cache"
            },
            body: code
        }
        try {
            request(options, function(error, response, body) {
                body = JSON.parse(body)
                msg.say(`https://hastebin.com/${body.key}.js`)
            })
        } catch (error) {
            msg.say("Welp: \`\`\`" + error + "\`\`\`")
        }
    }
}