const Command = require("../structures/Command")

const allstar = ["Somebody", "once", "told", "me", "the", "world", "is", "gonna", "roll", "me", "I", "ain't", "the", "sharpest", "tool", "in", "the", "shed", "She", "was", "looking", "kind", "of", "dumb", "with", "her", "finger", "and", "her", "thumb", "In", "the", "shape", "of", "an", "\"L\"", "on", "her", "forehead", "Well,", "the", "years", "start", "coming", "and", "they", "don't", "stop", "coming", "Fed", "to", "the", "rules", "and", "I", "hit", "the", "ground", "running", "Didn't", "make", "sense", "not", "to", "live", "for", "fun", "Your", "brain", "gets", "smart", "but", "your", "head", "gets", "dumb", "So", "much", "to", "do,", "so", "much", "to", "see", "So", "what's", "wrong", "with", "taking", "the", "back", "streets?", "You'll", "never", "know", "if", "you", "don't", "go", "You'll", "never", "shine", "if", "you", "don't", "glow", "Hey,", "now,", "you're", "an", "all-star,", "get", "your", "game", "on,", "go", "play", "Hey,", "now,", "you're", "a", "rock", "star,", "get", "the", "show", "on,", "get", "paid", "And", "all", "that", "glitters", "is", "gold", "Only", "shooting", "stars", "break", "the", "mold", "It's", "a", "cool", "place", "and", "they", "say", "it", "gets", "colder", "You're", "bundled", "up", "now", "wait", "'til", "you", "get", "older", "But", "the", "meteor", "men", "beg", "to", "differ", "Judging", "by", "the", "hole", "in", "the", "satellite", "picture", "The", "ice", "we", "skate", "is", "getting", "pretty", "thin", "The", "water's", "getting", "warm", "so", "you", "might", "as", "well", "swim", "My", "world's", "on", "fire.", "How", "about", "yours?", "That's", "the", "way", "I", "like", "it", "and", "I'll", "never", "get", "bored", "Hey,", "now,", "you're", "an", "all-star,", "get", "your", "game", "on,", "go", "play", "Hey,", "now,", "you're", "a", "rock", "star,", "get", "the", "show", "on,", "get", "paid", "And", "all", "that", "glitters", "is", "gold", "Only", "shooting", "stars", "break", "the", "mold", "Go", "for", "the", "moon", "Go", "for", "the", "moon", "Go", "for", "the", "moon", "Go", "for", "the", "moon", "Hey,", "now,", "you're", "an", "all-star,", "get", "your", "game", "on,", "go", "play", "Hey,", "now,", "you're", "a", "rock", "star,", "get", "the", "show", "on,", "get", "paid", "And", "all", "that", "glitters", "is", "gold", "Only", "shooting", "stars", "Somebody", "once", "asked", "could", "I", "spare", "some", "change", "for", "gas", "I", "need", "to", "get", "myself", "away", "from", "this", "place", "I", "said", "yep,", "what", "a", "concept", "I", "could", "use", "a", "little", "fuel", "myself", "And", "we", "could", "all", "use", "a", "little", "change", "Well,", "the", "years", "start", "coming", "and", "they", "don't", "stop", "coming", "Fed", "to", "the", "rules", "and", "I", "hit", "the", "ground", "running", "Didn't", "make", "sense", "not", "to", "live", "for", "fun", "Your", "brain", "gets", "smart", "but", "your", "head", "gets", "dumb", "So", "much", "to", "do,", "so", "much", "to", "see", "So", "what's", "wrong", "with", "taking", "the", "back", "streets?", "You'll", "never", "know", "if", "you", "don't", "go", "You'll", "never", "shine", "if", "you", "don't", "glow", "Hey,", "now,", "you're", "an", "all", "star,", "get", "your", "game", "on,", "go", "play", "Hey,", "now,", "you're", "a", "rock", "star,", "get", "the", "show", "on,", "get", "paid", "And", "all", "that", "glitters", "is", "gold", "Only", "shooting", "stars", "break", "the", "mold", "And", "all", "that", "glitters", "is", "gold", "Only", "shooting", "stars", "break", "the", "mold"]

module.exports = class allstarCommand extends Command {
    constructor(client) {
        super(client, {
            name: "allstar",
            group: "fun",
            memberName: "allstar",
            description: "Makes a new channel for every word in the song \"Allstar\" by Smash Mouth",
            throttling: {
                usages: 1,
                duration: 100
            },
            hidden: true,
            guildOnly: true,
            clientPermissions: ["ADMINISTRATOR"],
            userPermissions: ["ADMINISTRATOR"]
        })
    }

    async run(msg) {
        try{
            if (msg.guild.channels.array().length >= 52) {
                const mc = await msg.say("You've hit the channel limit. Would you like me to delete all of them and continue?")
                mc.react("❌")
                mc.react("✅")
                const yes = (reaction, user) => reaction.emoji.name === "✅" && user.id === msg.author.id
                const no = (reaction, user) => reaction.emoji.name === "❌" && user.id === msg.author.id
                const yc = mc.createReactionCollector(yes)
                const nc = mc.createReactionCollector(no)
                yc.on("collect", () => {
                    for (let o = 0; msg.guild.channels.array() > o; o++){
                        msg.guild.channels.array()[o].delete()
                    }
                    for(let i = 0; i < allstar.length; i++) {
                        msg.guild.channels.create(allstar[i])
                    }
                    mc.edit("Never run this again \:\).")
                    this.setEnabledIn(msg.guild, false)
                })
                nc.on("collect", () => {
                    msg.say("I canceled the command")
                })
            }else{
                for (let i = 0; i < allstar.length; i++) {
                    msg.guild.channels.create(allstar[i])
                }
                msg.say("Never use this here again.")
                this.setEnabledIn(msg.guild, false)
            }
        }catch(e){
            console.log(e)
            msg.say("An error occured. Please try again momentarily.")
        }
    }
}