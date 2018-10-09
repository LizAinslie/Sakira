const Command = require('../../structures/Command');
const { stripIndents } = require('common-tags');

module.exports = class DonateCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'donate',
			aliases: ['patreon'],
			group: 'bot-information',
			memberName: 'donate',
			description: 'Responds with the bot\'s donation links.',
			guarded: true
		});
	}

	run(msg) {
		return msg.say(stripIndents`
			Contribute to my (and other projects) continued development!
			<https://www.patreon.com/axelgreavette>
		`);
	}
};