const Command = require("../../structures/Command")
const { MessageEmbed } = require("discord.js")
const sql = require("sqlite")
const { join } = require("path")

sql.open(join(__dirname, "database.sqlite3"))

module.exports = class tagsCommand extends Command {
    constructor(client) {
        super(client, {
            name: "list-tags",
            group: "tags",
            memberName: "list-tags",
            description: "List the 20 latest user tags [commands]",
            examples: ["tag"]
        })
    }
    async run(msg) {
        try{
            const row = await sql.all("SELECT tagName from tags LIMIT 20;")
            let rows = []
            row.forEach(a => {
                rows.push(a.tagName.toLowerCase())
            })
            const embed = new MessageEmbed()
                .setTitle("Latest User Tags:")
                .setDescription(rows.join("\r\n"))
                .setColor("0x36393F")
            msg.embed(embed)
            rows = []
        }catch (error){
            await sql.run("CREATE TABLE IF NOT EXISTS tags (tagName TEXT UNIQUE, tagContent TEXT)")
            console.error(error)
        }
    }
}
