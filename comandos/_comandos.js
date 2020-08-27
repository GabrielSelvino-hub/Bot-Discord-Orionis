const Discord = require("discord.js");



exports.run = async (bot, message, args) => {
    const embed = new Discord.MessageEmbed()
    .setColor('#ff385e')
    .setFooter('Este bot está sendo desenvolvido por ! [𝙶] 𝚊#3626', 'https://media.discordapp.net/attachments/597540436260945950/721513229032882196/bot_ori.png?width=492&height=429')
    .setThumbnail('https://media.discordapp.net/attachments/597540436260945950/721513229032882196/bot_ori.png?width=492&height=429')
	.setTitle('COMANDOS')
	.setAuthor('Orionis', 'https://media.discordapp.net/attachments/597540436260945950/721513229032882196/bot_ori.png?width=492&height=429', '')
    .addField('ping', "Ori.ping")
    .addField('delete', "Ori.del <quantidade> ( deleta msg's até 100 )")
    .addField('Developer', "Ori.developer")
    .addField('avatar', "Ori.avatar ou Ori.avatar @user")
    .addField('mute', 'Ori.mute @user <tempo> <motivo>')
    .addField('kick', 'Ori.kick @user <motivo>')
    .addField('unmute', 'Ori.unmute @user ( desmuta )')
    .addField('ban', 'Ori.ban @user [motivo]')

message.channel.send(embed);
}

exports.help = {
    name: "o.help"
}