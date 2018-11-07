const Command = require("../../structures/Command")
const { stripIndents } = require("common-tags")
const { trimArray } = require("../../util/Util")

module.exports = class discriminatorCommand extends Command {
    constructor(client) {
        super(client, {
            name: "discriminator",
            aliases: ["discrim", "search-discrim", "search-discriminator"],
            group: "fun",
            memberName: "discriminator",
            description: "Searches for other users with your desired descriminator",
            args: [
                {
                    key: "discrim",
                    label: "discriminator",
                    prompt: "Which discriminator would you like to search for?",
                    type: "string",
                    default: msg => msg.author.discriminator,
                    validate: discrim => {
                        if (/^[0-9]+$/.test(discrim) && discrim.length === 4) return true
                        return "Discriminator was invalid."
                    }
                }
            ]
        })
    }

    run(msg, { discrim }) {
        const users = this.client.users.filter(user => user.discriminator === discrim).map(user => user.username)
	    return msg.say(stripIndents`
			I found **${users.length}** ${(users.length === 1) ? "user"  : "users"} with the discriminator **#${discrim}**:
			${trimArray(users, 50).join(", ")}
		`)
    }
}