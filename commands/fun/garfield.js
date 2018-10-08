const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
const garfield = require('garfield')

module.exports = class garfieldCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'garfield',
      group: 'fun',
      memberName: 'garfield',
      description: 'Garfield Comics',
      examples: ['garfield'],
      args: [
        {
          key: 'type',
          prompt: 'Latest or Random comic?',
          type: 'string'
        }
      ]
    })
  }
  run(msg, { type }) {
    if (type.toUpperCase() == 'RANDOM') {
      const embed = new MessageEmbed()
      .setColor('0x36393F')
      .setImage(garfield.random())
      msg.embed(embed)
    }else if (type.toUpperCase() == 'LATEST') {
      const embed = new MessageEmbed()
      .setColor('0x36393F')
      .setImage(garfield.latest())
      msg.embed(embed)
    }
  }
}
