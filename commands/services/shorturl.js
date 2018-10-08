const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js')
const request = require('request')

module.exports = class shorturlCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'shorturl',
      aliases: ["shorten", "url", "short"],
      group: 'services',
      memberName: 'shorturl',
      description: 'Shorten urls',
      examples: ['shorturl'],
      args: [
        {
            key: 'longurl',
            prompt: 'What url do you want shortened?',
            type: 'string'
        }
    ]
    })
  }
  run(msg, { longurl }) {
    request(`https://kirox.xyz/api/urls/submit?longurl=${longurl}`, function(error, response, body) {
      if(error) msg.say(error)
      const shortResult = JSON.parse(body)
      const embed = new MessageEmbed()
      .setTitle('Result:')   
      .setDescription(shortResult.full_url)
      .setColor('0x36393F')
      msg.embed(embed)
    })
  }
}
