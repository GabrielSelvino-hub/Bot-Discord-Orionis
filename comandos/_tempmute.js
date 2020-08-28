const Discord = require("discord.js")
const ms = require("ms")

exports.run = async (bot, message, args) => {
if(!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.send("Você não tem permissão para usar este comando").then(m => 
    m.delete({ timeout: 4000, reason: 'It had to be done.' }))
 
let time = args[1];
let mutee = message.mentions.members.first() 
if (!mutee) {
    message.delete()
    return message.channel.send("Mencione um usuario").then(m => 
        m.delete({ timeout: 10000, reason: 'It had to be done.' }))
}
else if (mutee.id === message.author.id) {
    message.delete()
    return message.reply("Você não pode se mutar").then(m => 
        m.delete({ timeout: 10000, reason: 'It had to be done.' }))
} ms
 
let reason = args.slice(2).join(" ");
if(!reason) reason = "Motivo não informado"
if(mutee.hasPermission("ADMINISTRATOR")) 
    return message.channel.send("Você não pode mutar este usuario!").then(m => 
        m.delete({ timeout: 5000, reason: 'It had to be done.' }))
 

let muterole = message.guild.roles.cache.find(r => r.name === "Mutado")
if(!muterole) {
    try{
        muterole = await message.guild.createRole({
            name: "Mutado",
            color: "#4b3500",
            permissions: []
        })
        message.guild.channels.forEach(async (channel, id) => {
            await channel.overwritePermissions(muterole, {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false,
                SEND_TTS_MESSAGES: false,
                ATTACH_FILES: false,
                SPEAK: false
            })
        })
    } catch(e) {
        console.log(e.stack);
    }
}

mutee.roles.add(muterole.id).then(() => {
    var emb4 = new Discord.MessageEmbed()
    .setColor('#b33cf0')
    .setDescription(`${mutee} foi mutado, Tempo: \` ${ms(ms(time))} \`, Motivo: \` ${reason} \``)
    const channel2 = bot.channels.cache.get('748719536324345977');
    channel2.send(emb4)
    message.delete()
})
setTimeout(function(){
  mutee.roles.remove(muterole.id).then(() => {
    var emb5 = new Discord.MessageEmbed()
    .setColor('#b33cf0')
    .setDescription(`${mutee} foi desmutado`)
    const channel1 = bot.channels.cache.get('748719536324345977');
    channel1.send(emb5)
  })
}, ms(time))
var emb4 = new Discord.MessageEmbed()
    .setColor('#b33cf0')
    .setDescription(`${mutee} foi mutado, Tempo: \` ${ms(ms(time))} \`, Motivo: \` ${reason} \``)
    message.channel.send(emb4).then(m => 
        m.delete({ timeout: 5000, reason: 'It had to be done.' }))
    console.log(time)
    console.log(mutee)
}

exports.help = {
    name: "o.mute"
}

