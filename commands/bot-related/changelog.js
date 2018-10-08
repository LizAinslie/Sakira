const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
const request = require('request');

function base64(text,mode='encode'){if(mode==='encode')return Buffer.from(text).toString('base64');if(mode==='decode')return Buffer.from(text,'base64').toString('utf8')||null;throw new TypeError(`${mode}is not a supported base64 mode.`);}
function shorten(text,maxLen=2000){return text.length>maxLen?`${text.substr(0,maxLen-3)}...`:text;}

module.exports = class ChangelogCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'changelog',
			aliases: ['updates', 'commits', 'update'],
			group: 'bot-related',
			memberName: 'changelog',
			description: 'Responds with Sakira\'s latest 10 commits.',
			guarded: true
		});
	}

	async run(msg) {
        const options = {
            url: 'https://api.github.com/repos/axelgreavette/sakira/commits',
            headers: {
                'User-Agent': 'Sakira',
                'Authorization': `Basic ${base64(`axelgreavette:Greavette1`)}` 
            }
        }
		request(options,function(error, response, body) {
        const bod = JSON.parse(body)
		const commits = bod.slice(0, 10);
		const embed = new MessageEmbed()
			.setTitle(`[sakira:master] Latest 10 commits`)
            .setColor('0x36393F')
			.setURL(`https://github.com/axelgreavette/sakira/commits/master`)
			.setDescription(
				commits.map(commit => {
				const hash = `[\`${commit.sha.slice(0, 7)}\`](${commit.html_url})`;
				return `${hash} ${shorten(commit.commit.message.split('\n')[0], 50)} - ${commit.author.login}`;
			}).join('\n')
			);
        return msg.embed(embed);
        })
	}
};