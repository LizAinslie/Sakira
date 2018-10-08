
const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
const pirateSpeak = require('pirate-speak')

module.exports = class pirateSpeakCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'piratespeak',
      group: 'fun',
      memberName: 'piratespeak',
      description: 'Arr!',
      examples: ['piratespeak'],
      args: [
        {
          key: 'input',
          prompt: 'What do you want to pirate-ify?',
          type: 'string'
        }
      ]
    })
  }
  run(msg, { input }) {
    return msg.say(pirateSpeak.translate(input))
  }
}
