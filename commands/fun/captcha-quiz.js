const Command = require('../../structures/Command');
const { createCanvas, registerFont } = require('canvas');
const path = require('path');
const pool = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ23456789'.split('');
registerFont(path.join(__dirname, '..', '..', 'assets', 'fonts', 'Captcha.ttf'), { family: 'Captcha' });

module.exports = class CaptchaQuizCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'captcha-quiz',
			aliases: ['captcha'],
			group: 'fun',
			memberName: 'captcha-quiz',
			description: 'Try to guess what the captcha says in 15 seconds or less.',
			throttling: {
				usages: 1,
				duration: 10
			},
			clientPermissions: ['ATTACH_FILES']
		});
	}

	async run(msg) {
		try {
			msg.channel.startTyping()
			const canvas = createCanvas(125, 32);
			const ctx = canvas.getContext('2d');
			const text = this.randomText(5);
			ctx.fillStyle = 'white';
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			ctx.beginPath();
			ctx.strokeStyle = '#0088cc';
			ctx.font = '26px Captcha';
			ctx.rotate(-0.05);
			ctx.strokeText(text, 15, 26);
			await msg.say('**You have 15 seconds, what does the captcha say?**', { files: [{ attachment: canvas.toBuffer(), name: 'captcha-quiz.png' }] });
			const msgs = await msg.channel.awaitMessages(res => res.author.id === msg.author.id, {
				max: 1,
				time: 15000
			});
			if (!msgs.size) return msg.reply(`Sorry, time is up! It was ${text}.`);
			if (msgs.first().content !== text) return msg.reply(`Nope, sorry, it's ${text}.`);
			msg.say('Nice job! 10/10! You deserve some cake!');
			msg.channel.stopTyping()
		}catch(error){
			return msg.say('Error! \n\`\`\`' + error + '\`\`\`')
		}
	}

	randomText(len) {
		const result = [];
		for (let i = 0; i < len; i++) result.push(pool[Math.floor(Math.random() * pool.length)]);
		return result.join('');
	}
};