const Commando = require("discord.js-commando")
const { WebhookClient } = require("discord.js")
const { KSC_WH_ID, KSC_WH_TOKEN, PMD_WH_ID, PMD_WH_TOKEN } = process.env

module.exports = class SakiraClient extends Commando.CommandoClient {
    constructor(options) {
        super(options)

        this.webhook = {}
        this.webhook.KSC = new WebhookClient(KSC_WH_ID, KSC_WH_TOKEN, { disableEveryone: true })
        this.webhook.PMD = new WebhookClient(PMD_WH_ID, PMD_WH_TOKEN, { disableEveryone: true })
    }
}