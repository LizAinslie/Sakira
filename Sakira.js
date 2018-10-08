require('dotenv').config()
const { SAKIRA_TOKEN, OWNERS, SAKIRA_PREFIX, INVITE, TWITCH_CLIENT_ID } = process.env;
const path = require('path');
const Client = require('./structures/Client')
const sqlite = require('sqlite')
const request = require('request')
const Prototypes = require('./util/Prototypes')

//client setup
const client = new Client({
  commandPrefix: SAKIRA_PREFIX,
  owner: OWNERS.split(','),
  invite: INVITE,
  disableEveryone: true,
  unknownCommandResponse: false
})

/*prefixes
client.setProvider(
    sqlite.open(path.join(__dirname, 'settings.sqlite3')).then(db => new client.SQLiteProvider(db))
).catch(console.error);
*/
//register commands
client.registry
  .registerDefaultTypes()
	.registerTypesIn(path.join(__dirname, 'types'))
  .registerGroups([
    ['fun', 'Fun:'],
    ['services', 'Services:'],
    ['tags', 'Tags:'],
    ['administrative', 'Administrative:'],
    ['community', 'Community:'],
    ['support', 'Support:'],
    ['bot-related', 'Bot Related:'],
    ['profiles', 'Profiles:'],
    ['owner', 'Owner Only:']
  ])
  .registerDefaultGroups()
  .registerDefaultCommands({
      ping: false,
      commandState: false
  })
  .registerCommandsIn(path.join(__dirname, 'commands'))


//events
client.on('ready', () => {
  console.log('Logged into Discord as Sakira')
  var options = {
    url: 'https://api.twitch.tv/helix/streams?user_login=axelgreavette',
    headers: {
      'Client-ID': TWITCH_CLIENT_ID
    }
  };
  //request to twitch
  request(options, function(error, response, body) {
    try {
      var bod = JSON.parse(body)
      if (bod.data[0] == undefined) {
         client.user.setActivity(`the real Sakira`, {
           type: 'WATCHING'
         });
      } else {
        client.user.setActivity(bod.data[0].title, {
          type: 'STREAMING',
          url: 'https://twitch.tv/axelgreavette'
        });
        console.log(`Set presence to "Streaming ${bod.data[0].title}"`)
      }
    } catch (e) {
      console.log(`${e}`)
    }
  })
  //interval
  setInterval(() => {
    request(options, function(error, response, body) {
      try {
        var bod = JSON.parse(body)
        if (bod.data[0] == undefined) {
          client.user.setActivity(`the real Sakira`, {
            type: 'WATCHING'
          });
        } else {
          client.user.setActivity(bod.data[0].title, {
            type: 'STREAMING',
            url: 'https://twitch.tv/axelgreavette'
          });
          console.log(`Set presence to "Streaming ${bod.data[0].title}"`)
        }
      } catch (e) {
        console.log(`${e}`)
      }
    })
  }, 300000)
})
client.on('error', e => {
  console.log(e)
})
client.on('warn', warn =>{
  console.warn(warn)
})
client.on('debug', dbg => {
  console.debug(dbg)
})
client.on('disconnect', e => {
  setInterval(() => {
    client.login(config.token)
  }, 120000)
  console.log(e)
})
client.on('reconnect', () =>{
  console.log('I reconnected successfully')
})

process.on('unhandledRejection', r=>{
  setInterval(() => {
    client.login(config.token)
  }, 120000)
  console.log(r)
})

//login to client
client.login(SAKIRA_TOKEN)