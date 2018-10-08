const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');

module.exports = class wumboCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'wumbo',
      aliases: ['emogy', 'emote', 'emoji'],
      group: 'fun',
      memberName: 'wumbo',
      description: 'Bigger the better',
      examples: ['wumbo'],
      args: [
        {
          key: 'whatToSplit',
          prompt: 'I need an emote!',
          type: 'string'
        }
      ]
    })
  }
  run(msg, { whatToSplit }) {
    let URL = 'https://cdn.discordapp.com/emojis/'
    if (whatToSplit.includes('<:')) {
      URL += whatToSplit
        .slice(whatToSplit.indexOf('<:'), whatToSplit.indexOf('>'))
        .split(':')[2] + '.png';

    } else if (whatToSplit.includes('<a:')) {
      URL += whatToSplit
        .slice(whatToSplit.indexOf('<a:'), whatToSplit.indexOf('>'))
        .split(':')[2] + '.gif';
    }

    const embed = new MessageEmbed()
    .setImage(URL)
    .setColor('0x36393F')
    return msg.embed(embed)
  }
}
