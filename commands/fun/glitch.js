const Command = require('../../structures/Command');
const { createCanvas, loadImage } = require('canvas');
const request = require('node-superfetch');
const { distort } = require('../../util/Canvas');

module.exports = class GlitchCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'glitch',
			group: 'fun',
			memberName: 'glitch',
			description: 'Draws an image or a user\'s avatar but glitched.',
			throttling: {
				usages: 1,
				duration: 10
			},
			clientPermissions: ['ATTACH_FILES'],
			args: [
				{
					key: 'image',
					prompt: 'What image would you like to edit?',
					type: 'image|avatar',
					default: msg => msg.author.displayAvatarURL({ format: 'png', size: 512 })
				}
			]
		});
	}

	async run(msg, { image }) {
		try {
			msg.channel.startTyping()
			const { body } = await request.get(image);
			const data = await loadImage(body);
			const canvas = createCanvas(data.width, data.height);
			const ctx = canvas.getContext('2d');
			ctx.drawImage(data, 0, 0);
			distort(ctx, 20, 0, 0, data.width, data.height, 5);
			const attachment = canvas.toBuffer();
			if (Buffer.byteLength(attachment) > 8e+6) return msg.reply('Resulting image was above 8 MB.');
			msg.say({ files: [{ attachment, name: 'glitch.png' }] });
			msg.channel.stopTyping()
		} catch (err) {
			return msg.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
	}
};