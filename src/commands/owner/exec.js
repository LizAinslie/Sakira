const Command = require("../../structures/Command")
const cp = require("child_process")

module.exports = class execCommand extends Command {
    constructor(client) {
        super(client, {
            name: "exec",
            aliases: ["exec"],
            group: "owner",
            memberName: "exec",
            description: "Execute a console command using child processes",
            examples: ["exec"],
            ownerOnly: true,
            hidden: true,
            args: [
                {
                    key: "input",
                    prompt: "I need the command you want to execute",
                    type: "string"
                }
            ]
        })
    }
    run(msg, { input }) {
	  try{
		cp.exec(`${input}`,(error, stdout, stderr) => {
                if(error) return console.log({error, stdout, stderr})
                console.log(stdout)
                msg.say(stdout, { split: true})
            })
	  }catch(e){
		msg.say(e, { split: true })
	  }
    }
}
