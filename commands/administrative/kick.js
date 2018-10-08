const Command = require('../../structures/Command');

module.exports = class kickCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'kick',
      aliases: ['kick'],
      group: 'administrative',
      memberName: 'kick',
      description: 'Kick someone from the guild',
      examples: ['kick'],
      userPermissions: ['KICK_MEMBERS'],
      clientPermissions: ['KICK_MEMBERS'],
      args: [
        {
          key: 'input',
          prompt: 'I need a member to kick.',
          type: 'string'
        }
      ]
    })
  }
  run(msg, { input }) {

    function findMember(msg, suffix, self = false) {
      if (!suffix) {
        if (self) return msg.member
        else return null
      } else {
        let member = msg.mentions.members.first() || msg.guild.members.get(suffix) || msg.guild.members.find(m => m.displayName.toLowerCase().includes(suffix.toLowerCase()) || m.user.username.toLowerCase().includes(suffix.toLowerCase()));
        return member
      }
    }
    findMember(msg, input, false).kick().then(() => {
      msg.say('👌')
    }).catch()
}
}
