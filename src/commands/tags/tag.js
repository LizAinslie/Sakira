const Command = require("../../structures/Command")
const sql = require("sqlite")
const { join } = require("path")

sql.open(join(__dirname, "..", "..", "database.sqlite3"))


module.exports = class tagCommand extends Command {
    constructor(client) {
        super(client, {
            name: "tag",
            group: "tags",
            memberName: "tag",
            description: "Find user tags [commands]",
            examples: ["tag"],
            args: [
                {
                    key: "name",
                    prompt: "What's the name of your tag?",
                    type: "string",
                    parse: name => name.toUpperCase()
                }
            ]
        })
    }
    async run(msg, { name }) {
        try{
            const row = await sql.get("SELECT * FROM tags WHERE tagName =?", name)
            if(!row) return msg.channel.send("Invalid tag")
            return msg.say(row.tagContent)
        }catch (error){
            await sql.run("CREATE TABLE IF NOT EXISTS tags (tagName TEXT UNIQUE, tagContent TEXT)")
            console.error(error)
        }
    }
}
