const { CommandoClient } = require('discord.js-commando');
const { WebhookClient } = require('discord.js');
const { SAKIRA_WEBHOOK_ID, SAKIRA_WEBHOOK_TOKEN } = process.env;

module.exports = class SakiraClient extends CommandoClient {
	constructor(options) {
		super(options);

		this.webhook = new WebhookClient(SAKIRA_WEBHOOK_ID, SAKIRA_WEBHOOK_TOKEN, { disableEveryone: true });
	}
};