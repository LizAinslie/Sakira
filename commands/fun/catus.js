const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');

module.exports = class catusCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'catus',
      group: 'fun',
      memberName: 'catus',
      description: 'Error Codes portrayed as cats',
      examples: ['catus'],
      args: [
        {
          key: 'input',
          prompt: 'Please enter an error code!',
          type: 'string'
        }
      ]
    })
  }
  run(msg, { input }) {
    const embed = new MessageEmbed()
    .setImage(`https://http.cat/${input}`)
    .setTitle(`Error ${input}`)
    .setColor('0x36393F')
    msg.embed(embed)
  }
}
