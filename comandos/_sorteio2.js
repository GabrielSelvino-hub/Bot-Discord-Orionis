const { MessageEmbed } = require("discord.js");
const ms = require("ms");
exports.run =  async (bot, message, args) => {
    if (!message.member.hasPermission("BAN_MEMBERS")) return ;
    if (!args[0]) return message.channel.send(`Você não especificou seu horário!`);
    if (
      !args[0].endsWith("d") &&
      !args[0].endsWith("h") &&
      !args[0].endsWith("m")
    )
      return message.channel.send(
        `use Ori.sorte <tempo(m, h, d)> <canal do sorteio> <premio>`
      );
    if (isNaN(args[0][0])) return message.channel.send(`Isso não é um número!`);
    let channel = message.mentions.channels.first();
    if (!channel)
      return message.channel.send(
        `Não encontrei esse canal`
      );
    let prize = args.slice(2).join(" ");
    if (!prize) return message.channel.send(`Nenhum prêmio especificado!`);
    message.channel.send(`*Sorteio Criado no canal ${channel}*`);
    let user = message.author;
    let authoravatar = user.displayAvatarURL({ dynamic: true, format: 'png', size: 1024});
    let Embed = new MessageEmbed()
        .setAuthor(`${user.tag}`, `${authoravatar}`, '')
        .setTitle("🎉 **GIVEAWAY** 🎉")
        .setDescription(`sorteio de:  **${prize}**\nTempo do sorteio:  ${args[0]}`)
        .setFooter(`${user.tag} criador do sorteio`, )
        .setTimestamp(Date.now() + ms(args[0]))
        .setColor(`#b33cf0`);
    var m =  await channel.send(Embed);
    m.react("🎉");
    setTimeout(() => {
      if (m.reactions.cache.get("🎉").count <= 1) {
        message.channel.send(`Reactions: ${m.reactions.cache.get("🎉").count}`);
        return message.channel.send(
          `não teve pessoas que reagiram para eu falar um vencedor!`
        );
      }

      let winner = m.reactions.cache
        .get("🎉")
        .users.cache.filter((u) => !u.bot)
        .random();

        //console.log('winner: '+winner)
        //console.log('m: '+m)
        
      channel.send(
        `Obrigado **${winner}** !, Vocé é o Ganhador do sorteio e ganhou: **${prize} !!**`
      );
      
    }, ms(args[0]));
  }

exports.help = {
    name: 'o.sorte'
}