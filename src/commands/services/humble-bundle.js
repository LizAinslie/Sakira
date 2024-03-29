const Command = require("../../structures/Command")
const request = require("node-superfetch")
const { stripIndents } = require("common-tags")

module.exports = class HumbleBundleCommand extends Command {
    constructor(client) {
        super(client, {
            name: "humble-bundle",
            aliases: ["humble"],
            group: "services",
            memberName: "humble-bundle",
            description: "Responds with the current Humble Bundle(s)."
        })
    }

    async run(msg) {
        try {
            const { text } = await request.get("https://www.humblebundle.com/androidapp/v2/service_check")
            const body = JSON.parse(text)
            if (!body.length) return msg.say("There are no bundles right now...")
            if (body.length > 1) {
                return msg.say(stripIndents`
					There are **${body.length}** bundles on right now!
					${body.map(bundle => `**${bundle.bundle_name}**: <${bundle.url}>`).join("\n")}
				`)
            }
            const data = body[0]
            return msg.say(stripIndents`
				The current bundle is **${data.bundle_name}**!
				${data.url}
			`)
        } catch (err) {
            return msg.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`)
        }
    }
}