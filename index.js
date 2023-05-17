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

    console.log(`Bot foi iniciado com sucesso!!`);
    // activites
    let activites = [
        `meu prefixo é o.`,
        `${bot.guilds.cache.size} servidor.`,   
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
});

/* send member in console
bot.on('raw', dados =>{
    console.log(dados)
    let mendion = dados.d.members
    .user.cache.filter((u)=> !u.bot)
    .random();
    console.log("member rand: "+mendion);
})*/

bot.on("guildMemberRemove", async member => {
    let mebr = member.user
    let memberavatar = mebr.displayAvatarURL({ dynamic: true, format: 'png', size: 1024});
    const emb2 = new Discord.MessageEmbed() 
    .setThumbnail(`${memberavatar}`)
    .setColor('#b33cf0')
    .setTitle('ADEUS')
    .setDescription(`${member} saiu do servidor`);
    const canal1 = bot.channels.cache.get("748719536324345977");
    canal1.send(emb2);

})




bot.on("guildMemberAdd", async member => {
    
    const cachedInvites = guildInvites.get(member.guild.id);
    const newInvites = await member.guild.fetchInvites();
    guildInvites.set(member.guild.id, newInvites);
    const usedInvite = newInvites.find(inv => cachedInvites.get(inv.code).uses < inv.uses);
    const inviter = bot.users.cache.get(usedInvite.inviter.id);
    let mebr = member.user
    let memberavatar = mebr.displayAvatarURL({ dynamic: true, format: 'png', size: 1024});
    const embed = new MessageEmbed()
        .setThumbnail(`${memberavatar}`)
        .setColor('#b33cf0')
        .setAuthor(`Orionis-Bot`, 'https://media.discordapp.net/attachments/597540436260945950/721513229032882196/bot_ori.png?width=492&height=429', '')
        .setTitle('BEM VINDO!')
        .setDescription(`Seja bem vindo ${member.user}\nEntrou pelo link: discord.gg/${usedInvite.code} \nUsos: ${usedInvite.uses} \nConvidado por: ${inviter}`)//${usedInvite.code}${usedInvite.uses}
     
    const welcomeChannel = member.guild.channels.cache.find(channel => channel.id === '748581844684898385');
    let nomeserver = member.guild.name
    //embed para bem vindo no privado
    var embd = new Discord.MessageEmbed()
    .setColor('#b33cf0')
    .setTitle(`Seja Bem Vindo(a) ao \_\*\`${nomeserver}\`\*\_`)
    .setAuthor('Orionis-Bot', 'https://media.discordapp.net/attachments/597540436260945950/721513229032882196/bot_ori.png?width=492&height=429', '')
    .setImage('https://media.giphy.com/media/6hM6w8fVK2tcQ/giphy.gif')
    .setThumbnail('https://media.discordapp.net/attachments/597540436260945950/721513229032882196/bot_ori.png?width=492&height=429')
    member.send(embd);    

    const channel1 = bot.channels.cache.get('748581844684898385');
    if(welcomeChannel) {
        welcomeChannel.send(embed).catch(err => console.log(err));
        
        // pega o nome do serverbot
        
        console.log("novo membro no server: "+nomeserver)
        console.log("----------------------------------\n")
        
        
 
        //channel1.send(`${member} Seja Bem Vindo(a) ao ${nomeserver}`);
        
        member.roles.add('748565889900871693') //da teg quando entra no server, numero id da teg  
        console.log(member)
    }
})


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

    if(message.content === 'test'){
        //random member
    
        let usersCount = message.guild.memberCount;
        let users = Array.from(message.guild.members);
        let randomNumber = Math.floor(Math.random() * usersCount);
        let randomUser = users[randomNumber];

        console.log(randomUser);

        var user1 = message.guild//.members//.random();
        console.log(`${user1.user}`);
    }

})


//add text in notepad
/*
let y = process.openStdin()
y.addListener("data", res => {
    let x = res.toString().trim().split(/ +/g);
    bot.channels.cache.get("721755756105302037").send(x.join(' '));
    
})*/



bot.login(config.token);