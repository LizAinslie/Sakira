const Command = require("../../structures/Command")
const { MessageEmbed } = require("discord.js")
const request = require("node-superfetch")
const { stripIndents } = require("common-tags")
const { verify } = require("../../util/Util")

module.exports = class AkinatorCommand extends Command {
    constructor(client) {
        super(client, {
            name: "akinator",
            aliases: ["aki"],
            group: "fun",
            memberName: "akinator",
            description: "Think about a real or fictional character, I will try to guess who it is.",
            details: "Credit to **dragonfire535** for most of this command",
            clientPermissions: ["EMBED_LINKS"]
        })

        this.sessions = new Map()
    }

    async run(msg) {
        //taken from https://github.com/dragonfire535/xiao/blob/master/commands/games/akinator.js for the most part. credit to them.
        if (this.sessions.has(msg.channel.id)) return msg.reply("I can only play one game per channel at a time...")
        try {
            let ans = null
            this.sessions.set(msg.channel.id, { progression: 0 })
            while (this.sessions.get(msg.channel.id).progression < 95) {
                const data = ans === null ? await this.createSession(msg.channel) : await this.progress(msg.channel, ans)
                if (!data || !data.answers || this.sessions.get(msg.channel.id).step >= 80) break
                const answers = data.answers.map(answer => answer.answer.toLowerCase())
                answers.push("end")
                await msg.say(stripIndents`
					**${++data.step}.** ${data.question} (${Math.round(Number.parseInt(data.progression, 10))}%)
					${data.answers.map(answer => answer.answer).join(" | ")}
				`)
                const filter = res => res.author.id === msg.author.id && answers.includes(res.content.toLowerCase())
                const msgs = await msg.channel.awaitMessages(filter, {
                    max: 1,
                    time: 30000
                })
                if (!msgs.size) {
                    await msg.say("Sorry, time is up!")
                    break
                }
                if (msgs.first().content.toLowerCase() === "end") break
                ans = answers.indexOf(msgs.first().content.toLowerCase())
            }
            const guess = await this.guess(msg.channel)
            if (!guess) {
                this.sessions.delete(msg.channel.id)
                if (guess === 0) return msg.say("I don't have any guesses. GG.")
                return msg.reply("Hmm... I seem to be having a bit of trouble. Come back later.")
            }
            const embed = new MessageEmbed()
                .setColor("0x36393F")
                .setTitle(`I'm ${Math.round(guess.proba * 100)}% sure it's...`)
                .setDescription(`${guess.name}${guess.description ? `\n_${guess.description}_` : ""}`)
                .setThumbnail(guess.absolute_picture_path || null)
            await msg.embed(embed)
            const verification = await verify(msg.channel, msg.author)
            this.sessions.delete(msg.channel.id)
            if (verification === 0) return msg.say("Your silence only gives the fact you are clueless away! I win!")
            if (!verification) return msg.say("GG, you have defeated me.")
            return msg.say("Guessed right another time! You're actually fun to play with...")
        } catch (err) {
            this.sessions.delete(msg.channel.id)
            return msg.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`)
        }
    }

    async createSession(channel) {
        const { body } = await request
            .get("https://srv6.akinator.com:9126/ws/new_session")
            .query({
                partner: "",
                player: "website-desktop",
                uid_ext_session: "",
                frontaddr: "MTc4LjMzLjIzMS45OA==",
                constraint: "ETAT<>'AV'",
                soft_constraint: channel.nsfw ? "" : "ETAT='EN'",
                question_filter: channel.nsfw ? "" : "cat=1"
            })
        if (body.completion !== "OK") return null
        const data = body.parameters
        this.sessions.set(channel.id, {
            id: data.identification.session,
            signature: data.identification.signature,
            step: 0,
            progression: Number.parseInt(data.step_information.progression, 10)
        })
        return data.step_information
    }

    async progress(channel, answer) {
        const session = this.sessions.get(channel.id)
        const { body } = await request
            .get("https://srv6.akinator.com:9126/ws/answer")
            .query({
                session: session.id,
                signature: session.signature,
                step: session.step,
                answer,
                question_filter: channel.nsfw ? "" : "cat=1"
            })
        if (body.completion !== "OK") return null
        const data = body.parameters
        this.sessions.set(channel.id, {
            id: session.id,
            signature: session.signature,
            step: Number.parseInt(data.step, 10),
            progression: Number.parseInt(data.progression, 10)
        })
        return data
    }

    async guess(channel) {
        const session = this.sessions.get(channel.id)
        const { body } = await request
            .get("https://srv6.akinator.com:9126/ws/list")
            .query({
                session: session.id,
                signature: session.signature,
                step: session.step,
                size: 2,
                max_pic_width: 246,
                max_pic_height: 294,
                pref_photos: "VO-OK",
                duel_allowed: 1,
                mode_question: 0
            })
        if (body.completion === "KO - ELEM LIST IS EMPTY") return 0
        if (body.completion !== "OK") return null
        return body.parameters.elements[0].element
    }
}