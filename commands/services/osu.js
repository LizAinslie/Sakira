const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
const request = require('node-superfetch');
const { OSU } = process.env

module.exports = class OsuCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'osu',
			aliases: ['osu-user', 'osu-stats'],
			group: 'services',
			memberName: 'osu',
			description: 'Responds with information on an **osu!** user.',
			clientPermissions: ['EMBED_LINKS'],
			args: [
				{
					key: 'user',
					prompt: 'What user would you like to get information on?',
					type: 'string'
				}
			]
		});
	}

	async run(msg, { user }) {
		try {
			const { body } = await request
				.get('https://osu.ppy.sh/api/get_user')
				.query({
					k: OSU,
					u: user,
					type: 'string'
				});
			if (!body.length) return msg.say('Could not find any results for that particular query.');
			const data = body[0];
            const embed = new MessageEmbed()
                .setTitle(`osu! | ${data.username}`)
				.setColor('0x36393F')
				.addField("­", `ID: **${data.user_id}**\nLevel: **${data.level || '???'}**\nAccuracy: **${Number(data.accuracy).toFixed(4) || '???'}**\nRank: **${data.pp_rank || '???'}**\nCountry: **${data.country || '???'}**\nPlay Count: **${data.playcount || '???'}**`, true)
				.addField("­", `Ranked Score: **${data.ranked_score || '???'}**\nTotal Score: **${data.total_score || '???'}**\nSS: **${data.count_rank_ss || '???'}**\nS: **${data.count_rank_s || '???'}**\nRank A: **${data.count_rank_a || '???'}**`, true)
			return msg.embed(embed);
		} catch (err) {
			return msg.reply(`Oh welp, an error occurred: \`${err.message}\`. Try again later!`);
		}
	}
};