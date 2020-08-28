const Discord = require("discord.js");

exports.run = (bot, message, args) => {

    var membro = message.mentions.members.first();
    let pessoa = message.mentions.members.first();
    let nomeserver = message.mentions.guild.name

    var emb = new Discord.MessageEmbed()
    .setColor(`#ff385e`)
    .setDescription(`mencione um usuario! ex.: o.kick @membro [motivo]`)
    message.delete()
    if (!membro) return message.channel.send(emb).then(m => 
        m.delete({ timeout: 5000, reason: 'It had to be done.' }))
    
        
    var emb1 = new Discord.MessageEmbed()
    .setColor(`#ff385e`)
    .setDescription(`você nao pode kickar vc mesmo.`)
    message.delete()
    if (membro === message.member) return message.channel.send(emb1).then(m => 
        m.delete({ timeout: 4000, reason: 'It had to be done.' }))

    var motivo = args.slice(1).join(" ");
    var emb2 = new Discord.MessageEmbed()
    .setColor(`#ff385e`)
    .setDescription(`você precisa da permissao **Expulsar Membros**.`)
    if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(emb2).then(m => 
        m.delete({ timeout: 5000, reason: 'It had to be done.' }))
    
    var emb0 = new Discord.MessageEmbed()
    .setColor(`#ff385e`)
    .setDescription(`Você nâo pode expulsar este Usuario !`)
    message.delete()
    if (membro.hasPermission("KICK_MEMBERS")) return message.channel.send(emb0).then(m => 
        m.delete({ timeout: 5500, reason: 'It had to be done.' }))

    var enbed = new Discord.MessageEmbed()

    .setColor('#ff385e')
    .setTitle(`**CONFIRMAÇÂO**`)
    .setDescription(`Você realmente deseja expulsar o usuario: ${pessoa} ?`);

    message.channel.send(enbed).then(msg => {
        msg.react("👍")

        let filtro = (reaction, usuario) => reaction.emoji.name === "👍" && usuario.id === message.author.id;
        let coletor = msg.createReactionCollector(filtro, {max: 1})

        coletor.on("collect", cp => {
            cp.remove(message.author.id);

            var embed = new Discord.MessageEmbed()

            .setColor('#b33cf0')
            .setTitle('**👊-MEMBRO EXPULSO-👊**')
            .setDescription(`Membro: ${pessoa}\nMotivo: **${motivo || "sem motivo definido"}**`)
            message.channel.send(embed)
            var embd = new Discord.MessageEmbed()
            .setColor('#b33cf0')
            .setTitle(`Você Foi Expulso do \_\*\`${nomeserver}\`\*\_`)
            .setAuthor('Orionis-Bot', 'https://media.discordapp.net/attachments/597540436260945950/721513229032882196/bot_ori.png?width=492&height=429', '')
            .setImage('https://media.giphy.com/media/k7JLRHYxe47Ek/giphy.gif')
            .setThumbnail('https://media.discordapp.net/attachments/597540436260945950/721513229032882196/bot_ori.png?width=492&height=429')
            .setDescription(`Motivo: **${motivo || "você foi Expulso sem motivo declarado"}**`)
            membro.send(embd); 
            
            membro.kick();
        })
    }) 
}

exports.help = {
    name: 'o.kick'
}