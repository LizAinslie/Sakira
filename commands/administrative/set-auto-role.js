const Command = require("../../structures/Command")

module.exports = class setAutoRoleCommand extends Command {
    constructor(client){
        super(client, {
            name: "set-auto-role",
            aliases: ["auto-role"],
            group: "administrative",
            memberName: "set-auto-role",
            description: "Set a role to give any people who join the server",
            userPermissions: ["ADMINISTRATOR"],
            args: [
                {
                    key: "arr",
                    prompt: "What role would you like to bind?",
                    type: "role"
                }
            ]
        })
    }
    async run(msg, { arr }){
        console.log(arr.id)
        if (msg.guild.settings.get("arr")) {
            const m = await msg.say("The auto role is already set. Would you like to change it?")
            m.react("✅")
            m.react("❌")
            const yes = (reaction, user) => reaction.emoji.name === "✅" && user.id === msg.author.id
            const no = (reaction, user) => reaction.emoji.name === "❌" && user.id === msg.author.id
            const yc = m.createReactionCollector(yes)
            const nc = m.createReactionCollector(no)
            yc.on("collect", () => {
                msg.guild.settings.set("arr", [arr.id]).then(async () => {
                    m.reactions.removeAll()
                    await m.edit("Changed the auto role")
                })
            })
            nc.on("collect", async () => {
                m.reactions.removeAll()
                await m.edit("I'll keep it old then.")
            })
        }
        if (!msg.guild.settings.get("arr")) {
            await msg.guild.settings.set("arr", [arr.id])
            await msg.say("Bound auto role to use your desired role")
        }
    }
}