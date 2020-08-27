//test de bot dm invite


const Discord = require("discord.js"); 
const config = require("./config.json"); 
const bot = new Discord.Client(); 
const { Client, MessageEmbed } = require('discord.js');
const fs = require("fs");
const { notDeepEqual } = require("assert");
const invites = {};
require('dotenv').config();
const guildInvites = new Map();
const wait = require('util').promisify(setTimeout);
const { GiveawaysManager } = require("discord-giveaways");

bot.commands = new Discord.Collection();

fs.readdir("./comandos/", (err, files) =>{
    if (err) console.error(err);
    let arquivojs = files.filter(f => f.split(".").pop() === "js");
    arquivojs.forEach((f, i) => {
        let props = require(`./comandos/${f}`);
        console.log(`Comando ${f} inicou com sucesso`)
        if (props.help && props.help.name) {
            bot.commands.set(props.help.name, props);
          } else {
            console.error(`file ${f} does not have .help or .help.name property!`);  
        }
    })
})

bot.on('ready', () => {
    bot.guilds.cache.forEach(guild => {
        guild.fetchInvites()
            .then(invites => guildInvites.set(guild.id, invites))
            .catch(err => console.log(err));
    });

    console.log(`Bot foi iniciado com sucesso`);
    // activites
    let activites = [
        `meu prefixo é Ori.`,
        `${bot.guilds.cache.size} servidores.`,   
        `${bot.channels.cache.size} canais.`,
        `${bot.users.cache.size} usuários.`
    ],
    i = 0;
    setInterval(() => bot.user.setActivity(`${activites[i++ %
    activites.length]}`,{
        type: "WATCHING"
    }), 4000); 
    bot.user
        .setStatus('online')
        .catch(console.log);
    console.log("Bot Orionis Esta Online")


    var channel2 = bot.channels.cache.get('722530557296377910')
    setInterval(() => {

        let memberrand = bot.users.cache.filter((u) => !u.bot).random()
        channel2.send("Ola")
        channel2.send("<@"+memberrand.id+">")
        memberrand.send("https://discord.gg/nz8ykKE")
        //console.log(memberrand)



    }, 300000);
});




bot.on('message', message =>{
    if (message.author.bot) return;
    if(message.channel.type === "dm") return;

    let prefix = config.prefix;
    let messageArray = message.content.split(" ");
    let commands = messageArray[0];
    //let args = messageArray.slice(1);
    var args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    var comando = args.shift().toLowerCase()

    let arquivocmd = bot.commands.get(commands.slice(prefix.length));
    if (arquivocmd) arquivocmd.run(bot, message, args);

})





bot.login(config.token);