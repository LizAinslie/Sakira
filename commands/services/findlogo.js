const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');

module.exports = class findlogoCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'findlogo',
      group: 'services',
      memberName: 'findlogo',
      description: 'Find a logo from a website',
      examples: ['findlogo google.ca'],
      args: [
        {
          key: 'input',
          prompt: 'Company website?',
          type: 'string'
        }
      ]
    })
  }
  run(msg, { input }) {
      const embed = new MessageEmbed()
      .setTitle('Result:')
      .setImage(`https://logo.clearbit.com/${input}`)
      .setColor('0x36393F')
    msg.embed(embed)
  }
}
