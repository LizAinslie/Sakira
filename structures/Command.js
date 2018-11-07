const { Command } = require("discord.js-commando")

module.exports = class SakiraCommand extends Command {
    constructor(client, info) {
        super(client, info)

        this.embedColour = "0x36393F"
        this.argsSingleQuotes = info.argsSingleQuotes || false
        this.throttling = info.throttling || { usages: 1, duration: 2 }
    }
}