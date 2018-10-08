const Command = require('../../structures/Command');
  const { MessageEmbed } = require('discord.js');

  module.exports = class robohashCommand extends Command {
    constructor(client) {
      super(client, {
        name: 'robohash',
        group: 'fun',
        aliases: ['rb'],
        memberName: 'robohash',
        description: 'Robohash it',
        examples: ['robohash sauce'],
        args: [
          {
            key: 'input',
            prompt: 'Please enter a name for the file',
            type: 'string'
          }
        ]
      })
    }
    run(msg, { input }) {
      const embed = new MessageEmbed()
      .setImage(`https://robohash.org/${input}.png`)
      .setColor('0x36393F')
      .addField('URL',`https://robohash.org/${input}.png`, true)
      msg.embed(embed)
    }
  }
