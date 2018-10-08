const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
const request = require('request')

module.exports = class cnFactCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'cnfact',
      group: 'fun',
      memberName: 'cnfact',
      description: 'Chuck Noris jokes',
      examples: ['cnfact']
    })
  }
  run(msg) {
    request('http://api.icndb.com/jokes/random', function(error, response, body) {
      var chuckData = JSON.parse(body)
      msg.say(chuckData.value.joke)
  })
}
}
