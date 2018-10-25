const Command = require("../../structures/Command")
const { MessageEmbed } = require("discord.js")
const circleci = require("circleci")
const { CIRCLE_AUTH, SAKIRA_VERSION } = process.env

const ci = new circleci({
    auth: CIRCLE_AUTH
})

function uptime(){var msec=process.uptime().toFixed(0)*1000;var days=Math.floor(msec/1000/60/60/24);msec-=days*1000*60*60*24;var hours=Math.floor(msec/1000/60/60);msec-=hours*1000*60*60;var mins=Math.floor(msec/1000/60);msec-=mins*1000*60;var secs=Math.floor(msec/1000);var timestr="";if(days>0){timestr+=days+"d "} if(hours>0){timestr+=hours+"h "} if(mins>0){timestr+=mins+"m "} if(secs>0){timestr+=secs+"s"} return timestr}
function formatBytes(a,b){if(0==a)return"0 Bytes";var c=1024,d=b||2,e=["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"],f=Math.floor(Math.log(a)/Math.log(c));return parseFloat((a/Math.pow(c,f)).toFixed(d))+" "+e[f]}

module.exports = class statsCommand extends Command {
    constructor(client) {
        super(client, {
            name: "stats",
            group: "bot-information",
            memberName: "stats",
            description: "General bot statistics.",
            examples: ["stats"],
        })
    }
    async run(msg) {
        const res = await ci.getBuilds({ username: "axelgreavette", project: "Sakira" })

        const embed = new MessageEmbed()
            .setTitle("Statistics:")
            .setColor("0x36393F")
            .addField("­", `Channels: **${this.client.channels.size}**\nUsers: **${this.client.users.size}**\nGuilds: **${this.client.guilds.size}**\nCommands: **${this.client.registry.commands.size}**\nBuild: **${res[0].status === "success" ? "Passing" : "Failing"}**`, true)
            .addField("­", `Version: **${SAKIRA_VERSION}**\nPing: **${this.client.ping.toFixed(2)}ms**\nUptime: **${uptime()}**\nRAM: **${formatBytes(process.memoryUsage().heapUsed,2)}**\n`, true)
        msg.embed(embed)
    }
}
