const Command = require("../../structures/Command")
const { MessageEmbed } = require("discord.js")
const request = require("request")

module.exports = class bibleverseCommand extends Command {
    constructor(client) {
        super(client, {
            name: "bibleverse",
            group: "services",
            memberName: "bibleverse",
            description: "Random verse from the Christian Bible",
            examples: ["bibleverse"]
        })
    }
    run(msg) {
        request("http://labs.bible.org/api/?passage=random&type=json", function(error, response, body) {
            var passage = JSON.parse(body)
            const embed = new MessageEmbed()
                .setTitle("Result:")
                .addField("Book:", passage[0].bookname, true)
                .addField("Chapter:", passage[0].chapter, true)
                .addField("Verse:", passage[0].verse, true)
                .setDescription(passage[0].text)
                .setColor("0x36393F")
            msg.embed(embed)
        })
    }
}
