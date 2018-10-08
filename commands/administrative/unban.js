const Command = require('../../structures/Command');

module.exports = class unbanCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'unban',
      aliases: ['unban'],
      group: 'administrative',
      memberName: 'unban',
      description: 'Unban someone from the guild',
      examples: ['unban'],
      userPermissions: ['BAN_MEMBERS'],
      clientPermissions: ['BAN_MEMBERS'],
      args: [
        {
          key: 'input',
          prompt: 'I need the id of the user you want to unban',
          type: 'string'
        }
      ]
    })
  }
  run(msg, { input }) {
    msg.guild.unban(input).then(() => {
      msg.say(`👌`)
    }).catch()
}
}
