const Discord = require('discord.js');

exports.run = (bot, message, args) => {//problema na implantação 

    if (message.member.hasPermission("BAN_MEMBERS")){
        message.delete()
        console.log(bot.role)
        //const muterole = bot.roles('720009353179955250')
        //const muterole = message.guild.roles.cache.find(r => r.name === "everyone")
       // console.log(muterole)
        
        bot.guild.roles.everyone.setPermissions(['SEND_MESSAGES', 'ADD_REACTIONS']);
        //muterole.setPermissions([permission1, permission2], "reason");
    }

}

exports.help = {
    name: "o.muteall"
}