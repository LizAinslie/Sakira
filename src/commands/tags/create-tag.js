const Command = require("../../structures/Command")
const sql = require("sqlite")

sql.open("../database.sqlite3")


module.exports = class createTagCommand extends Command {
    constructor(client) {
        super(client, {
            name: "create-tag",
            group: "tags",
            memberName: "create-tag",
            description: "Create a tag. Note: underscores (_'s) will be replaced with whitespaces",
            examples: ["create-tag"],
            args: [{
                key: "name",
                prompt: "What's the name of your tag?",
                type: "string",
                parse: name => name.replace(/_/g, " ").toUpperCase()
            },
            {
                key: "content",
                prompt: "What do you want your tag to show?",
                type: "string"
            }
            ]
        })
    }
    async run(msg, {
        name,
        content
    }) {
        try {
            const row = await sql.get("SELECT * FROM tags WHERE tagName =?", name)
            if (!row) {
                await sql.run("INSERT INTO tags (tagName, tagContent, authorID) VALUES (?, ?, ?)", [name, content, msg.author.id])
                return msg.say(`👌! View your tag with \`tag ${name.toLowerCase()}\``)
            }
        } catch (error) {
            await sql.run("CREATE TABLE IF NOT EXISTS tags (tagName TEXT UNIQUE, tagContent TEXT, authorID TEXT)")
            await sql.run("INSERT INTO tags (tagName, tagContent, authorID) VALUES (?, ?, ?)", [name, content, msg.author.id])
            msg.say(`👌! View your tag with \`tag ${name.toLowerCase()}\``)
            console.error(error)
        }
    }
}
