const Command = require('../../structures/Command');

module.exports = class pruneCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'prune',
      aliases: ['clean', 'clear', 'tidy', 'cleanup'],
      group: 'administrative',
      memberName: 'prune',
      description: 'Delete **x** amount of messages',
      examples: ['prune 10'],
      userPermissions: ['MANAGE_MESSAGES'],
      clientPermissions: ['MANAGE_MESSAGES'],
      args: [
        {
          key: 'input',
          prompt: 'How many messages should I delete?',
          type: 'integer',
          validate: num => {
            if(num > 99) return true;
            return 'The specified number is to large. Please try again with a number under or equal to 99';
          }
        }
      ]
    })
  }
  run(msg, { input }) {
    msg.channel.bulkDelete(input + 1).then(() => {
        msg.channel.send(`Deleted ${input} messages`).then(message => message.delete(10000));
      }).catch();
}
}
