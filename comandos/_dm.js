const Discord = require("discord.js");


exports.run = async(bot, message, args) => { //comando em tests

    if(!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send("vocé não tem permição par usar este comando");

    //random member
    
    let memberrand = bot.users.cache.filter((u) => !u.bot).random()
    console.log("member rand:\n"+memberrand)
    memberrand.send("bom dia bom dia")

    
    //dm
    let user = message.mentions.members.first() || message.guild.member.cache.get(args[0])
    if (!user) return message.channel.send("vocé não mencionou um membro ou o id é invalido")
    if(!args.slice(1).join(" ")) return message.channel.send("vocé não colocou uma messagem");
    user.user.send(args.slice(1).join(' ')).catch(() => message.channel.send('esse usuário não pôde ser DMed!')).then(()=> message.channel.send(`Eviou uma message para ${user.user}`))
    console.log("\nuser:\n"+user)
}

exports.help = {
    name: 'Ori.dm'
}