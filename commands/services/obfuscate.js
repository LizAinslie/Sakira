const Command = require('../../structures/Command');
var JavaScriptObfuscator = require('javascript-obfuscator');

module.exports = class obfuscateCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'obfuscate',
      group: 'services',
      memberName: 'obfuscate',
      description: 'Obfuscate code',
      examples: ['obfuscate'],
      args: [
        {
          key: 'input',
          prompt: 'What code do you want to obfuscate?',
          type: 'string'
        }
      ]
    })
  }
  run(msg, { input }) {
    const res = JavaScriptObfuscator.obfuscate(`${input}`,{compact: true,controlFlowFlattening: true})
    msg.say('Result:\n```js\n' + res.getObfuscatedCode() + '\n```')
    }
}
