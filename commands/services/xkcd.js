const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
const  xkcd = require('xkcd');

module.exports = class xkcdCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'xkcd',
      group: 'services',
      memberName: 'xkcd',
      description: 'XKCD comics',
      examples: ['xkcd'],
      args: [
        {
          key: 'type',
          prompt: 'Random or latest?',
          type: 'string',
          optional: 'true'
        }
      ]
    })
  }

  run(msg, { type }) {
    if(type.toUpperCase() === 'RANDOM'){
      xkcd(Math.floor(Math.random() * (1935 - 1 - 1)) + 1, function (data) {
        const embed = new MessageEmbed()
        .setTitle(data.safe_title)
        .setDescription(data.alt)
        .setColor('0x36393F')
        .addField('Day:', data.day, true)
        .addField('Comic \"#\"', data.num, true)
        .addField('Released:', data.year, true)
        .setImage(data.img)
        msg.embed(embed)
      });
    }
      if(type.toUpperCase() === 'LATEST'){
        xkcd(function (data) {
          const embed = new MessageEmbed()
          .setTitle(data.safe_title)
          .setDescription(data.alt)
          .setColor('0x36393F')
          .addField('Day:', data.day, true)
          .addField('Comic \"#\"', data.num, true)
          .addField('Released:', data.year, true)
          .setImage(data.img)
          msg.embed(embed)
        })
    }
  }
}
