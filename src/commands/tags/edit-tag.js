const Command = require("../../structures/Command")
const sql = require("sqlite")
const { OWNERS } = process.env
const { join } = require("path")

sql.open(join(__dirname, "database.sqlite3"))


module.exports = class editTagCommand extends Command {
    constructor(client) {
        super(client, {
            name: "edit-tag",
            group: "tags",
            memberName: "edit-tag",
            description: "Edits a tag",
            examples: ["edit-tag"],
            args: [
                {
                    key: "name",
                    prompt: "What's the name of your tag?",
                    type: "string",
                    parse: name => name.toUpperCase()
                },
                {
                    key: "content",
                    prompt: "What do you want to change the description too?",
                    type:"string"
                }
            ]
        })
    }
    async run(msg, { name, content } ) {

        try {
            const row = await sql.get("SELECT * FROM tags WHERE tagName =?", name)
            if (!row) {
                return msg.say("Invalid tag")
            } else {
                if(msg.author.id === row.authorID || OWNERS.includes(msg.author.id)){
                    await sql.run("UPDATE tags SET tagContent =? WHERE tagName =?", [content, name])
                    msg.say("👌")
                }else{
                    msg.say("Only the creator of the tag can do that!")
                }
            }
        } catch (error) {
            msg.say("Error please try again")
            console.log(error)
        }
    }
}
