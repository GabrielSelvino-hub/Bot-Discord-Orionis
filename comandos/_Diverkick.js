const Discord = require('discord.js')

exports.run = async (bot, message, args) => {
    message.delete()
    var list = [
        'https://media.giphy.com/media/LICtqQ1K8ClIQ/giphy.gif',
        'https://media.giphy.com/media/qiiimDJtLj4XK/giphy.gif',
        'https://media.giphy.com/media/63r5ltG0JvZWE/giphy.gif',
        'https://media.giphy.com/media/kDwKAjmtRpO9RTLcHq/giphy.gif',
        'https://media.giphy.com/media/mFulmRSjkW9by/giphy.gif',
        'https://media.giphy.com/media/ouoB4KWhXY4bm/giphy.gif',
        'https://media.giphy.com/media/MU1gQlfzyi7qE/giphy.gif',
        'https://media.giphy.com/media/3o6ZsVpcDUYBjUUq40/giphy.gif',
        'https://media.giphy.com/media/qj2PmcYresyfS/giphy.gif',
        'https://media.giphy.com/media/OquUwkwriK4eY/giphy.gif',
        'https://media.giphy.com/media/26gR1DpB7NvMw9Iys/giphy.gif',
        'https://media.giphy.com/media/ylp4hl9xEaWyc/giphy.gif'
    ];

    var rand = list[Math.floor(Math.random()*list.length)];
    let user = message.mentions.users.first() || bot.users.cache.get(args[0]);
    if(!user){
        return message.reply('lembre-se de mencionar um usuário válido para chutar.').then(m => 
            m.delete({ timeout: 6000, reason: 'It had to be done.' }))
    }/*
    message.channel.send(`${message.author} **acaba de chutar** ${user} !`,{files:[rand]});*/

    let avatar = message.author.displayAvatarURL({format: 'png'});
        var embed = new Discord.MessageEmbed()
            .setTitle('Chutar')
            .setColor('#b33cf0')
            .setDescription(`${message.author} acaba de chutar ${user}`)
            .setImage(rand)
            .setTimestamp()
            .setThumbnail(avatar)
            .setFooter('')
            .setAuthor(message.author.username, avatar);
        message.channel.send(embed);
}
exports.help = {
    name: "od.kick"
}
