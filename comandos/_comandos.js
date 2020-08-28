const Discord = require("discord.js");



exports.run = async (bot, message, args) => {
    const embed = new Discord.MessageEmbed()
    .setColor('#ff385e')
    .setFooter('Este bot está sendo desenvolvido por ! [𝙶] 𝚊#3626', 'https://media.discordapp.net/attachments/597540436260945950/721513229032882196/bot_ori.png?width=492&height=429')
    .setThumbnail('https://media.discordapp.net/attachments/597540436260945950/721513229032882196/bot_ori.png?width=492&height=429')
	.setTitle('COMANDOS')
	.setAuthor('Orionis', 'https://media.discordapp.net/attachments/597540436260945950/721513229032882196/bot_ori.png?width=492&height=429', '')
    .addField('ping', "o.ping")
    .addField('delete', "o.del <quantidade> ( deleta msg's até 100 )")
    .addField('Developer', "o.demo")
    .addField('avatar', "o.avatar ou o.avatar @user")
    .addField('mute', 'o.mute @user <tempo(m, h, d)> <motivo>')
    .addField('kick', 'o.kick @user <motivo>')
    .addField('unmute', 'o.unmute @user ( desmuta )')
    .addField('ban', 'o.ban @user [motivo]')
    .addField('sorteio', 'o.sorte <tempo(m, h, d)> <canal do sorteio> <premio>')

message.channel.send(embed);
}

exports.help = {
    name: "o.help"
}