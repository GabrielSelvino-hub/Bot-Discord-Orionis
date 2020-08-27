const Discord = require('discord.js');
 
exports.run = (bot, message, args) => {
 
    var embed = new Discord.MessageEmbed()
    
    .setColor('#b33cf0')
    .setTitle(`🏓 PING DO BOT 🏓`)
    .setDescription(`Meu ping esta em: **${parseInt(bot.ws.ping)} ms**`)
 
    message.channel.send(embed);
}

exports.help = {
    name: 'o.ping'
}