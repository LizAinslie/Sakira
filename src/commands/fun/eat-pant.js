const Command = require("../../structures/Command")

module.exports = class EatPantCommand extends Command {
    constructor(client) {
        super(client, {
            name: "eat-pant",
            group: "fun",
            memberName: "eat-pant",
            description: "Eat pant. Of course I added this.",
            clientPermissions: ["ATTACH_FILES"]
        })
    }

    run(msg) {
        return msg.say({ files: [{ attachment: "assets/images/eat-pant.jpg", name: "eat-pant.jpg"}] })
    }
}