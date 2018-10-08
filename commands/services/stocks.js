const Command = require('../../structures/Command');
const moment = require('moment');
const { MessageEmbed } = require('discord.js');
const request = require('node-superfetch');

module.exports = class StocksCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'stocks',
			aliases: ['stock', 'alpha-vantage'],
			group: 'services',
			memberName: 'stocks',
			description: 'Responds with the current stocks for a specific symbol.',
			clientPermissions: ['EMBED_LINKS'],
			args: [
				{
					key: 'symbol',
					prompt: 'What symbol would you like to get the stocks of?',
					type: 'string'
				}
			]
		});
	}

	async run(msg, { symbol }) {
		try {
			const { body } = await request
				.get('https://www.alphavantage.co/query')
				.query({
					function: 'TIME_SERIES_INTRADAY',
					symbol,
					interval: '1min',
					apikey: 'CE2FTR1QCFDAKCI9'
				});
			if (body['Error Message']) return msg.say('Welp, I could not find any results.');
			const data = Object.values(body['Time Series (1min)'])[0];
			const embed = new MessageEmbed()
				.setTitle(`Stocks for ${symbol.toUpperCase()}`)
                .setColor('0x36393F')
                .addField("­", `Open: **$${data['1. open']}**\nClose: **$${data['4. close']}**\nVolume: **$${data['5. volume']}**`, true)
                .addField("­", `High: **$${data['2. high']}**\nLow: **$${data['3. low']}**\nLast Updated: **${moment.utc(body['Meta Data']['3. Last Refreshed']).format('MM/DD/YYYY h:mm A')}**`, true);
			return msg.embed(embed);
		} catch (err) {
			return msg.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
	}
};