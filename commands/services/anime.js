const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
const Anime = require('malapi').Anime;

module.exports = class animeCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'anime',
      aliases: ['mal'],
      group: 'services',
      memberName: 'anime',
      description: 'MAL Anime lookup',
      examples: ['anime'],
      args: [
        {
          key: 'search',
          prompt: 'I need a snowflake for that!',
          type: 'string'
        }
      ]
    })
  }

  run(msg, { search }) {
    Anime.fromName(search).then(anime => {
      const embed = new MessageEmbed()
      .setDescription(anime.synopsis.replace('', '[Written by MAL Rewrite]'))
      .setTitle(anime.title)
      .setFooter(`Genre(s): ${anime.genres.join(", ")}`)
      .setColor('0x36393F')
      .setThumbnail(anime.image)
      .addField("­", `Rating (/10): **${anime.statistics.score.value}**\nVote #: **${anime.statistics.score.count}**\n\n**[Episodes](${anime.episodesLink})**`, true)
      .addField("­", `Episodes: **${anime.episodes}**\n\n\n**[Details](${anime.detailsLink})**`, true)
      msg.embed(embed)
      });
  }
}
