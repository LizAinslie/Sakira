const Command = require('../../structures/Command');
const request = require('node-superfetch');
const cheerio = require('cheerio');
const { MessageEmbed } = require('discord.js');
const { shorten } = require('../../util/Util');

module.exports = class KnowYourMemeCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'know-your-meme',
			aliases: ['kym', 'meme-info', 'meme-search'],
			group: 'fun',
			memberName: 'know-your-meme',
			description: 'Searches Know Your Meme for your meme.',
			clientPermissions: ['EMBED_LINKS'],
			args: [
				{
					key: 'query',
					prompt: 'What meme would you like me to search for?',
					type: 'string'
				}
			]
		});
	}

	async run(msg, { query }) {
		try {
			const location = await this.search(query);
			if (!location) return msg.say('Could not find any results.');
			const data = await this.fetchMeme(location);
			const embed = new MessageEmbed()
				.setColor('0x36393F')
				.setTitle(data.name)
				.setDescription(shorten(data.description || 'Sorry but that description got lost in the mail.'))
				.setURL(data.url)
				.setThumbnail(data.thumbnail);
			return msg.embed(embed);
		} catch (err) {
			return msg.reply(`Error at 12 O'Clock: \n${err}`);
		}
	}

	async search(query) {
		const { text } = await request
			.get('https://knowyourmeme.com/search')
			.query({ q: query });
		const $ = cheerio.load(text);
		const location = $('.entry-grid-body').find('tr td a').first().attr('href');
		if (!location) return null;
		return location;
	}

	async fetchMeme(location) {
		const { text } = await request.get(`https://knowyourmeme.com${location}`);
		const $ = cheerio.load(text);
		const thumbnail = $('a[class="photo left wide"]').first().attr('href')
			|| $('a[class="photo left "]').first().attr('href')
			|| null;
		return {
			name: $('h1').first().text().trim(),
			url: `https://knowyourmeme.com${location}`,
			description: this.getMemeDescription($),
			thumbnail
		};
	}

	getMemeDescription($) {
		const children = $('.bodycopy').first().children();
		for (let i = 0; i < children.length; i++) {
			const child = children.eq(i);
			if (child.text() === 'About') {
				for (let j = i + 1; j < children.length; j++) {
					const text = children.eq(j).text();
					if (text) return text;
				}
			}
		}
		return null;
	}
};