const util = require('util')

module.exports = () => {
    Discord.Channel.prototype.sendTyping = async function() {
	if (this.startTyping) this.client.rest.methods.sendTyping(this.id);
}

Discord.User.prototype.smallAvatarURL = getSmallAvatar();
	function getSmallAvatar() {
		if (this.avatar) return `https://cdn.discordapp.com/avatars/${this.id}/${this.avatar}.png?size=32`;
		else return `https://cdn.discordapp.com/embed/avatars/${this.discriminator % 5}.png`;
}

Discord.Emoji.prototype.url = getEmojiURL();
	function getEmojiURL() {
		let type;
		if (this.animated) type = "gif";
		else type = "png";
		return `https://cdn.discordapp.com/emojis/${this.id}.${type}`;
}

global.stringify = async function(data) {
	let result;
	if (data === undefined) result = "`undefined`";
	else if (data === null) result = "`null`";
	else if (typeof(data) == "function") result = "`function'";
	else if (typeof(data) == "string") result = `"${data}"`;
	else if (typeof(data) == "number") result = data.toString();
	else if (data.constructor && data.constructor.name == "Promise") result = stringify(await data);
	else if (data.constructor && data.constructor.name.toLowerCase().includes("error")) {
		let errorObject = {};
		Object.entries(data).forEach(e => {
			errorObject[e[0]] = e[1];
		});
		result = "```\n"+data.stack+"``` "+(await stringify(errorObject));
	} else result = "```js\n"+util.inspect(data)+"```";

	if (result.length >= 2000) {
		if (result.startsWith("```")) {
			result = result.slice(0, 1995).replace(/`+$/, "").replace(/\n\s+/ms, "")+"…```";
		} else {
			result = result.slice(0, 1998)+"…";
		}
	}
	return result;
}

Discord.Client.prototype.findUser = function(msg, usertxt, self = false) {
    usertxt = usertxt.toLowerCase();
    if (/<@!?(\d+)>/.exec(usertxt)) usertxt = /<@!?(\d+)>/.exec(usertxt)[1];
    let matchFunctions = [];
    matchFunctions = matchFunctions.concat([
        user => user.id.includes(usertxt),
        user => user.tag.toLowerCase() == usertxt,
        user => user.username.toLowerCase() == usertxt,
        user => user.username.toLowerCase().includes(usertxt)
    ]);
    if (!usertxt) {
        if (self) return msg.author;
        else return null;
    } else {
        return client.users.get(usertxt) || matchFunctions.map(f => {
            return client.users.find(u => f(u));
        }).find(u => u) || null;
    }
}

Discord.Guild.prototype.findMember = function(msg, usertxt, self = false) {
    usertxt = usertxt.toLowerCase();
    if (/<@!?(\d+)>/.exec(usertxt)) usertxt = /<@!?(\d+)>/.exec(usertxt)[1];
    let matchFunctions = [];
    matchFunctions = matchFunctions.concat([
        member => member.id.includes(usertxt),
        member => member.user.tag.toLowerCase() == usertxt,
        member => member.user.username.toLowerCase() == usertxt,
        member => member.displayName.toLowerCase() == usertxt,
        member => member.user.username.toLowerCase().includes(usertxt),
        member => member.displayName.toLowerCase().includes(usertxt)
    ]);
    if (!usertxt) {
        if (self) return msg.member;
        else return null;
    } else {
        return this.members.get(usertxt) || matchFunctions.map(f => {
            return this.members.find(m => f(m));
        }).find(m => m) || null;
    }
}
}