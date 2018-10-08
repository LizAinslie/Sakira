const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
const request = require('request')

module.exports = class yesnoCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'yesno',
      aliases: ['decide', 'yes-no'],
      group: 'fun',
      memberName: 'yesno',
      description: 'Simple desicion making',
      examples: ['yesno']
    })
  }
  run(msg) {
    request('https://yesno.wtf/api/', function(error, response, body) {
      var a = JSON.parse(body)
      const embed = new MessageEmbed()
      .setTitle(a.answer)
      .setImage(a.image)
      .setColor('0x36393F')
    msg.embed(embed)
  })
}
}
