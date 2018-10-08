const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
const ud = require('urban-dictionary')

module.exports = class urbanCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'urban',
      aliases: ['ud', 'define'],
      group: 'fun',
      memberName: 'urban',
      description: 'Search the urban dictionary',
      examples: ['urban'],
      args: [
        {
          key: 'input',
          prompt: 'I need something to search for',
          type: 'string'
        }
      ]
    })
  }
  run(msg, { input }) {
    ud.term(input, function(error, entries, tags, sounds) {
      try {
      const embed = new MessageEmbed()
      .setTitle('Result:')
      .setDescription(entries[0].definition.replace('Adj.', ''))
      .setColor('0x36393F')
      .addField('Example:', entries[0].example)
      msg.embed(embed)
    }catch(e){
      msg.say(`${e}. Please try a different query.`)
    }
  })
}
}
