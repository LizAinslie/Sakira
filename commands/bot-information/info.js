const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js')

function uptime(){var msec=process.uptime().toFixed(0)*1000;var days=Math.floor(msec/1000/60/60/24);msec-=days*1000*60*60*24;var hours=Math.floor(msec/1000/60/60);msec-=hours*1000*60*60;var mins=Math.floor(msec/1000/60);msec-=mins*1000*60;var secs=Math.floor(msec/1000);var timestr="";if(days>0){timestr+=days+"d ";} if(hours>0){timestr+=hours+"h ";} if(mins>0){timestr+=mins+"m ";} if(secs>0){timestr+=secs+"s";} return timestr}
function formatBytes(a,b){if(0==a)return"0 Bytes";var c=1024,d=b||2,e=["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"],f=Math.floor(Math.log(a)/Math.log(c));return parseFloat((a/Math.pow(c,f)).toFixed(d))+" "+e[f]}

module.exports = class infoCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'info',
      group: 'bot-information',
      memberName: 'info',
      description: 'General bot infomation.',
      examples: ['info']
    })
  }
  async run(msg) {
    const embed = new MessageEmbed()
    .setTitle(this.client.user.username)
    .setColor('0x36393F')
    .setDescription('A bot with enough features to make you want to ~~die~~ jump up and down')
    .addField('Creator[\'s]:', '**Kirox#3435** and **Kerox#1558**')
    .addField('Code:', 'My entire source is available on [Github](https://github.com/axelgreavette/sakira)')
   msg.embed(embed)
  }
}
