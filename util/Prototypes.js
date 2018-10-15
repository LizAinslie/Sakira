const Discord = require("discord.js")

Discord.Channel.prototype.startProtoTyping = async function(count) {
    if (typeof count !== "undefined" && count < 1) throw new RangeError("Count must be at least 1.")
    if (this.client.user._typing.has(this.id)) {
        const entry = this.client.user._typing.get(this.id)
        entry.count = count || entry.count + 1
        return
    }

    const entry = {
        count: count || 1,
        interval: this.client.setInterval(() => {
            this.client.rest.methods.sendTyping(this.id).catch(() => {
                this.client.clearInterval(entry.interval)
                this.client.user._typing.delete(this.id)
            })
        }, 9000),
    }
    this.client.rest.methods.sendTyping(this.id).catch(() => {
        this.client.clearInterval(entry.interval)
        this.client.user._typing.delete(this.id)
    })
    this.client.user._typing.set(this.id, entry)
}

Discord.Channel.prototype.sendTyping = async function() {
    if (this.startTyping) await this.client.rest.methods.sendProtoTyping(this.id)
}

Discord.Guild.prototype.findMember = function(msg, suffix, self = false) {
    if (!suffix) {
        if (self) return msg.member
        else return null
    } else {
        let member = msg.guild.members.find(m => m.user.tag.toLowerCase().includes(suffix.toLowerCase())) || msg.mentions.members.first() || msg.guild.members.get(suffix) || msg.guild.members.find(m => m.displayName.toLowerCase().includes(suffix.toLowerCase()) || m.user.username.toLowerCase().includes(suffix.toLowerCase()))
        return member
    }
}
