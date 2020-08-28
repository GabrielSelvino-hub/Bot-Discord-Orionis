const Discord = require("discord.js");

exports.run = (bot, message, args) => {
    
    var membro = message.mentions.members.first();
    let pessoa = message.mentions.members.first();
    let nomeserver = message.mentions.guild.name

    var emb = new Discord.MessageEmbed()
    .setColor('#ff385e')
    .setDescription(`mencione um usuario! ex.: o.ban @membro [motivo]`)
    message.delete()
    if (!membro) return message.channel.send(emb).then(m => 
        m.delete({ timeout: 5000, reason: 'It had to be done.' }))
    

    var emb1 = new Discord.MessageEmbed()
    .setColor('#ff385e')
    .setDescription(`vc nao pode banir vc mesmo.`)
    message.delete()
    if (membro === message.member) return message.channel.send(emb1).then(m => 
        m.delete({ timeout: 4000, reason: 'It had to be done.' }))
    
    var motivo = args.slice(1).join(" ");
    var emb2 = new Discord.MessageEmbed()
    .setColor('#ff385e')
    .setDescription(`você precisa da permissao **Banir Membros**.`)
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(emb2).then(m => 
        m.delete({ timeout: 5000, reason: 'It had to be done.' }))
        
    var emb0 = new Discord.MessageEmbed()
    .setColor(`#ff385e`)
    .setDescription(`Você não pode banir este Usuario !`)
    if (membro.hasPermission("BAN_MEMBERS")) return message.channel.send(emb0).then(m => 
        m.delete({ timeout: 5500, reason: 'It had to be done.' }))


    var enbed = new Discord.MessageEmbed()

    .setColor('#ff385e')
    .setTitle('**CONFIRMAÇÃO**')
    .setDescription(`Você realmente deseja banir o usuario: ${pessoa} ?`);

    message.channel.send(enbed).then(msg => {
        msg.react("👍")

        let filtro = (reaction, usuario) => reaction.emoji.name === "👍" && usuario.id === message.author.id;
        let coletor = msg.createReactionCollector(filtro, {max: 1})

        coletor.on("collect", cp => {
            cp.remove(message.author.id);

            var embed = new Discord.MessageEmbed()
            
            .setColor('#b33cf0')
            .setTitle('**🚫MEMBRO BANIDO**')
            .setDescription(`Membro: ${pessoa}\nMotivo: **${motivo || "sem motivo definido"}**`)
            message.channel.send(embed)
            var embd = new Discord.MessageEmbed()
            .setColor('#b33cf0')
            .setTitle(`Você Foi Banido do \_\*\`${nomeserver}\`\*\_`)
            .setAuthor('Orionis-Bot', 'https://media.discordapp.net/attachments/597540436260945950/721513229032882196/bot_ori.png?width=492&height=429', '')
            .setImage('https://media.giphy.com/media/fe4dDMD2cAU5RfEaCU/giphy.gif')
            .setThumbnail('https://media.discordapp.net/attachments/597540436260945950/721513229032882196/bot_ori.png?width=492&height=429')
            .setDescription(`Motivo: **${motivo || "você foi banido sem motivo declarado"}**`)
            membro.send(embd); 

            membro.ban();
        })
    })
}

exports.help = {
    name: 'o.ban'
}