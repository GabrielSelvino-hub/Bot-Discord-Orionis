const Discord = require("discord.js");

exports.run = async(bot, message, args) => {//comando em tests

    let msg = message.guild.member.cache.get(args[0])
    let img = message.slice(0).join(' ').catch();
    console.log(img);
    console.log(msg);
}

exports.help = {
    name: "Ori.img"
}