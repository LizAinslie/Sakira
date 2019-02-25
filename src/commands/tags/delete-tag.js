const Command = require("../../structures/Command")
const sql = require("sqlite")
const { OWNERS } = process.env

sql.open("../database.sqlite3")


module.exports = class deleteTagCommand extends Command {
    constructor(client) {
        super(client, {
            name: "delete-tag",
            group: "tags",
            memberName: "delete-tag",
            description: "Delete a tag",
            examples: ["delete-tag"],
            args: [{
                key: "name",
                prompt: "What's the name of your tag?",
                type: "string",
                parse: name => name.toUpperCase()
            }]
        })
    }
    async run(msg, { name } ) {

        try {
            const row = await sql.get("SELECT * FROM tags WHERE tagName =?", name)
            if (!row) {
                return msg.say("Invalid tag")
            } else {
                if(msg.author.id === row.authorID || OWNERS.includes(msg.author.id)){
                    await sql.run("DELETE FROM tags WHERE tagName =?", name)
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
