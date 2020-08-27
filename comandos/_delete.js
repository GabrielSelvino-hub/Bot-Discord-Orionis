const Discord = require('discord.js');
 
exports.run = async (bot, message, args) => {
    
    if(message.member.hasPermission("MANAGE_MESSAGES")){
        
        const deleteCount = parseInt(args[0], [10]);
        if (!deleteCount || deleteCount < 1 || deleteCount >100 || deleteCount == NaN){
            return message.reply("de um numero de até 100 msg's a serem excluídas").then(m => 
                m.delete({ timeout: 1700, reason: 'I' }))
        }
        const fetched = await message.channel.messages.fetch({limit: deleteCount + 1})
        var emb = new Discord.MessageEmbed()
        .setColor('#b33cf0')
        .setDescription(`${args[0]} massagens apagadas neste chat`)
        message.channel
            .bulkDelete(fetched)
            message.channel.send(emb)
            .catch(error => console.log(`Não foi possivel deletar mesagens devido a: ${error}`)).then(m => 
                m.delete({ timeout: 1700, reason: 'I' }))
    }
}
 
exports.help = {
    name: 'o.del'
}