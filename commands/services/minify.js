const Command = require('../../structures/Command');
const minify = require('minify')

module.exports = class minifyCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'minify',
      group: 'services',
      memberName: 'minify',
      description: 'Minify code',
      examples: ['minify css', 'minify js'],
      args: [
        {
          key: 'type',
          prompt: 'Do you want to minify CSS or JS?',
          type: 'string'
        },
        {
          key: 'input',
          prompt: 'What code do you want to minfy?',
          type: 'string'
        }
      ]
    })
  }
  run(msg, { type, input }) {
   if(type.toUpperCase() === 'JS'){
        minify.js(`${input}`, function(error, data) {
            if(error) msg.say(error);
            msg.say('Result:\n```js\n' + data + '\n```')
    })
  }else if(type.toUpperCase() === 'CSS'){
        minify.css(`${input}`, function(error, data) {
            if(error) msg.say(error);
            msg.say('Result:\n```js\n' + data + '\n```')
      })
  }else if(!type.toUpperCase() === 'CSS' || !type.toUpperCase() === 'JS'){
    msg.say('That is not a valid type. Try **CSS** or **JS**')
  }
}
}
