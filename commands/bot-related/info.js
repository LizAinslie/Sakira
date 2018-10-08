const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js')

function uptime(){var msec=process.uptime().toFixed(0)*1000;var days=Math.floor(msec/1000/60/60/24);msec-=days*1000*60*60*24;var hours=Math.floor(msec/1000/60/60);msec-=hours*1000*60*60;var mins=Math.floor(msec/1000/60);msec-=mins*1000*60;var secs=Math.floor(msec/1000);var timestr="";if(days>0){timestr+=days+"d ";} if(hours>0){timestr+=hours+"h ";} if(mins>0){timestr+=mins+"m ";} if(secs>0){timestr+=secs+"s";} return timestr}
function formatBytes(a,b){if(0==a)return"0 Bytes";var c=1024,d=b||2,e=["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"],f=Math.floor(Math.log(a)/Math.log(c));return parseFloat((a/Math.pow(c,f)).toFixed(d))+" "+e[f]}

module.exports = class infoCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'info',
      group: 'bot-related',
      memberName: 'info',
      description: 'General bot infomation.',
      examples: ['info']
    })
  }
  async run(msg) {
    const embed = new MessageEmbed()
    .setTitle('Information:')
    .setColor('0x36393F')
    .setDescription('A bot focusing on the business end of a Fun time\nWebsite:** [Click Here](https://kirox.xyz)**\nInvite:** [Click Here](https://discordapp.com/oauth2/authorize?client_id=378909180666314754&scope=bot&permissions=8 )**\nSupport Guild:** [Click Here](https://discord.gg/yw6nrwz)**\nPatreon:** [Click Here](https://www.patreon.com/axelgreavette)**')
    .addField("­", `Channels: **${this.client.channels.size}**\nUsers: **${this.client.users.size}**\nGuilds: **${this.client.guilds.size}**\nCommands: **${this.client.registry.commands.size}**`, true)
    .addField("­", `Version: **2.0.0**\nPing: **${this.client.ping.toFixed(2)}ms**\nUptime: **${uptime()}**\nRAM: **${formatBytes(process.memoryUsage().heapUsed,2)}**`, true)
   msg.embed(embed)
  }
}
