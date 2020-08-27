const Discord = require("discord.js");


exports.run = (bot, message, args) => {
    if (!message.member.hasPermission("MUTE_MEMBERS")) { // Verifica se o autor da mensagem possui permissão de gerenciar cargos
        var emb0 = new Discord.MessageEmbed()
        .setColor('#b33cf0')
        .setDescription('você não tem permissão para usar esse comando.')
        message.channel.send(emb0).then(m => 
            m.delete({ timeout: 7000, reason: 'It had to be done.' }))
        return null;
    }

    const membro = message.mentions.members.first();
    var emb2 = new Discord.MessageEmbed()
    .setColor('#b33cf0')
    .setDescription('mencione um membro valido.')
    if (!membro) {
        message.channel.send(emb2).then(m => 
            m.delete({ timeout: 5500, reason: 'It had to be done.' }))
        message.delete()
        return null;
    }

    var emb3 = new Discord.MessageEmbed()
    .setColor('#b33cf0')
    .setDescription('o membro mencionado não está silenciado.')
    if (!membro.roles.cache.some(role => ["Mutado"].includes(role.name))) {
        message.channel.send(emb3).then(m => 
            m.delete({ timeout: 5500, reason: 'It had to be done.' }))
        message.delete()
        return null;
    }
  
    const role = message.guild.roles.cache.find(role => role.name === 'Mutado');
    const member = message.mentions.members.first();
    member.roles.remove(role);
    
    var emb4 = new Discord.MessageEmbed()
    .setColor('#b33cf0')
    .setDescription(`O membro ${membro} agora pode falar novamente.`)
    message.channel.send(emb4).then(m => 
        m.delete({ timeout: 10000, reason: 'It had to be done.' }))
    message.delete()
    var emb5 = new Discord.MessageEmbed()
    .setColor('#b33cf0')
    .setDescription(`${membro} foi desmutado por \`${message.author.tag}\``);
    const channe4 = bot.channels.cache.get('721514489773817966')
    channe4.send(emb5)
  }

exports.help = {
    name: 'o.unmute'
}
