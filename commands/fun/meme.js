const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
const request = require('request')

module.exports = class memeQuoteCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'meme',
      aliases: ['memequote'],
      group: 'fun',
      memberName: 'memequote',
      description: 'That really programs my code...',
      examples: ['meme']
    })
  }
  run(msg, { input }) {
    request('http://api.chew.pro/trbmb', function(error, response, body) {
      var memey = JSON.parse(body)
    return msg.say(memey)
  })
}
}
