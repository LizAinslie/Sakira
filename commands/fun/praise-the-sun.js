const Command = require('../../structures/Command');
const { createCanvas, loadImage } = require('canvas');
const request = require('node-superfetch');
const path = require('path');

module.exports = class PraiseTheSunCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'praise-the-sun',
            group: 'fun',
            aliases: ['pts'],
			memberName: 'praise-the-sun',
			description: 'PRAISE. THE. SUUUUNNNNN.',
			throttling: {
				usages: 1,
				duration: 10
			},
			clientPermissions: ['ATTACH_FILES'],
			args: [
				{
					key: 'user',
					prompt: 'Which user should praise?',
					type: 'user',
					default: msg => msg.author
				}
			]
		});
	}

	async run(msg, { user }) {
        const avatarURL = user.displayAvatarURL({ format: 'png', size: 512 })
		try {
			msg.channel.startTyping()
			const base = await loadImage(path.join(__dirname, '..', '..', 'assets', 'images', 'praise-the-sun.png'));
			const { body } = await request.get(avatarURL);
			const avatar = await loadImage(body);
			const canvas = createCanvas(base.width, base.height);
			const ctx = canvas.getContext('2d');
			ctx.drawImage(base, 0, 0);
			ctx.rotate(8 * (Math.PI / 180));
			ctx.drawImage(avatar, 427, 4, 135, 125);
			ctx.rotate(-8 * (Math.PI / 180));
			msg.say({ files: [{ attachment: canvas.toBuffer(), name: 'praise-the-sun.png' }] });
			msg.channel.stopTyping()
		} catch (err) {
			return msg.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
	}
};