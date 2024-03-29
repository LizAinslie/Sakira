const Command = require("../../structures/Command")
const { stripIndents } = require("common-tags")
const request = require("node-superfetch")

module.exports = class strawpollCommand extends Command {
    constructor(client) {
        super(client, {
            name: "strawpoll",
            aliases: ["poll"],
            group: "fun",
            memberName: "strawpoll",
            description: "Generates a Strawpoll with the options you provide.",
            args: [
                {
                    key: "title",
                    prompt: "What would you like the title of the Strawpoll to be?",
                    type: "string",
                    max: 200
                },
                {
                    key: "options",
                    prompt: "What options do you want to be able to pick from? You may have a maximum of 30.",
                    type: "string",
                    infinite: true,
                    max: 140
                }
            ]
        })
    }

    async run(msg, { title, options }) {
        if(options.length < 2) return msg.reply("Please supply more then one option")
        if (options.length > 31) return msg.reply("Please supply 30 or less options")
        try {
            const { body } = await request
                .post("https://www.strawpoll.me/api/v2/polls")
                .set({ "Content-Type": "application/json" })
                .send({
                    title,
                    options,
                    captcha: true
                })
            return msg.say(stripIndents`
				${body.title}
				http://www.strawpoll.me/${body.id}
			`)
        } catch (err) {
            return msg.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`)
        }
    }
}
