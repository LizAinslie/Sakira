const Command = require('../../structures/Command');

module.exports = class idofCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'idof',
      aliases: ['id-of', 'id'],
      group: 'services',
      memberName: 'idof',
      description: 'Find an id of a channel or user',
      examples: ['idof @Astatlos', 'id #testing'],
      args: [
        {
          key: 'input',
          prompt: 'I need a channel or user to find the id of',
          type: 'string'
        }
      ]
    })
  }
  run(msg, { input }) {
    msg.say(input.replace('@', '').replace('>', '').replace('#', '').replace('!', '').replace('<', ''))
}
}
