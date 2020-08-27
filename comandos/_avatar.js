const Discord = require('discord.js')


exports.run = async (bot, message, args) => {
    let user = message.mentions.users.first() || message.author
    let memberavatar = user.displayAvatarURL({ dynamic: true, format: 'png', size: 1024});
    const embed = new Discord.MessageEmbed()
    .setAuthor(`${user.tag}`, `${memberavatar}`, '')
    .setColor('#b33cf0')
    .setImage(memberavatar)
    .setTitle(`Avattar`)
    .setURL(memberavatar)
    message.delete()
    if (message.member.hasPermission("MUTE_MEMBERS")) return message.channel.send(embed)
}

exports.help  = {
    name: "o.avatar"
}