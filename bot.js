const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const chalk = require("chalk");
const moment = require("moment");
var Jimp = require("jimp");
const { Client, Util } = require("discord.js");
const weather = require("weather-js");
const fs = require("fs");
const db = require("quick.db");
const http = require("http");
const express = require("express");
require("./util/eventLoader")(client);
const path = require("path");
const request = require("request");
const { apikey } = require("./anahtarlar.json");



const YouTube = require("simple-youtube-api");
const queue = new Map();
const ffmpeg = require("ffmpeg");

const youtube = new YouTube(apikey);
const ytdl = require("ytdl-core");
const prefix = ayarlar.prefix;







        const app = express();
         
        app.get("/", (request, response) => {
          //console.log(Date.now() + " BOT Aktif.");
          //response.sendStatus(200);
        });
        app.listen(process.env.PORT);
        setInterval(() => {
          http.get(`http://${process.env.PROJECT_NAME}.glitch.me`);
        }, 1000 * 60 * 3);
         








var pprefix = ayarlar.prefix;

const log = message => {
  console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
    client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});


client.on("guildMemberAdd", async member => {
  let sayac = JSON.parse(fs.readFileSync("./otorol.json", "utf8"));
  let otorole = JSON.parse(fs.readFileSync("./otorol.json", "utf8"));
  let arole = otorole[member.guild.id].sayi;
  let giriscikis = JSON.parse(fs.readFileSync("./otorol.json", "utf8"));
  let embed = new Discord.RichEmbed()
    .setTitle("Otorol Sistemi")
    .setDescription(
      `<a:duyur:635760218525138963> <a:parti:606925584966090967>  @${member.user.tag}'a Otorol Verildi `
    )
    .setColor("GREEN")
    .setFooter("Harmony ", client.user.avatarURL);

  if (!giriscikis[member.guild.id].kanal) {
    return;
  }

  try {
    let giriscikiskanalID = giriscikis[member.guild.id].kanal;
    let giriscikiskanali = client.guilds
      .get(member.guild.id)
      .channels.get(giriscikiskanalID);
    giriscikiskanali.send(
      `<a:duyur:635760218525138963> <a:evet:620544866807578635> Hoşgeldin ``${member.user.tag}`` Rolün Başarıyla Verildi.`
    );
  } catch (e) {
    // eğer hata olursa bu hatayı öğrenmek için hatayı konsola gönderelim.
    return console.log(e);
  }
});

client.on("message", message => {
  const dmchannel = client.channels.find("name", "dm-log");
  if (message.channel.type === "dm") {
    if (message.author.bot) return;
    dmchannel.sendMessage("", {
      embed: {
        color: 3447003,
        title: `Gönderen: ${message.author.tag}`,
        description: `Bota Özelden Gönderilen DM: ${message.content}`
      }
    });
  }
});

client.on("guildMemberAdd", async member => {
  let autorole = JSON.parse(fs.readFileSync("./otorol.json", "utf8"));
  let role = autorole[member.guild.id].sayi;

  member.addRole(role);
});

//////////////////////////////////////

client.on("message", async msg => {
  let sa = await db.fetch(`saas_${msg.guild.id}`);
  if (sa == "acik") {
    if (
      msg.content.toLowerCase() == "sa" ||
      msg.content.toLowerCase() == "sea" ||
      msg.content.toLowerCase() == "selamun aleyküm"
    ) {
      try {
        return msg.reply("Aleyküm Selam İyi Eğlenceler");
      } catch (err) {
        console.log(err);
      }
    }
  } else if (sa == "acik") {
  }
  if (!sa) return;
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

client.on("guildMemberAdd", async member => {
  let ozelhosgeldin = await db.fetch(`ozelhosgeldin_${member.guild.id}`);
  if (!ozelhosgeldin) return;

  member.send(
    ozelhosgeldin
      ? ozelhosgeldin
          .replace("-sunucu-", `\`${member.guild.name}\``)
          .replace("-kullanıcı-", `\`${member.user.tag}\``)
      : ``
  );
});

client.on("guildMemberRemove", async member => {
  let ozelgorusuruz = await db.fetch(`ozelgorusuruz_${member.guild.id}`);
  if (!ozelgorusuruz) return;

  member.send(
    ozelgorusuruz
      ? ozelgorusuruz
          .replace("-sunucu-", `\`${member.guild.name}\``)
          .replace("-kullanıcı-", `\`${member.user.tag}\``)
      : ``
  );
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////
client.on("message", msg => {
  if (msg.content.toLowerCase() === "nasılsın") {
    msg.reply("**İyiyim Sen nasılsın**");
  }
});

client.on("message", msg => {
  if (msg.content.toLowerCase() === "Günaydın ") {
    msg.reply("**Sanada Günaydın iyi Sabahlar**");
  }
});

///////////////////////////////////////////////////////////////////////////////

client.on("guildMemberAdd", async member => {
  let sayac = await db.fetch(`sayac_${member.guild.id}`);
  let skanal9 = await db.fetch(`sayacK_${member.guild.id}`);
  if (!skanal9) return;
  const skanal31 = member.guild.channels.find("name", skanal9);
  if (!skanal31) return;
  skanal31.send(
   ` \`${
       member.user.tag
    }\` Adlı Kullanıcı Sunucuya Katıldı. \`${sayac}\` Kullanıcı Olmaya \`${sayac -
      member.guild.members.size}\` Kullanıcı Kaldı. ✅ `
  );
});

client.on("guildMemberRemove", async member => {
  let sayac = await db.fetch(`sayac_${member.guild.id}`);
  let skanal9 = await db.fetch(`sayacK_${member.guild.id}`);
  if (!skanal9) return;
  const skanal31 = member.guild.channels.find("name", skanal9);
  if (!skanal31) return;
  skanal31.send(
    ` \`${
      member.user.tag
    }\`Adlı Kullanıcı Sunucudan Ayrıldı. \`${sayac}\` Kullanıcı Olmaya \`${sayac -
      member.guild.members.size}\` Kullanıcı Kaldı❌`
  );
});

////////////////////////

client.on("message", async msg => {
  if (msg.channel.type === "dm") return;
  if (msg.author.bot) return;
  if (msg.content.length > 4) {
    if (db.fetch(`capslock_${msg.guild.id}`)) {
      let caps = msg.content.toUpperCase();
      if (msg.content == caps) {
        if (!msg.member.hasPermission("ADMINISTRATOR")) {
          if (!msg.mentions.users.first()) {
            msg.delete();
            return msg.channel
              .send(
                `✋ ${msg.author}, Bu sunucuda, büyük harf kullanımı engellenmekte!`
              )
              .then(m => m.delete(5000));
          }
        }
      }
    }
  }
});

////////////////////////

client.on("messageDelete", async message => {
  if (message.author.bot) return;

  var user = message.author;

  var kanal = await db.fetch(`modlogK_${message.guild.id}`);
  if (!kanal) return;
  var kanal2 = message.guild.channels.find("name", kanal);

  const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(`Bir Mesaj Silindi!`, message.author.avatarURL)
    .addField("Kullanıcı Tag", message.author.tag, true)
    .addField("ID", message.author.id, true)
    .addField("Silinen Mesaj", "```" + message.content + "```")
    .setThumbnail(message.author.avatarURL);
  kanal2.send(embed);
});

client.on("messageUpdate", async (oldMsg, newMsg) => {
  if (oldMsg.author.bot) return;

  var user = oldMsg.author;

  var kanal = await db.fetch(`modlogK_${oldMsg.guild.id}`);
  if (!kanal) return;
  var kanal2 = oldMsg.guild.channels.find("name", kanal);

  const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(`Bir Mesaj Düzenlendi!`, oldMsg.author.avatarURL)
    .addField("Kullanıcı Tag", oldMsg.author.tag, true)
    .addField("ID", oldMsg.author.id, true)
    .addField("Eski Mesaj", "```" + oldMsg.content + "```")
    .addField("Yeni Mesaj", "```" + newMsg.content + "```")
    .setThumbnail(oldMsg.author.avatarURL);
  kanal2.send(embed);
});

client.on("roleCreate", async role => {
  var kanal = await db.fetch(`modlogK_${role.guild.id}`);
  if (!kanal) return;
  var kanal2 = role.guild.channels.find("name", kanal);

  const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(`Bir Rol Oluşturuldu!`, role.guild.iconURL)
    .addField("Rol", `\`${role.name}\``, true)
    .addField("Rol Rengi Kodu", `${role.hexColor}`, true);
  kanal2.send(embed);
});

client.on("roleDelete", async role => {
  var kanal = await db.fetch(`modlogK_${role.guild.id}`);
  if (!kanal) return;
  var kanal2 = role.guild.channels.find("name", kanal);

  const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(`Bir Rol Kaldırıldı!`, role.guild.iconURL)
    .addField("Rol", `\`${role.name}\``, true)
    .addField("Rol Rengi Kodu", `${role.hexColor}`, true);
  kanal2.send(embed);
});

client.on("roleUpdate", async role => {
  if (!log[role.guild.id]) return;

  var kanal = await db.fetch(`modlogK_${role.guild.id}`);
  if (!kanal) return;
  var kanal2 = role.guild.channels.find("name", kanal);

  const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(`Bir Rol Güncellendi!`, role.guild.iconURL)
    .addField("Rol", `\`${role.name}\``, true)
    .addField("Rol Rengi Kodu", `${role.hexColor}`, true);
  kanal2.send(embed);
});

client.on("voiceStateUpdate", async (oldMember, newMember) => {
  var kanal = await db.fetch(`modlogK_${oldMember.guild.id}`);
  if (!kanal) return;
  var kanal2 = oldMember.guild.channels.find("name", kanal);

  let newUserChannel = newMember.voiceChannel;
  let oldUserChannel = oldMember.voiceChannel;

  if (oldUserChannel === undefined && newUserChannel !== undefined) {
    const embed = new Discord.RichEmbed()
      .setColor("GREEN")
      .setDescription(
        `**${newMember.user.tag}** adlı kullanıcı \`${newUserChannel.name}\` isimli sesli kanala giriş yaptı!`
      );
    kanal2.send(embed);
  } else if (newUserChannel === undefined) {
    const embed = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(
        `**${newMember.user.tag}** adlı kullanıcı bir sesli kanaldan çıkış yaptı!`
      );
    kanal2.send(embed);
  }

  client.on("channelCreate", async (channel, member) => {
    let gc = JSON.parse(fs.readFileSync("./jsonlar/gc.json", "utf8"));
    const hgK = member.guild.channels.get(gc[member.guild.id].gkanal);
    if (!hgK) return;
    if (!channel.guild) return;
    if (channel.type === "text") {
      var embed = new Discord.RichEmbed()
        .setColor(3066993)
        .setAuthor(channel.guild.name, channel.guild.iconURL)
        .setDescription(`<#${channel.id}> kanalı oluşturuldu. _(metin kanalı)_`)
        .setFooter(`ID: ${channel.id}`);
      embed.send(embed);
    }
    if (channel.type === "voice") {
      var embed = new Discord.RichEmbed()
        .setColor(3066993)
        .setAuthor(channel.guild.name, channel.guild.iconURL)
        .setDescription(`${channel.name} kanalı oluşturuldu. _(sesli kanal)_`)
        .setFooter(`ID: ${channel.id}`);
      hgK.send({ embed });
    }
  });

  client.on("channelDelete", async channel => {
    const fs = require("fs");
    let gc = JSON.parse(fs.readFileSync("./jsonlar/log.json", "utf8"));

    const hgK = channel.guild.channels.get(gc[channel.guild.id].gkanal);
    if (!hgK) return;
    if (channel.type === "text") {
      let embed = new Discord.RichEmbed()
        .setColor(3066993)
        .setAuthor(channel.guild.name, channel.guild.iconURL)
        .setDescription(`${channel.name} kanalı silindi. _(metin kanalı)_`)
        .setFooter(`ID: ${channel.id}`);
      hgK.send({ embed });
    }
    if (channel.type === "voice") {
      let embed = new Discord.RichEmbed()
        .setColor(3066993)
        .setAuthor(channel.guild.name, channel.guild.iconURL)
        .setDescription(`${channel.name} kanalı silindi. _(sesli kanal)_`)
        .setFooter(`ID: ${channel.id}`);
      hgK.send({ embed });
    }
  });
});

////////////////////////

//////////////////////////////////////////////////////////

client.on("message", message => {
  if (!message.author.bot) return;
  let g = db.fetch(`usohbet_${message.channel.id}`);

  if (!g || g === "pasif") return;
  else {
    message.delete(5000);
  }
});




/////////////////////////////////////////////////////////////////

client.on("guildMemberAdd", member => {
  if (member.guild.id == "651030381776207892") {
    console.log(
      `${member.user.username} Adlı Kullanıcı Destek Sunucumuza Katıldı`
    );
    client.channels
      .get("")
      .send(
        `<@${member.id}> Adlı Kişi Sunucumuza Katıldı Hoşgeldin :)`
      );
    return;
  }
});

client.on("guildMemberAdd", async member => {
  let autorole = JSON.parse(fs.readFileSync("./otorol.json", "utf8"));
  let role = autorole[member.guild.id].sayi;

  member.addRole(role);
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

client.on("guildMemberRemove", member => {
  if (member.guild.id == "592024867810050051") {
    console.log(
      `${member.user.username} adlı kişi destek sunucumuzdan ayrıldı, sağlık olsun.`
    );
    client.channels
      .get("594783627297030177")
      .send(
        `${member.user.username} adlı kullanıcı sunucudan ayrıldı, tam bir dram!`
      );
    return;
  }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

client.on("guildMemberAdd", async member => {
  let sayac = JSON.parse(fs.readFileSync("./otorol.json", "utf8"));
  let otorole = JSON.parse(fs.readFileSync("./otorol.json", "utf8"));
  let arole = otorole[member.guild.id].sayi;
  let giriscikis = JSON.parse(fs.readFileSync("./otorol.json", "utf8"));
  let embed = new Discord.RichEmbed()
    .setTitle("Otorol Sistemi")
    .setDescription(`:loudspeaker: @${member.user.tag}'a Otorol Verildi `)
    .setColor("GREEN")
    .setFooter("Harmony ", client.user.avatarURL);

  if (!giriscikis[member.guild.id].kanal) {
    return;
  }

  try {
    let giriscikiskanalID = giriscikis[member.guild.id].kanal;
    let giriscikiskanali = client.guilds
      .get(member.guild.id)
      .channels.get(giriscikiskanalID);
    giriscikiskanali.send(
      `:loudspeaker: Hoşgeldin **${member.user.tag}** Rolün Başarıyla Verildi.`
    );
  } catch (e) {
    // eğer hata olursa bu hatayı öğrenmek için hatayı konsola gönderelim.
    return console.log(e);
  }
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
client.on("message", async msg => {
  if (msg.channel.type === "dm") return;
  if (msg.author.bot) return;
  if (msg.content.length > 4) {
    if (db.fetch(`capslock_${msg.guild.id}`)) {
      let caps = msg.content.toUpperCase();
      if (msg.content == caps) {
        if (!msg.member.hasPermission("ADMINISTRATOR")) {
          if (!msg.mentions.users.first()) {
            msg.delete();
            return msg.channel
              .send(
                `✋ ${msg.author}, Bu sunucuda, büyük harf kullanımı engellenmekte!`
              )
              .then(m => m.delete(5000));
          }
        }
      }
    }
  }
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

client.on("guildMemberAdd", async member => {
  let tag = await db.fetch(`tag_${member.guild.id}`);
  let tagyazi;
  if (tag == null) tagyazi = member.setNickname(`${member.user.username}`);
  else tagyazi = member.setNickname(`${tag} ${member.user.username}`);
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
client
  .on("guildBanAdd", async (guild, member) => {
    const embed = new Discord.RichEmbed()
      .setTitle("Üye yasaklandı.")
      .setColor("#36393E")
      .setDescription(`<@${member.user.id}> adlı kullanıcı yasaklandı!`)
      .setThumbnail(member.user.avatarURL || member.user.defaultAvatarURL)
      .setFooter(`Yasaklanan Kullanıcı ID: ${member.user.id}`)
      .setTimestamp();
    let membermodChannel = await db.fetch(`membermodChannel_${guild.id}`);
    if (!guild.channels.get(membermodChannel))
      return console.log("membermodChannel");
    else guild.channels.get(membermodChannel).send(embed);
  })
  .on("messageUpdate", async (oldMessage, newMessage) => {
    if (oldMessage.author.bot) {
      return false;
    }
    if (!oldMessage.guild) {
      return false;
    }
    if (oldMessage.content == newMessage.content) {
      return false;
    }
    if (
      !oldMessage ||
      !oldMessage.id ||
      !oldMessage.content ||
      !oldMessage.guild
    )
      return;
    let embedds4 = new Discord.RichEmbed()
      .setColor("#0080ff")
      .setAuthor(`Mesaj Güncellendi!`)
      .setThumbnail(oldMessage.author.avatarURL)
      .addField("Gönderen", oldMessage.author.tag, true)
      .addField("Önceki Mesaj", `\`\`\`${oldMessage.content}\`\`\``, true)
      .addField("Şimdiki Mesaj", `\`\`\`${newMessage.content}\`\`\``, true)
      .addField("Kanal", newMessage.channel.name, true)
      .setFooter(`Garen Code Log Sistemi | ID: ${client.user.id}`);
    let membermodChannel = await db.fetch(
      `membermodChannel_${oldMessage.guild.id}`
    );
    if (!oldMessage.guild.channels.get(membermodChannel))
      return console.log("membermodChannel");
    else oldMessage.guild.channels.get(membermodChannel).send(embedds4);
  });

client
  .on("guildBanRemove", async (guild, member) => {
    let embedds6 = new Discord.RichEmbed()
      .setColor("#0080ff")
      .settitle(`Yasak Kaldırıldı!`)
      .setThumbnail(member.avatarURL)
      .setDescription(`'${member.tag}' adlı kişinin yasağı kaldırıldı.`, true);
    let membermodChannel = await db.fetch(`membermodChannel_${guild.id}`);
    if (!guild.channels.get(membermodChannel))
      return console.log("membermodChannel");
    else guild.channels.get(membermodChannel).send(embedds6);
  })

  .on("messageDelete", async msg => {
    var embed = new Discord.RichEmbed()
      .setAuthor(msg.author.tag, msg.author.avatarURL)
      .setColor("BLUE")
      .setDescription(
        `<@!${msg.author.id}> tarafından <#${msg.channel.id}> kanalına gönderilen \`\`\`${msg.content}\`\`\` mesajı silindi.`
      )
      .setFooter(`Garen Code Log Sistemi | ID: ${msg.id}`);
    let membermodChannel = await db.fetch(`membermodChannel_${msg.guild.id}`);
    if (!msg.guild.channels.get(membermodChannel))
      return console.log("Mesaj Silindi");
    else msg.guild.channels.get(membermodChannel).send(embed);
  })
  .on("roleDelete", async role => {
    const fs = require("fs");
    let embed = new Discord.RichEmbed()
      .setColor("BLUE")
      .setAuthor(`Rol Silindi!`)
      .setDescription(`'${role.name}' adlı rol silindi.`, true)
      .setFooter(`Garen Code Log Sistemi | ID: ${role.id}`);
    let membermodChannel = await db.fetch(`membermodChannel_${role.guild.id}`);
    if (!role.guild.channels.get(membermodChannel))
      return console.log("Mesaj Silindi");
    else role.guild.channels.get(membermodChannel).send(embed);
  })
  .on("roleCreate", async role => {
    const fs = require("fs");
    let embed = new Discord.RichEmbed()
      .setColor("BLUE")
      .setAuthor(`Rol Oluşturuldu!`)
      .setDescription(`'${role.name}' adlı rol oluşturuldu.`, true)
      .setFooter(`Garen Code Log Sistemi | ID: ${role.id}`);
    let membermodChannel = await db.fetch(`membermodChannel_${role.guild.id}`);
    if (!role.guild.channels.get(membermodChannel))
      return console.log("Mesaj Silindi");
    else role.guild.channels.get(membermodChannel).send(embed);
  })
  .on("emojiCreate", async emoji => {
    const fs = require("fs");
    let embed = new Discord.RichEmbed()
      .setColor("BLUE")
      .setAuthor(`Emoji Oluşturuldu!`)
      .setDescription(
        `<:${emoji.name}:${emoji.id}> - ${emoji.name} adlı emoji oluşturuldu!`,
        true
      )
      .setFooter(`Garen Code Log Sistemi | ID: ${emoji.id}`);
    let membermodChannel = await db.fetch(`membermodChannel_${emoji.guild.id}`);
    if (!emoji.guild.channels.get(membermodChannel))
      return console.log("Yazı Kanal Oluşturuldu");
    else emoji.guild.channels.get(membermodChannel).send(embed);
  })
  .on("emojiDelete", async emoji => {
    const fs = require("fs");
    let embed = new Discord.RichEmbed()
      .setColor("BLUE")
      .setAuthor(`Emoji Silindi!`)
      .setDescription(`':${emoji.name}:' adlı emoji silindi!`, true)
      .setFooter(`Garen Code Log Sistemi | ID: ${emoji.id}`);
    let membermodChannel = await db.fetch(`membermodChannel_${emoji.guild.id}`);
    if (!emoji.guild.channels.get(membermodChannel))
      return console.log("Yazı Kanal Oluşturuldu");
    else emoji.guild.channels.get(membermodChannel).send(embed);
  })
  .on("channelCreate", async channel => {
    if (channel.type === "text") {
      var embed = new Discord.RichEmbed()
        .setColor("BLUE")
        .setAuthor(channel.guild.name, channel.guild.iconURL)
        .setDescription(`<#${channel.id}> kanalı oluşturuldu. _(metin kanalı)_`)
        .setFooter(`Garen Code Log Sistemi | ID: ${channel.id}`);
      let membermodChannel = await db.fetch(
        `membermodChannel_${channel.guild.id}`
      );
      if (!channel.guild.channels.get(membermodChannel))
        return console.log("Yazı Kanal Oluşturuldu");
      else channel.guild.channels.get(membermodChannel).send(embed);
    }
    if (channel.type === "voice") {
      var embed = new Discord.RichEmbed()
        .setColor("BLUE")
        .setAuthor(channel.guild.name, channel.guild.iconURL)
        .setDescription(`${channel.name} kanalı oluşturuldu. _(sesli kanal)_`)
        .setFooter(`Garen Code Log Sistemi | ID: ${channel.id}`);
      let membermodChannel = await db.fetch(
        `membermodChannel_${channel.guild.id}`
      );
      if (!channel.guild.channels.get(membermodChannel))
        return console.log("Ses Kanalı Oluşturuldu");
      else channel.guild.channels.get(membermodChannel).send(embed);
    }
  })

  .on("channelDelete", async channel => {
    if (channel.type === "text") {
      let embed = new Discord.RichEmbed()
        .setColor("BLUE")
        .setAuthor(channel.guild.name, channel.guild.iconURL)
        .setDescription(`${channel.name} kanalı silindi. _(metin kanalı)_`)
        .setFooter(`Garen Code Log Sistemi | ID: ${channel.id}`);
      let membermodChannel = await db.fetch(
        `membermodChannel_${channel.guild.id}`
      );
      if (!channel.guild.channels.get(membermodChannel))
        return console.log("Yazı Kanalı Silindi");
      else channel.guild.channels.get(membermodChannel).send(embed);
    }
    if (channel.type === "voice") {
      let embed = new Discord.RichEmbed()
        .setColor("BLUE")
        .setAuthor(channel.guild.name, channel.guild.iconURL)
        .setDescription(`${channel.name} kanalı silindi. _(sesli kanal)_`)
        .setFooter(`Garen Code Log Sistemi | ID: ${channel.id}`);
      let membermodChannel = await db.fetch(
        `membermodChannel_${channel.guild.id}`
      );
      if (!channel.guild.channels.get(membermodChannel))
        return console.log("Ses Kanalı Silindi");
      else channel.guild.channels.get(membermodChannel).send(embed);
    }
  });
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

client.on("guildDelete", guild => {
  let rrrsembed = new Discord.RichEmbed()

    .setColor("RED")
    .setTitle("Botumuzu Kickledi ")
    .addField("Sunucu Adı:", guild.name)
    .addField("Sunucu sahibi", guild.owner)
    .addField("Sunucu Sahibi'nin ID'si", guild.ownerID)
    .addField("Sunucunun Kurulu Olduğu Bölge:", guild.region)
    .addField("Sunucudaki Kişi Sayısı:", guild.memberCount);

  client.channels.get("658743868401123338").send(rrrsembed);
});

client.on("guildCreate", guild => {
  let rrrsembed = new Discord.RichEmbed()

    .setColor("RED")
    .setTitle("Botumuzu Ekledi  ")
    .addField("Sunucu Adı:", guild.name)
    .addField("Sunucu sahibi", guild.owner)
    .addField("Sunucu Sahibi'nin ID'si", guild.ownerID)
    .addField("Sunucunun Kurulu Olduğu Bölge:", guild.region)
    .addField("Sunucudaki Kişi Sayısı:", guild.memberCount);

  client.channels.get("658743868401123338").send(rrrsembed);
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////


client.on('message', async message => {
  const ms = require('ms');
  const args = message.content.slice(ayarlar.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  let u = message.mentions.users.first() || message.author;
  if (command === "sunucukur") {
  if (message.guild.channels.find(channel => channel.name === "Bot Kullanımı")) return message.channel.send(" Bot Paneli Zaten Ayarlanmış.")
  if (!message.member.hasPermission('ADMINISTRATOR'))
  return message.channel.send(" Bu Kodu `Yönetici` Yetkisi Olan Kişi Kullanabilir.");
    message.channel.send(`Bot Bilgi Kanallarının kurulumu başlatılsın mı? başlatılacak ise **evet** yazınız.`)
      message.channel.awaitMessages(response => response.content === 'evet', {
        max: 1,
        time: 10000,
        errors: ['time'],
      })
    .then((collected) => {
   message.guild.createChannel('|▬▬|ÖNEMLİ KANALLAR|▬▬|', 'category', [{
  id: message.guild.id,
  deny: ['SEND_MESSAGES']
}])


      })
        
 message.guild.createChannel('「📃」kurallar', 'text', [{
  id: message.guild.id,
  deny: ['SEND_MESSAGES']
}])
.then(channel =>
 channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|ÖNEMLİ KANALLAR|▬▬|")));
 message.guild.createChannel('「🚪」gelen-giden', 'text', [{
  id: message.guild.id,
  deny: ['SEND_MESSAGES']
}])
.then(channel =>
       channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|ÖNEMLİ KANALLAR|▬▬|")));
       message.guild.createChannel('「✅」sayaç', 'text', [{
        id: message.guild.id,
        deny: ['SEND_MESSAGES']
      }])
.then(channel =>
             channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|ÖNEMLİ KANALLAR|▬▬|")));
             message.guild.createChannel('「💾」log-kanalı', 'text', [{
              id: message.guild.id,
              deny: ['SEND_MESSAGES']
            }])
            .then(channel => channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|ÖNEMLİ KANALLAR|▬▬|")));
            message.guild.createChannel('「📢」duyuru-odası', 'text', [{
              id: message.guild.id,
              deny: ['SEND_MESSAGES']
            }])
//neyi sildin ?
       .then((collected) => {
        message.guild.createChannel('|▬▬|GENEL KANALLAR|▬▬|', 'category', [{
       id: message.guild.id,
     }]);
             
      message.guild.createChannel(`「💡」şikayet-ve-öneri`, 'text')
     .then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|GENEL KANALLAR|▬▬|")));
     message.guild.createChannel(`「👥」pre-arama-odası`, 'text')
     .then(channel =>
            channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|GENEL KANALLAR|▬▬|")));
     message.guild.createChannel(`「📷」görsel-içerik`, 'text')
     .then(channel =>
                  channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|GENEL KANALLAR|▬▬|")));
     message.guild.createChannel(`「🤖」bot-komutları`, 'text')
     .then(channel =>
                  channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|GENEL KANALLAR|▬▬|")));
     message.guild.createChannel(`「💬」sohbet`, 'text')
     .then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|GENEL KANALLAR|▬▬|")));

      message.guild.createChannel(`🏆》Kurucu Odası`, "voice")
      .then(channel =>
        channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|SES KANALLARI|▬▬|")))
      .then(c => {
        let role = message.guild.roles.find("name", "@everyone");
        let role2 = message.guild.roles.find("name", "Kurucu");
        
        c.overwritePermissions(role, {
            CONNECT: false,
        });
        c.overwritePermissions(role2, {
            CONNECT: true,
            
        });
    })

    message.guild.createChannel('|▬▬|SES KANALLARI|▬▬|', 'category', [{
      id: message.guild.id,
    }]);

    message.guild.createChannel(`🏆》Yönetici Odası`, "voice")
    .then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|SES KANALLARI|▬▬|")))
    .then(c => {
      let role = message.guild.roles.find("name", "@everyone");
      let role2 = message.guild.roles.find("name", "Kurucu");
      let role3 = message.guild.roles.find("name", "Yönetici");
      c.overwritePermissions(role, {
          CONNECT: false,
      });
      c.overwritePermissions(role2, {
          CONNECT: true,
      });
      c.overwritePermissions(role3, {
          CONNECT: true,
      });
  })

  message.guild.createChannel(`💬》Sohbet Odası`, "voice")
  .then(channel =>
    channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|SES KANALLARI|▬▬|")))
  .then(c => {
    let role = message.guild.roles.find("name", "@everyone");
    c.overwritePermissions(role, {
        CONNECT: true,
    });
})

message.guild.createChannel('|▬▬|OYUN ODALARI|▬▬|', 'category', [{
  id: message.guild.id,
}]);

message.guild.createChannel(`🎮》LOL`, 'voice')
.then(channel =>
 channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|OYUN ODALARI|▬▬|")))
 message.guild.createChannel(`🎮》ZULA`, 'voice')
 .then(channel =>
  channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|OYUN ODALARI|▬▬|")))
 message.guild.createChannel(`🎮》COUNTER STRİKE`, 'voice')
.then(channel =>
 channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|OYUN ODALARI|▬▬|")))
 message.guild.createChannel(`🎮》PUBG`, 'voice')
 .then(channel =>
  channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|OYUN ODALARI|▬▬|")))
  message.guild.createChannel(`🎮》FORTNİTE`, 'voice')
  .then(channel =>
   channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|OYUN ODALARI|▬▬|")))
   message.guild.createChannel(`🎮》MİNECRAFT`, 'voice')
   .then(channel =>
    channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|OYUN ODALARI|▬▬|")))
    message.guild.createChannel(`🎮》ROBLOX`, 'voice')
    .then(channel =>
     channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|OYUN ODALARI|▬▬|")))
     message.guild.createChannel(`🎮》WOLFTEAM`, 'voice')
     .then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|OYUN ODALARI|▬▬|")))



      message.guild.createRole({
        name: 'Kurucu',
        color: 'RED',
        permissions: [
            "ADMINISTRATOR",
    ]
      })

      
      message.guild.createRole({
        name: 'Yönetici',
        color: 'BLUE',
        permissions: [
            "MANAGE_GUILD",
            "MANAGE_ROLES",
            "MUTE_MEMBERS",
            "DEAFEN_MEMBERS",
            "MANAGE_MESSAGES",
            "MANAGE_NICKNAMES",
            "KICK_MEMBERS"
    ]
      })

      message.guild.createRole({
        name: 'Moderatör',
        color: 'GREEN',
        permissions: [
            "MANAGE_GUILD",
            "MANAGE_ROLES",
            "MUTE_MEMBERS",
            "DEAFEN_MEMBERS",
            "MANAGE_MESSAGES",
            "MANAGE_NICKNAMES"
    ]
      })

      message.guild.createRole({
        name: 'V.I.P',
        color: '00ffff',
      })

      message.guild.createRole({
        name: 'Üye',
        color: 'WHITE',
      })

      message.guild.createRole({
        name: 'Bot',
        color: 'ORANGE',
      })

       message.channel.send("Gerekli Odalar Kuruldu!")
     
            })   
    
}
});


//////////////////////////////////////////////////////////////////////////////////////////////////////////////

client.on("guildBanAdd", async (guild, member) => {
  const fs = require("fs");
  let gc = JSON.parse(fs.readFileSync("./log.json", "utf8"));

  const hgK = member.guild.channels.get(gc[member.guild.id].gkanal);
  if (!hgK) return;
  const embed = new Discord.RichEmbed()
    .setTitle("Üye yasaklandı.")
    .setAuthor(member.user.tag, member.user.avatarURL)
    .setColor("RANDOM")
    .setDescription(`<@!${member.user.id}>, ${member.user.tag}`)
    .setThumbnail(member.user.avatarURL)
    .setFooter(`XiR Log Sistemi | ID: ${member.user.id}`)
    .setTimestamp();
  hgK.send({ embed });
});

client.on("guildBanRemove", async (guild, member) => {
  const fs = require("fs");
  let gc = JSON.parse(fs.readFileSync("./log.json", "utf8"));

  const hgK = member.guild.channels.get(gc[member.guild.id].gkanal);
  if (!hgK) return;
  var embed = new Discord.RichEmbed()
    .setTitle("Üyenin yasaklaması kaldırıldı.")
    .setAuthor(member.user.tag, member.user.avatarURL)
    .setColor("RANDOM")
    .setDescription(`<@!${member.user.id}>, ${member.user.tag}`)
    .setThumbnail(member.user.avatarURL)
    .setFooter(`XiR Log Sistemi | ID: ${member.user.id}`)
    .setTimestamp();
  hgK.send({ embed });
});

//////////////////////// SEVİYE ////////////////////////////////////
client.on("message", async msg => {
  const request = require("node-superfetch");
  const db = require("quick.db");

  if (msg.channel.type === "dm") return;
  if (msg.author.bot) return;

  if (msg.content.length > 7) {
    db.add(`puancik_${msg.author.id + msg.guild.id}`, 1);
  }

  if (db.fetch(`puancik_${msg.author.id + msg.guild.id}`) > 150) {
    db.add(`seviye_${msg.author.id + msg.guild.id}`, 1);

    msg.channel.send(
      `Tebrik ederim <@${msg.author.id}>! Seviye atladın ve **${db.fetch(
        `seviye_${msg.author.id + msg.guild.id}`
      )}** seviye oldun!`
    );

    db.delete(`puancik_${msg.author.id + msg.guild.id}`);
  }
});

/////////////////////////////////////////////////////////////

client.on("guildMemberAdd", async member => {
  const kanal30 = await db.fetch(`gckanal_${member.guild.id}`);
  const kanal31 = member.guild.channels.find("name", kanal30);
  const girismesaj = await db.fetch(`girism_${member.guild.id}`);
  if (!kanal31) return;
  if (!girismesaj) return;
  kanal31.send(
    girismesaj
      ? girismesaj
          .replace("-kullanıcı-", `\`${member.user.tag}\``)
          .replace("-sunucu-", `${member.guild.name}`)
      : `<a:parti:606925584966090967> \`${member.user.tag}\` adlı kullanıcı sunucuya katıldı.`
  );
});

////////////////////////////////////////////////////////////

client.on("guildMemberRemove", async member => {
  const kanal30 = await db.fetch(`gckanal_${member.guild.id}`);
  const kanal31 = member.guild.channels.find("name", kanal30);
  const cikismesaj = await db.fetch(`cikism_${member.guild.id}`);
  if (!kanal31) return;
  if (!cikismesaj) return;
  kanal31.send(
    cikismesaj
      ? cikismesaj
          .replace("-kullanıcı-", `\`${member.user.tag}\``)
          .replace("-sunucu-", `${member.guild.name}`)
      : `<a:parti:606925584966090967> \`${member.user.tag}\` adlı kullanıcı sunucudan ayrıldı.`
  );
});

/////////////////////////////////////////////////////////////

client.on("guildMemberAdd", async member => {
  let ozelhosgeldin = await db.fetch(`ozelhosgeldin_${member.guild.id}`);
  if (!ozelhosgeldin) return;
  member.send(
    ozelhosgeldin
      ? ozelhosgeldin
          .replace("-sunucu-", `\`${member.guild.name}\``)
          .replace("-kullanıcı-", `\`${member.user.tag}\``)
      : ``
  );
});

/////////////////////////////////////////////////////////////

client.on("guildMemberRemove", async member => {
  let ozelgorusuruz = await db.fetch(`ozelgorusuruz_${member.guild.id}`);
  if (!ozelgorusuruz) return;
  member.send(
    ozelgorusuruz
      ? ozelgorusuruz
          .replace("-sunucu-", `\`${member.guild.name}\``)
          .replace("-kullanıcı-", `\`${member.user.tag}\``)
      : ``
  );
});

/////////////////////////////////////////////////////////////

client.on("guildMemberAdd", async member => {
  let rol = await db.fetch(`otorol_${member.guild.id}`);
  let rol2 = member.guild.roles.find("name", rol);

  const rolk = await db.fetch(`rolK_${member.guild.id}`);
  if (!rolk) return;
  const rolk2 = member.guild.channels.find("name", rolk);
  const otorolmesaj = await db.fetch(`otorolm_${member.guild.id}`);

  member.addRole(rol2);
  rolk2.send(
    otorolmesaj
      ? otorolmesaj
          .replace("{kullanıcı}", `${member.user}`)
          .replace("{rol}", `${rol2.name}`)
      : ` \`${member.user.tag}\` Adlı Kullanıcıya \`${rol2.name}\` Adlı Rol Verildi. ✅ `
  );
});

client.on("guildMemberAdd", async member => {
  let prefix = await db.fetch(`prefix_${member.guild.id}`);
  if (prefix == null) prefix = "m!";
  let mkanal = await db.fetch(`mgcK_${member.guild.id}`);
  if (!mkanal) return;
  const mkanal2 = member.guild.channels.find("name", mkanal);
  const gmesaj = await db.fetch(`girism_${member.guild.id}`);
  mkanal2.send(
    gmesaj
      ? gmesaj
          .replace("{kullanıcı}", `${member.user}`)
          .replace("{sunucu}", `${member.guild.name}`)
      : `\`${member.user.tag}\` Adlı Kullanıcı \`${member.guild.name}\` Adlı Sunucuya Katıldı. (\`${prefix}giriş-mesaj\` komutu ile değiştirilebilir.)`
  );
});

client.on("guildMemberRemove", async member => {
  let prefix = await db.fetch(`prefix_${member.guild.id}`);
  if (prefix == null) prefix = "m!";
  let mkanal = await db.fetch(`mgcK_${member.guild.id}`);
  if (!mkanal) return;
  const mkanal2 = member.guild.channels.find("name", mkanal);
  const cmesaj = await db.fetch(`cikism_${member.guild.id}`);
  mkanal2.send(
    cmesaj
      ? cmesaj
          .replace("{kullanıcı}", `${member.user.tag}`)
          .replace("{sunucu}", `${member.guild.name}`)
      : `\`${member.user.tag}\` Adlı Kullanıcı \`${member.guild.name}\`Adlı Sunucudan Ayrıldı. (\`${prefix}çıkış-mesaj\` komutu ile değiştirilebilir.)`
  );
});

/////////////////////////////////////////////////////////////

client.on("message", async message => {
  if (message.content === "fakecık") {
    client.emit(
      "guildMemberRemove",
      message.member || (await message.guild.fetchMember(message.author))
    );
  }
});
////////////

client.on("message", async message => {
  if (message.content === "fake") {
    client.emit(
      "guildMemberAdd",
      message.member || (await message.guild.fetchMember(message.author))
    );
  }
});

client.on("message", async msg => {
  let reklam = await db.fetch(`reklam_${msg.guild.id}`);
  if (reklam == "acik") {
    const reklam = [
      ".net",
      ".xyz",
      ".tk",
      ".pw",
      ".io",
      ".me",
      ".gg",
      "www.",
      "https",
      "http",
      ".gl",
      ".org",
      ".com.tr",
      ".biz",
      "net",
      ".rf.gd",
      ".az",
      ".party",
      "discord.gg",
      "discordapp",
      "discord.app"
    ];
    if (reklam.some(word => msg.content.includes(word))) {
      try {
        if (!msg.member.hasPermission("BAN_MEMBERS")) {
          msg.delete();
          msg.channel
            .send(
            
              `Bu sunucuda reklamlar **${client.user.username}** tarafından engellenmektedir! Reklam yapmana izin vermeyeceğim!`
            )
            .then(msg => msg.delete(5000));
        }
      } catch (err) {
        console.log(err);
      }
    }
  } else if (reklam == "kapali") {
  }
  if (!reklam) return;
});


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

client.on("message", async msg => {
  let kufur = await db.fetch(`_${msg.guild.id}`);
  if (kufur == "acik") {
    const kufur = [
      "oç",
      "amk",
      "ananı sikiyim",
      "ananıskm",
      "piç",
      "amk",
      "amsk",
      "sikim",
      "sikiyim",
      "orospu çocuğu",
      "piç kurusu",
      "kahpe",
      "orospu",
      "şerefsiz",
      "sik",
      "yarrak",
      "am",
      "amcık",
      "amık",
      "yarram",
      "sikimi ye",
      "mk",
      "mq",
      "aq",
      "ak",
      "amq"
    ];
    if (kufur.some(word => msg.content.includes(word))) {
      try {
        if (!msg.member.hasPermission("BAN_MEMBERS")) {
          msg.delete();

          msg.channel
            .send(
              `Bu sunucuda küfürler **${client.user.username}** tarafından engellenmektedir! Küfür etmene izin vermeyeceğim!`
            )
            .then(msg => msg.delete(5000));
        }
      } catch (err) {
        console.log(err);
      }
    }
  } else if (kufur == "acik") {
  }
  if (!kufur) return;
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

client.on("guildCreate", guild => {
  const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setTitle("Bir Sunucuya Katıldım;")
    .setDescription(
      `Bot, 》${guild.name}《 Adlı Sunucuya Katıldı. Sunucu Üye Sayısı: [${guild.memberCount} Üye]!`
    )
    .setFooter(`${client.user.username}`, client.user.avatarURL)
    .setTimestamp();
  client.channels.get("Sunucu id").send(embed);
});

client.on("guildDelete", guild => {
  const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setTitle("Bir Sunucudan Ayrıldım;")
    .setDescription(
      `Bot, 》${guild.name}《 Adlı Sunucudan Atıldı. Sunucu Üye Sayısı: [${guild.memberCount} Üye]!`
    )
    .setFooter(`${client.user.username}`, client.user.avatarURL)
    .setTimestamp();
  client.channels.get("Sunucu id").send(embed);
});

client.on("guildBanAdd", async (guild, member) => {
  const kayitk = await db.fetch(`kayitlar_${member.guild.id}`);
  const kayitk2 = member.guild.channels.find("name", kayitk);
  if (!kayitk2) return;
  const embed = new Discord.RichEmbed()
    .setTitle("Üye yasaklandı.")
    .setAuthor(member.user.tag, member.user.avatarURL)
    .setColor("15158332")
    .setDescription(`<@!${member.user.id}>, ${member.user.tag}`)
    .setThumbnail(member.user.avatarURL)
    .setFooter(`ID: ${member.user.id}`)
    .setTimestamp();
  kayitk2.send({ embed });
});

client.on("guildBanRemove", async (guild, member) => {
  const kayitk = await db.fetch(`kayitlar_${member.guild.id}`);
  const kayitk2 = member.guild.channels.find("name", kayitk);
  if (!kayitk2) return;
  var embed = new Discord.RichEmbed()
    .setTitle("Üyenin yasaklaması kaldırıldı.")
    .setAuthor(member.user.tag, member.user.avatarURL)
    .setColor(3447003)
    .setDescription(`<@!${member.user.id}>, ${member.user.tag}`)
    .setThumbnail(member.user.avatarURL)
    .setFooter(`ID: ${member.user.id}`)
    .setTimestamp();
  kayitk2.send({ embed });
});

client.on("messageDelete", async message => {
  const kayitk = await db.fetch(`kayitlar_${message.guild.id}`);
  const kayitk2 = message.guild.channels.find("name", kayitk);
  if (!kayitk2) return;
  var embed = new Discord.RichEmbed()
    .setAuthor(message.author.tag, message.author.avatarURL)
    .setColor(15158332)
    .setDescription(
      `<@!${message.author.id}> tarafından <#${message.channel.id}> kanalına gönderilen mesajı silindi.`
    )
    .addField("Silinen Mesaj", `\`\`\`${message.content}\`\`\``)
    .setFooter(`ID: ${message.id}`);
  kayitk2.send({ embed });
});


client.on("channelCreate", async channel => {
  const kayitk = await db.fetch(`kayitlar_${channel.guild.id}`);
  const kayitk2 = channel.guild.channels.find("name", kayitk);
  if (!kayitk2) return;
  if (channel.type === "text") {
    var embed = new Discord.RichEmbed()
      .setColor(3066993)
      .setAuthor(channel.guild.name, channel.guild.iconURL)
      .setDescription(
        `<#${channel.id}> Adında Bir **Metin** Kanalı Oluşturuldu!`
      )
      .setFooter(`Kanal ID: ${channel.id}`);
    kayitk2.send({ embed });
  }
  if (channel.type === "voice") {
    var embed = new Discord.RichEmbed()
      .setColor(3066993)
      .setAuthor(channel.guild.name, channel.guild.iconURL)
      .setDescription(`${channel.name} Adında Bir **Sesli** Kanal Oluşturuldu!`)
      .setFooter(`Kanal ID: ${channel.id}`);
    kayitk2.send({ embed });
  }
});

client.on("channelDelete", async channel => {
  const kayitk = await db.fetch(`kayitlar_${channel.guild.id}`);
  const kayitk2 = channel.guild.channels.find("name", kayitk);
  if (!kayitk2) return;
  if (channel.type === "text") {
    let embed = new Discord.RichEmbed()
      .setColor(3066993)
      .setAuthor(channel.guild.name, channel.guild.iconURL)
      .setDescription(`${channel.name} Adında Bir **Metin** Kanalı Silindi!`)
      .setFooter(`Kanal ID: ${channel.id}`);
    kayitk2.send({ embed });
  }
  if (channel.type === "voice") {
    let embed = new Discord.RichEmbed()
      .setColor(3066993)
      .setAuthor(channel.guild.name, channel.guild.iconURL)
      .setDescription(`${channel.name} Adında Bir **Sesli** Kanal Silindi!`)
      .setFooter(`Kanal ID: ${channel.id}`);
    kayitk2.send({ embed });
  }
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

client.on("guildMemberAdd", async member => {
  const fs = require("fs");
  let gkanal = JSON.parse(fs.readFileSync("./ayarlar/glog.json", "utf8"));
  const gözelkanal = member.guild.channels.get(gkanal[member.guild.id].resim);
  if (!gözelkanal) return;
  let username = member.user.username;
  if (gözelkanal === undefined || gözelkanal === null) return;
  if (gözelkanal.type === "text") {
    const bg = await Jimp.read(
      "https://cdn.discordapp.com/attachments/577242119261913090/594920692303265822/hosgeldin.png"
    );
    const userimg = await Jimp.read(member.user.avatarURL);
    var font;
    if (member.user.tag.length < 10)
      font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
    else if (member.user.tag.length > 0)
      font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
    else font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
    await bg.print(font, 300, 300, member.user.tag);
    await userimg.resize(187, 169); ////boyut
    await bg.composite(userimg, 317, 15).write("./img/" + member.id + ".png"); ///sağa sola, yukarı aşşa
    setTimeout(function() {
      gözelkanal.send(new Discord.Attachment("./img/" + member.id + ".png"));
    }, 1000);
    setTimeout(function() {
      fs.unlink("./img/" + member.id + ".png");
    }, 10000);
  }
});

/////////////bb-kanal
client.on("guildMemberRemove", async member => {
  const fs = require("fs");
  let gkanal = JSON.parse(fs.readFileSync("./ayarlar/glog.json", "utf8"));
  const gözelkanal = member.guild.channels.get(gkanal[member.guild.id].resim);
  if (!gözelkanal) return;
  let username = member.user.username;
  if (gözelkanal === undefined || gözelkanal === null) return;
  if (gözelkanal.type === "text") {
    const bg = await Jimp.read(
      "https://cdn.discordapp.com/attachments/594583488787644447/595138392216436746/gorusuruz.png"
    );
    const userimg = await Jimp.read(member.user.avatarURL);
    var font;
    if (member.user.tag.length < 10)
      font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
    else if (member.user.tag.length > 0)
      font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
    else font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
    await bg.print(font, 300, 300, member.user.tag);
    await userimg.resize(189, 173); ////boyut
    await bg.composite(userimg, 317, 15).write("./img/" + member.id + ".png"); ///sağa sola, yukarı aşşa
    setTimeout(function() {
      gözelkanal.send(new Discord.Attachment("./img/" + member.id + ".png"));
    }, 1000);
    setTimeout(function() {
      fs.unlink("./img/" + member.id + ".png");
    }, 10000);
  }
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var resimler = {
  cikis:
    "https://cdn.discordapp.com/attachments/606141048728846336/606141265360322561/New_Project_1_2_1.png",
  giris:
    "https://cdn.discordapp.com/attachments/606141048728846336/606141260243140628/New_Project_1_1.png",
  cikismanzara:
    "https://cdn.discordapp.com/attachments/606141048728846336/606742859177132032/Background_2.png",
  girismanzara:
    "https://cdn.discordapp.com/attachments/606141048728846336/606742856811413504/Background_1.png"
};

client.on("guildMemberAdd", async member => {
  var fetch = db.get(`sunucular.${member.guild.id}.giriscikis.kanal`);
  if (!fetch) return;
  var kanal = client.channels.get(fetch);
  if (!kanal) return;
  var tur = db.get(`sunucular.${member.guild.id}.giriscikis.tur`);
  if (!tur) return;

  if (tur === "klasik") {
    var avatarr = member.user.displayAvatarURL;
    var { createCanvas, loadImage } = require("canvas");
    var canvas = createCanvas(1238, 395);
    var ctx = canvas.getContext("2d");
    loadImage(resimler.giris).then(giris => {
      loadImage(avatarr).then(avatar => {
        ctx.drawImage(giris, 0, 0, 1238, 395);
        ctx.drawImage(avatar, 0, 0, 364, 395);

        ctx.beginPath();
        ctx.fillStyle = `#ffffff`;
        ctx.font = "50px Impact";
        ctx.textAlign = "left";
        ctx.fillText(`${member.user.tag}`, 400, 250);

        kanal.send(
          new Discord.Attachment(canvas.toBuffer(), "MaximusBoys-giris.png")
        );
      });
    });
  } else if (tur === "manzara") {
    var avatarr = member.user.displayAvatarURL;
    var { createCanvas, loadImage } = require("canvas");
    var canvas = createCanvas(960, 635);
    var ctx = canvas.getContext("2d");
    loadImage(resimler.girismanzara).then(giris => {
      loadImage(avatarr).then(avatar => {
        ctx.drawImage(giris, 0, 0, 960, 635);
        ctx.drawImage(avatar, 55, 90, 200, 200);

        var b = [];
        member.user.username.split("").forEach(a => b.push(a));
        var isim;
        if (b.length > 20)
          isim =
            member.user.tag.substring(0, 17) + "#" + member.user.discriminator;
        else isim = member.user.tag;

        ctx.beginPath();
        ctx.fillStyle = `#ffffff`;
        ctx.font = "30px Impact";
        ctx.textAlign = "left";
        ctx.fillText(`${isim}`, 350, 180);

        kanal.send(
          new Discord.Attachment(canvas.toBuffer(), "MaximusBoys-giris.png")
        );
      });
    });
  }
});
client.on("guildMemberAdd", async member => {
  let user = client.users.get(member.id);
  let kanal = client.channels.get(db.fetch(`guvenlik${member.guild.id}`));
  const Canvas = require("canvas");
  const canvas = Canvas.createCanvas(360, 100);
  const ctx = canvas.getContext("2d");

  const resim1 = await Canvas.loadImage(
    "https://cdn.discordapp.com/attachments/597433546868654106/627428441695977497/gvnlk-spheli.png"
  );
  const resim2 = await Canvas.loadImage(
    "https://cdn.discordapp.com/attachments/597433546868654106/627427731407241226/gvnlk-gvnli.png"
  );
  const kurulus = new Date().getTime() - user.createdAt.getTime();
  const gün = moment(kurulus).format("dddd");
  var kontrol;
  if (kurulus > 2629800000) kontrol = resim2;
  if (kurulus < 2629800000) kontrol = resim1;

  const background = await Canvas.loadImage(
    "https://cdn.discordapp.com/attachments/597433546868654106/627425996454232064/gvnlk-arka.png"
  );
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  const avatar = await Canvas.loadImage(member.user.displayAvatarURL);
  ctx.drawImage(kontrol, 0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.lineWidth = 4;
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.arc(180, 46, 36, 0, 2 * Math.PI);
  ctx.clip();
  ctx.drawImage(avatar, 143, 10, 73, 72);

  const attachment = new Discord.Attachment(canvas.toBuffer(), "güvenlik.png");
  kanal.send(attachment);
});
//////////////////////////


client.on("guildMemberAdd", async member => {
  let channel = client.channels.get("654324391282475009");
  channel.setName("Son Üyemiz: " + member.user.username);
});

////////////////////////////////////////////////////////////////////////////

client.on("message", message => {
    if (message.channel.type === "dm") {
        if (message.author.bot) return;
        const dmlog = new Discord.RichEmbed()
         .setTitle(`${client.user.username}'a Özelden Mesaj Gönderildi!`)
         .setColor('RANDOM')
         .addField('Mesajı Gönderen',` \`\`\` ${message.author.tag} \`\`\` `)
         .addField('Mesajı Gönderenin ID', ` \`\`\`${message.author.id}\`\`\` `)
         .addField(`Gönderilen Mesaj`, message.content)
         .setThumbnail(message.author.avatarURL) 
    client.channels.get("654963445111717910").send(dmlog);
    }
});

const invites = {};

const wait = require('util').promisify(setTimeout);

client.on('ready', () => {

  wait(1000);

  client.guilds.forEach(g => {
    g.fetchInvites().then(guildInvites => {
      invites[g.id] = guildInvites;
    });
  });
});

client.on('guildMemberAdd', member => {
  
  
 
  member.guild.fetchInvites().then(guildInvites => {
    
    if (db.has(`dKanal_${member.guild.id}`) === false) return
    const channel = db.fetch(`dKanal_${member.guild.id}`).replace("<#", "").replace(">", "")
    
    const ei = invites[member.guild.id];
  
    invites[member.guild.id] = guildInvites;
 
    const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);

    const davetçi = client.users.get(invite.inviter.id);
     db.add(`davet_${invite.inviter.id + member.guild.id}`,1)
let bal  = db.fetch(`davet_${invite.inviter.id + member.guild.id}`)
   member.guild.channels.get(channel).send(`:inbox_tray: ** <@${member.id}> Joined**; İnvited by **${davetçi.tag}** (`+'**'+bal+'** invites)')
  })

});
client.on('guildMemberRemove', member => {
   
  member.guild.fetchInvites().then(guildInvites => {
    
    if (db.has(`dKanal_${member.guild.id}`) === false) return
    const channel = db.fetch(`dKanal_${member.guild.id}`).replace("<#", "").replace(">", "")
    
    const ei = invites[member.guild.id];
  
    invites[member.guild.id] = guildInvites;
 
    const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);

    const davetçi = client.users.get(invite.inviter.id);
 
    
   
   const embed = new Discord.RichEmbed()
   
        .setColor("#01CFFE")
        .setDescription(`<@` + `${davetçi.tag}` + `> tarafından davet edilen. ${member.user.tag} sunucudan ayrıldı!`)
   member.guild.channels.get(channel).send(embed)
    
    member.guild.fetchInvites().then(guildInvites => {
    invites[member.guild.id] = guildInvites;
        db.subtract(`davet_${invite.inviter.id + member.guild.id}`,1)
    })
})
})
client.on("ready", async () => {
  client.appInfo = await client.fetchApplication();
  setInterval(async () => {
    client.appInfo = await client.fetchApplication();
  },10000);

 

  console.log(
    `${chalk.green(client.user.username)}${chalk.red(",")} ${chalk.blue(
      client.guilds.size
    )} ${chalk.yellow("Sunucu'ya")} ${chalk.red("ve")} ${chalk.blue(
      client.users.size.toLocaleString()
    )} ${chalk.yellow("Kullanıcı'ya")} ${chalk.red("hizmet veriyor!")}`
  );
  client.user.setStatus("online");
  client.user.setActivity(``, { type: "PLAYING" });
  let embed = new Discord.RichEmbed()
    .setTitle("**Avalon Bot***")
    .setDescription(
      `**Bot aktif!** \n Botu açılış itibariyle şuan; **${
        client.guilds.size
      }** sunucu\n**${client.guilds
        .reduce((a, b) => a + b.memberCount, 0)
        .toLocaleString() + ``}** kullanıcı kullanıyor!`
    )
    .setTimestamp()
    .setThumbnail(client.user.avatarURL)
    .setColor("40bcdb")
    .setFooter(`${client.user.username} `, client.user.avatarURL);
  
})


//////////////////////////////////////////////Bot DM Görme/////////////////////////////////////////////////////////
client.on("message", message => {
    if (message.channel.type === "dm") {
        if (message.author.bot) return;
        const dmlog = new Discord.RichEmbed()
         .setTitle(`${client.user.username}'a Özelden Mesaj Gönderildi!`)
         .setColor('RANDOM')
         .addField('Mesajı Gönderen',` \`\`\` ${message.author.tag} \`\`\` `)
         .addField('Mesajı Gönderenin ID', ` \`\`\`${message.author.id}\`\`\` `)
         .addField(`Gönderilen Mesaj`, message.content)
         .setThumbnail(message.author.avatarURL) 
    client.channels.get("654963445111717910").send(dmlog);
    }
});

////////////////////kanal Koruma///////////////////////////////
client.on("channelDelete", async function(channel) {
  
  let logs = await channel.guild.fetchAuditLogs({type: 'CHANNEL_DELETE'});
  let cfxz = await db.fetch(`kanalkoruma${channel.guild.id}`)
  let cfxk = await db.fetch(`kanaluyari${channel.guild.member(logs.entries.first().executor).id}`)
  let cfxrol = await db.fetch(`cfxrol${channel.guild.id}`)
  let cfxrol2 = await db.fetch(`cfxrol2${channel.guild.id}`)
  let cfxg = await db.fetch(`klog${channel.guild.id}`)
  let cfxh = channel.guild.channels.find('id', cfxg)
  let cfxl = channel.member;
  if (cfxz == 'Kapalı') return;
  if (cfxz == 'Açık') {
    

    
      db.add(`kanaluyari${channel.guild.member(logs.entries.first().executor).id}`, 1)
    
      if (cfxk === null) {
        let cfxu = new Discord.RichEmbed()
                  .setTitle(`**Avalon | Avalon Kanal Koruma Sistemi**`)
        .setColor("#00ff88")
        .setFooter(`**Avalon Bot Systems** | Avalon`)
        .setDescription(`<@${channel.guild.member(logs.entries.first().executor).id}> Kanal Koruma Sistemi Devrede **Sildiği Kanal:** \`${channel.name}\` **Uyarı (1/3)**`)
      cfxh.send(cfxu)
        
      }
    if (cfxk === 1) {
    let cfxu = new Discord.RichEmbed()
                .setTitle(`**Avalon | Avalon Kanal Koruma Sistemi**`)
        .setColor("#00ff88")
        .setFooter(``)
        .setDescription(`<@${channel.guild.member(logs.entries.first().executor).id}> Kanal Koruma Sistemi Devrede. **Sildiği Kanal:** \`${channel.name}\` **Uyarı (2/3)**`)
     cfxh.send(cfxu)
      
    }
    if (cfxk === 2) {

      
    let logs = await channel.guild.fetchAuditLogs({type: 'CHANNEL_DELETE'});
     
    if(logs.entries.first().executor.bot) return;
    if (logs.entries.first().executor.id === "497674151251804160") return;
          if (logs.entries.first().executor.id === "522138336056573972") return;
      
      
    channel.guild.member(logs.entries.first().executor).roles.filter(role => role.name !== "@everyone").array().forEach(role => {
    channel.guild.member(logs.entries.first().executor).removeRole(channel.guild.roles.get(cfxrol))
    channel.guild.member(logs.entries.first().executor).removeRole(channel.guild.roles.get(cfxrol2))
      
    })
  
      db.delete(`kanaluyari${channel.guild.member(logs.entries.first().executor).id}`)
      
    const silen = channel.guild.member(logs.entries.first().executor).user  
    const cfxj = new Discord.RichEmbed()
          .setTitle(`**Avalon Kanal Koruma Sistemi**`)
          .setColor("#00ff88")
          .setDescription(`\`${channel.name}\` Adlı Kanal Silindi. Silen: \`${silen.tag}\`, Yetkileri Alındı! **Uyarı(3/3)**`)
          .setFooter(`Avalon Bot Systems | Avalon`)

    cfxh.send(cfxj)
      
    }
       
    }   
  
});

client.on("channelDelete", async function(channel) {
if(channel.guild.id !== "654957022680317971") return;
    let logs = await channel.guild.fetchAuditLogs({type: 'CHANNEL_DELETE'});
    if(logs.entries.first().executor.bot) return;
    channel.guild.member(logs.entries.first().executor).roles.filter(role => role.name !== "@everyone").array().forEach(role => {
              channel.guild.member(logs.entries.first().executor).removeRole(channel.guild.roles.get("654961973104214036"))
              channel.guild.member(logs.entries.first().executor).removeRole(channel.guild.roles.get("655019027256705033"))
    })
const sChannel = channel.guild.channels.find(c=> c.id ==="658743868401123338")
const cıks = new Discord.RichEmbed()
.setColor('RANDOM')
.setDescription(`${channel.name} adlı Kanal silindi Silen kişinin yetkilerini  çekiyom moruk çıkssss :tiks:`)
.setFooter('Developed By Nihat Dural ')
sChannel.send(cıks)
  
channel.guild.owner.send(` **${channel.name}** adlı Kanal silindi Silen  kişinin yetkilerini aldım:tiks:`)
}) 




////////////////sumucu ismi sayaç////////////////////////////
client.on('guildMemberAdd', async member => {
let A = await db.fetch(`Avalon | Code #2020  ${member.guild.id}`);
if (A === "kapali") return;
if (A === "acik") {
member.guild.setName(`Avalon | Code #2020  ${member.guild.memberCount}`)
}; 
});


client.on('guildMemberRemove', async member => {
let A = await db.fetch(`MB | Code #2020 ${member.guild.id}`);
if (A === "kapali") return;
if (A == "acik") {
member.guild.setName(`Avalon | Code #2020 ${member.guild.memberCount}`)
};
});


/////////////////Sunucu Panel////////////////////
client.on('guildMemberAdd',async member => {
 const guild = member.guild
     
      const kanalcık =  db.fetch(`botPanel_${member.guild.id}`)
    if (kanalcık) {
      const kanal = guild.channels.find('id', kanalcık)
      if (!kanal) return db.delete(`botPanel_${guild.id}`)
      kanal.setName(`Sunucudaki üye sayısı : ${guild.memberCount}`)
    }
})

client.on('guildMemberRemove',async member => {
 const guild = member.guild
    
 
      const kanalcık =  db.fetch(`botPanel_${member.guild.id}`)
    if (kanalcık) {
      const kanal = guild.channels.find('id', kanalcık)
      if (!kanal) return db.delete(`botPanel_${guild.id}`)
      kanal.setName(`Sunucudaki üye sayısı : ${guild.memberCount}`)
    }
})



/////////////////////////////////////////////////////////////
client.on('message', async message => {
  const ms = require('ms');
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  let u = message.mentions.users.first() || message.author;
  if (command === "serverpaneltemizle") {
 if (!message.guild.channels.find(channel => channel.name === "Server Panel")) return message.channel.send("**Server Panel Ayarlanmamış!**")
   if (!message.member.hasPermission('ADMINISTRATOR'))
  return message.channel.send(" Yetkin bulunmuyor.");
    const a = message.guild.channels.find(channel => channel.name === "Server Panel").delete()
      if(!a) return console.log("guildStats")
      const b = message.guild.channels.find(channel => channel.name === `Toplam Üye • ${message.guild.members.filter( member => member.user.bot).size} bot / ${message.guild.memberCount} üye`, true)
      if(!b) return console.log("guildStatsMember")
      const c = message.guild.channels.find(channel => channel.name === `Rekor Online •${client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}`).delete()
      if(!c) return console.log("guildStatsBot")
     const m = message.guild.channels.find(channel => channel.name === `Bot Sayısı • ${client.guilds.reduce((a, b) => a + b.onlinememberCount, 0).toLocaleString()}`).delete()
      if(!m) return console.log("guildStatsOnlineBot")
      const d = message.guild.channels.find(channel => channel.name === `Toplam Kanal: ${client.channels.size.toLocaleString()}`).delete() //|| message.guild.channels.find(channel => channel.name === `Kanal sayısı: ${message.guild.channels.size-1}`).delete() || message.guild.channels.find(channel => channel.name === `Kanal sayısı: ${message.guild.channels.size-1}`).delete() || message.guild.channels.find(channel => channel.name === `Kanal sayısı: ${message.guild.channels.size-2}`).delete()
      if(!d) return console.log("guildStatsChannel")
      message.channel.send("**Kanallar Temizlendi!**")
    }
  if (command === "serverpanel") {
  if (message.guild.channels.find(channel => channel.name === "Server Panel")) return message.channel.send(" Bot Paneli Zaten Ayarlanmış.")
  message.channel.send(`**Server Panel Odalarının Kurulumunun Başlamasını İstiyorsanız 'başlat Yazınız!'**`)
      if (!message.member.hasPermission('ADMINISTRATOR'))
  return message.channel.send(" Yetkin bulunmuyor.");
      message.channel.awaitMessages(response => response.content === 'başlat', {
        max: 1,
        time: 10000,
        errors: ['time'],
      })
    .then((collected) => {
   message.guild.createChannel('Server Panel', 'category', [{
  id: message.guild.id,
  deny: ['SPEAK'],
  deny: ['CONNECT']  
}]);
        
 message.guild.createChannel(`Toplam Üye • ${message.guild.memberCount}`, 'voice')
.then(channel =>
       channel.setParent(message.guild.channels.find(channel => channel.name === "Server Panel")));
message.guild.createChannel(`Botlar •  ${message.guild.members.filter(m => m.user.bot).size}`, 'voice')
.then(channel =>
             channel.setParent(message.guild.channels.find(channel => channel.name === "Server Panel")));
message.guild.createChannel(`Rekor Online • Bakımda!`, 'voice')
.then(channel =>
 channel.setParent(message.guild.channels.find(channel => channel.name === "Server Panel")));
  message.channel.send("Bot Bilgi Paneli Ayarlandı!")
 
        })    
    
}
});
/////////////////////////
client.on("guildMemberAdd", async(member) => {
  let sunucupaneli = await db.fetch(`sunucupanel_${member.guild.id}`)
  if(sunucupaneli) {
    let rekoronline = await db.fetch(`panelrekor_${member.guild.id}`)
    let toplamuye = member.guild.channels.find(x =>(x.name).startsWith("Toplam Üye •"))
    let toplamaktif = member.guild.channels.find(x =>(x.name).startsWith("Aktif Üye •"))
    let botlar = member.guild.channels.find(x =>(x.name).startsWith("Botlar •"))
    let rekoraktif = member.guild.channels.find(x =>(x.name).startsWith("Rekor Aktiflik •"))
    
    if(member.guild.members.filter(off => off.presence.status !== 'offline').size > rekoronline) {
      db.set(`panelrekor_${member.guild.id}`, member.guild.members.filter(off => off.presence.status !== 'offline').size)
    }
    try{
      toplamuye.setName(`Toplam Üye • ${member.guild.members.size}`)
      toplamaktif.setName(`Aktif Üye • ${member.guild.members.filter(off => off.presence.status !== 'offline').size}`)
      botlar.setName(`Botlar • ${member.guild.members.filter(m => m.user.bot).size}`)
      rekoraktif.setName(`Rekor Aktiflik • ${rekoronline}`)
   } catch(e) { }
  }
})
client.on("guildMemberRemove", async(member) => {
  let sunucupaneli = await db.fetch(`sunucupanel_${member.guild.id}`)
  if(sunucupaneli) {
    let rekoronline = await db.fetch(`panelrekor_${member.guild.id}`)
    let toplamuye = member.guild.channels.find(x =>(x.name).startsWith("Toplam Üye •"))
    let toplamaktif = member.guild.channels.find(x =>(x.name).startsWith("Aktif Üye •"))
    let botlar = member.guild.channels.find(x =>(x.name).startsWith("Botlar •"))
    let rekoraktif = member.guild.channels.
    find(x =>(x.name).startsWith("Rekor Aktiflik •"))
    
    if(member.guild.members.filter(off => off.presence.status !== 'offline').size > rekoronline) {
      db.set(`panelrekor_${member.guild.id}`, member.guild.members.filter(off => off.presence.status !== 'offline').size)
    }
    try{
      toplamuye.setName(`Toplam Üye • ${member.guild.members.size}`)
      toplamaktif.setName(`Aktif Üye • ${member.guild.members.filter(off => off.presence.status !== 'offline').size}`)
      botlar.setName(`Botlar • ${member.guild.members.filter(m => m.user.bot).size}`)
      rekoraktif.setName(`Rekor Aktiflik • ${rekoronline}`)
   } catch(e) { }
  }
})



/////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////

client.on("guildMemberAdd", async member => {
   const fs = require('fs');
    let gkanal = JSON.parse(fs.readFileSync("./ayarlar/glog.json", "utf8"));
    const gözelkanal = member.guild.channels.get(gkanal[member.guild.id].resim)
    if (!gözelkanal) return;
     let username = member.user.username;
        if (gözelkanal === undefined || gözelkanal === null) return;
        if (gözelkanal.type === "text") {
            const bg = await Jimp.read("https://cdn.discordapp.com/attachments/450693709076365323/473184528148725780/guildAdd.png");
            const userimg = await Jimp.read(member.user.avatarURL);
            var font;
            if (member.user.tag.length < 15) font = await Jimp.loadFont(Jimp.FONT_SANS_128_WHITE);
            else if (member.user.tag.length > 15) font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
            else font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
            await bg.print(font, 430, 170, member.user.tag);
            await userimg.resize(362, 362);
            await bg.composite(userimg, 43, 26).write("./img/"+ member.id + ".png");
              setTimeout(function () {
                    gözelkanal.send(new Discord.Attachment("./img/" + member.id + ".png"));
              }, 1000);
              setTimeout(function () {
                fs.unlink("./img/" + member.id + ".png");
              }, 10000);
        }
    })

client.on("guildMemberRemove", async member => {
   const fs = require('fs');
    let gkanal = JSON.parse(fs.readFileSync("./ayarlar/glog.json", "utf8"));
    const gözelkanal = member.guild.channels.get(gkanal[member.guild.id].resim)
    if (!gözelkanal) return;
        let username = member.user.username;
        if (gözelkanal === undefined || gözelkanal === null) return;
        if (gözelkanal.type === "text") {            
                        const bg = await Jimp.read("https://cdn.discordapp.com/attachments/450693709076365323/473184546477572107/guildRemove.png");
            const userimg = await Jimp.read(member.user.avatarURL);
            var font;
            if (member.user.tag.length < 15) font = await Jimp.loadFont(Jimp.FONT_SANS_128_WHITE);
            else if (member.user.tag.length > 15) font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
            else font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
            await bg.print(font, 430, 170, member.user.tag);
            await userimg.resize(362, 362);
            await bg.composite(userimg, 43, 26).write("./img/"+ member.id + ".png");
              setTimeout(function () {
               gözelkanal.send(new Discord.Attachment("./img/" + member.id + ".png"));
              }, 1000);
              setTimeout(function () {
                fs.unlink("./img/" + member.id + ".png");
              }, 10000);
        }
    })



const activities_list = [
    "Avalon Bot // a!yardım", // Sadece Tırnak Yani " İşareti İçinde Yazmakta Olan Mesajları Değiştirin.
    "🔥 Avalon - Bot 🔥", // Sadece Tırnak Yani " İşareti İçinde Yazmakta Olan Mesajları Değiştirin.
    "🔥 Avalon - Bot 🔥 ", // Sadece Tırnak Yani " İşareti İçinde Yazmakta Olan Mesajları Değiştirin.
    "Avalon Bot // a!yardım :)", // Sadece Tırnak Yani " İşareti İçinde Yazmakta Olan Mesajları Değiştirin.
    "Avalon Bot // a!yardım", // Sadece Tırnak Yani " İşareti İçinde Yazmakta Olan Mesajları Değiştirin.
    ]; 

client.on('ready', () => {
    setInterval(() => {
        const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); // Bu Kısımları Ellemeyin
        client.user.setActivity(activities_list[index]); // Bu Kısımları Ellemeyin.
    }, 3000); // Selam 1 Saniye = 1000 MiliSaniye Yapar - Kısacası Böyle Bırakırsan - 3 Saniyede 1 Değişir. 
});





client.on("message", async (msg) => {
  let ever = msg.guild.roles.find(c => c.name === "@everyone")
	let sistem = await db.fetch(`panell_${msg.guild.id}`);
	if(sistem == "açık") {
		let kategori = msg.guild.channels.find(c => c.name.startsWith(msg.guild.name));
		if(!kategori) {
			msg.guild.createChannel(`${msg.guild.name} | Sunucu Paneli`, {
				type: 'category',
				permissionOverwrites: [{
					id: msg.guild.id,
					deny: ['CONNECT']
				}]
			}).then(parent => {
        setTimeout(async function() {
          let eo = msg.guild.roles.find(r => r.name == "@everyone")
          parent.overwritePermissions(eo, {
            CONNECT: false
          })
          setTimeout(async function() {
            parent.setPosition(0);
          })
          db.set(`panelParentID_${msg.guild.id}`, parent.id);
          let toplamUye = msg.guild.channels.find(c => c.name.startsWith('Toplam Üye •'));
          if(!toplamUye) {
            try {
              let s = msg.guild.memberCount;
              msg.guild.createChannel(`Toplam Üye • ${s}`, {
                type: 'voice'
              }).then(ch => {
                setTimeout(function() {
                  ch.overwritePermissions(ever, {
                    CONNECT: false
                  })
                  db.set(`toplamID_${msg.guild.id}`, ch.id)
                  ch.setParent(parent);
                  ch.setPosition(1);
                }, 120)
              })
            } catch (err) {

            }
          }
        let uyesayısı = msg.guild.channels.find(c => c.name.startsWith('Üye Sayısı •'));
        if(!uyesayısı) {
          try {
            let uyesayı = msg.guild.members.filter(m => !m.user.bot).size;
            msg.guild.createChannel(`Üye Sayısı • ${uyesayı}`, {
              type: 'voice'
            }).then(ch => {
              let ever = msg.guild.roles.find(role => role.name === "@everyone")
                setTimeout(function() {
                ch.overwritePermissions(ever, {
                  CONNECT: false
                })
                ch.setParent(parent);
                ch.setPosition(2);
                db.set(`uyeSayıID_${msg.guild.id}`, ch.id);
              }, 120)
            })
          } catch (err) {

          }
          let botsayı = msg.guild.members.filter(m => m.user.bot).size;
          try {
            msg.guild.createChannel(`Bot Sayısı • ${botsayı}`, {
              type: 'voice'
            }).then(ch => {
              let ever = msg.guild.roles.find(role => role.name === "@everyone")
              setTimeout(function() {
                ch.overwritePermissions(ever, {
                  CONNECT: false
                })
                ch.setParent(parent);
                ch.setPosition(3);
                db.set(`botSayıID_${msg.guild.id}`, ch.id);
              }, 120)
            })
          } catch (err) {

          }
          let onl = msg.guild.members.filter(m => m.presence.status != "offline" && !m.user.bot).size;
          try {
            msg.guild.createChannel(`Çevrimiçi Üye • ${onl}`, {
              type: 'voice'
            }).then(ch => {
              let ever = msg.guild.roles.find(role => role.name === "@everyone");
              setTimeout(function() {
                ch.setParent(parent);
                ch.setPosition(4);
                db.set(`onlSayıID_${msg.guild.id}`, ch.id);
                ch.overwritePermissions(ever, {
                  CONNECT: false
                })
              }, 120)
          })
        } catch (err) {
          
        }
      }
        }, 50)
			})
		} else {
      let parent = msg.guild.channels.find(c => c.name == `${msg.guild.name} | Sunucu Paneli`)
      if(msg.content.includes('panel kapat')) return false;
      let toplamuye = msg.guild.channels.find(c => c.name.startsWith(`Toplam Üye •`));
      toplamuye.setParent(parent);
      toplamuye.setName(`Toplam Üye • ${msg.guild.memberCount}`);
      let uyesayı = msg.guild.channels.find(c => c.name.startsWith(`Üye Sayısı •`));
      uyesayı.setParent(parent);
      uyesayı.setName(`Üye Sayısı • ${msg.guild.members.filter(m => !m.user.bot).size}`);
      let botuye = msg.guild.channels.find(c => c.name.startsWith(`Bot Sayısı •`));
      botuye.setParent(parent);
      botuye.setName(`Bot Sayısı • ${msg.guild.members.filter(m => m.user.bot).size}`);
      let onl = msg.guild.channels.find(c => c.name.startsWith('Çevrimiçi Üye •'));
      onl.setParent(parent);
      onl.setName(`Çevrimiçi Üye • ${msg.guild.members.filter(m => m.presence.status != "offline" && !m.user.bot).size}`);
		}
	} else {

	}
})  


////////////////////////////////////////////////////////////////////////////////////////////////////////////


   client.on("message", async message =>{
const request = require('node-superfetch');     
let gold = await db.fetch(`gold_${message.member.id}`)
let dakdest = await db.fetch(`goldsure_${message.member.id}`);
let timeout = 120000 //1000 = 1 saniye
const ms = require('parse-ms')
  if(gold == 'acik'){
        if (dakdest !== null && timeout - (Date.now() - dakdest) > 0) {
        let time = ms(timeout - (Date.now() - dakdest));
    } else {
      if(message.member.bot) return;   
  if (message.content.length > 1){ 
    db.set(`goldsure_${message.author.id}`, Date.now());
         const embed = new Discord.RichEmbed()
         .setColor('BLACK')
         .setTitle('Gold Üye!')
         .setDescription('<a:krst:627824669201793024> **Bir gold üye belirdi!**')

         message.channel.send(embed)
    }
    };

       
     
     }
     else if (gold == undefined) {           
          }
          if (!gold) return;
});


/////////////////////////////////////

client.on("message", async  msg => {
 var i = await db.fetch(`reklam_${msg.guild.id}`)
    if (i == 'acik') {
       const reklam = [".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl",".ga","cf", ".org", ".com.tr", ".biz", "net", ".rf.gd", ".az", ".party"];
        if (reklam.some(word => msg.content.includes(word))) {
          try {
            if (!msg.member.hasPermission("ADMINISTRATOR")) {
                  msg.delete();
                    return msg.reply('no reklam').then(msg => msg.delete(3000));
    

  msg.delete(3000);                              

            }              
          } catch(err) {
            console.log(err);
          }
        }
    }
    else if (i == 'kapali') {
      
    }
    if (!i) return;
  })
  ;

client.on("message", async msg => {
  
  
  ////////////////////////////////////
  
 const i = await db.fetch(`kufur_${msg.guild.id}`)
    if (i == "acik") {
        const kufur = ["oç", "amk", "ananı sikiyim", "ananıskm", "piç", "amk", "amsk", "sikim", "sikiyim", "orospu çocuğu", "piç kurusu", "kahpe", "orospu", "mal", "sik", "yarrak", "am", "amcık", "amık", "yarram", "sikimi ye", "mk", "mq", "aq", "ak", "amq",];
        if (kufur.some(word => msg.content.includes(word))) {
          try {
            if (!msg.member.hasPermission("BAN_MEMBERS")) {
                  msg.delete();
                          
                      return msg.reply('Bu Sunucuda AvalonBot | Küfür Sistemi Aktiftir.')
            }              
          } catch(err) {
            console.log(err);
          }
        }
    }
    if (!i) return;
});

client.on("messageUpdate", (oldMessage, newMessage) => {
  
  
 const i = db.fetch(`${oldMessage.guild.id}.kufur`)
    if (i) {
        const kufur = ["oç", "amk", "ananı sikiyim", "ananıskm", "piç", "amk", "amsk", "sikim", "sikiyim", "orospu çocuğu", "piç kurusu", "kahpe", "orospu", "mal", "sik", "yarrak", "am", "amcık", "amık", "yarram", "sikimi ye", "mk", "mq", "aq", "ak", "amq","salak","mal","gerizekalı","gerzek","pislik",,];
        if (kufur.some(word => newMessage.content.includes(word))) {
          try {
            if (!oldMessage.member.hasPermission("BAN_MEMBERS")) {
                  oldMessage.delete();
                          
                      return oldMessage.reply('Bu Sunucuda Küfür Filtresi Aktiftir.')
            }              
          } catch(err) {
            console.log(err);
          }
        }
    }
    if (!i) return;
});



client.on("message" , async message => {
  const msg = message;
  if(message.content.startsWith(ayarlar.prefix+"afk")) return; 
  /*db.set(`afkSebep_${message.author.id}_${message.guild.id}`, "Sebep Girilmemiş")
  db.set(`afkKisi_${message.author.id}_${message.guild.id}`, message.author.id)              Bunlar Afk Komutndaki İsimler /// tmm bakalım
  db.set(`afkAd_${message.author.id}_${message.guild.id}`, message.author.username)*/
  
  /*      const embed = new Discord.RichEmbed()
      .setColor("#0080FF")
      .setAuthor("WoxeBot" , "https://cdn.discordapp.com/avatars/605781334438445057/495a33da25bc54f9c9dd1f5883da7409.png?size=2048")
      .setDescription(`Etiketlediğiniz Kişi Afk \n Sebep : ${sebep}`)
      .setTimestamp()
      .setFooter(`${message.author.username} Tarafından İstendi`)
       message.channel.send(embed)
       */
  
  let afk = message.mentions.users.first()
  
  const kisi = db.fetch(`afkid_${message.author.id}_${message.guild.id}`)
  
  const isim = db.fetch(`afkAd_${message.author.id}_${message.guild.id}`)
 if(afk){
   const sebep = db.fetch(`afkSebep_${afk.id}_${message.guild.id}`)
   const kisi3 = db.fetch(`afkid_${afk.id}_${message.guild.id}`)
   if(message.content.includes(kisi3)){
     const embed = new Discord.RichEmbed()
      .setColor("#0080FF")
      .setAuthor("CodAre" , "avatar")
      .setDescription(`Etiketlediğiniz Kişi Afk \n Sebep : ${sebep}`)
      .setTimestamp()
      .setFooter(`${message.author.username} Tarafından İstendi`)
       message.channel.send(embed)
   }
 }
  if(message.author.id === kisi){
    const embed = new Discord.RichEmbed()
      .setColor("#0080FF")
      .setAuthor("Game Over" , "Avatar")
      .setDescription(`Afk'lıktan Çıktınız`)
      .setTimestamp()
      .setFooter(`${message.author.username} Tarafından İstendi`)
       message.channel.send(embed)
   db.delete(`afkSebep_${message.author.id}_${message.guild.id}`)
   db.delete(`afkid_${message.author.id}_${message.guild.id}`)
   db.delete(`afkAd_${message.author.id}_${message.guild.id}`)
    message.member.setNickname(isim)
    
  }
  
})

///////////////////Müzik\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

client.on("message", async msg => {
  if (msg.author.bot) return false;
  if (!msg.content.startsWith(prefix)) return false;

  const args = msg.content.split(" ");
  const searchString = args.slice(1).join(" ");
  const url = args[1] ? args[1].replace(/<(.+)>/g, "$1") : "";
  const serverQueue = queue.get(msg.guild.id);
  let command = msg.content.split(" ")[0].slice(ayarlar.prefix.length);
  //command = command.slice(prefix.length)

  if (command === "çal" || command === "p" || command === "play") {
    const voiceChannel = msg.member.voiceChannel;
    if (!voiceChannel)
      return msg.channel.send(
        new Discord.RichEmbed()
          .setColor("#FF0000")
          .setDescription(
            ":warning: | İlk olarak sesli bir kanala giriş yapmanız gerek."
          )
      );
    const permissions = voiceChannel.permissionsFor(msg.client.user);
    if (!permissions.has("CONNECT")) {
      return msg.channel.send(
        new Discord.RichEmbed()
          .setColor("#FF0000")
          .setTitle(
            ":warning: | İlk olarak sesli bir kanala giriş yapmanız gerek."
          )
      );
    }
    if (!permissions.has("SPEAK")) {
      return msg.channel.send(
        new Discord.RichEmbed()
          .setColor("#FF0000")
          .setTitle(
            ":warning: | Şarkı başlatılamıyor. Lütfen mikrofonumu açınız."
          )
      );
    }

    if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
      const playlist = await youtube.getPlaylist(url);
      const videos = await playlist.getVideos();
      for (const video of Object.values(videos)) {
        const video2 = await youtube.getVideoByID(video.id);
        await handleVideo(video2, msg, voiceChannel, true);
      }
      return msg.channel
        .send(new Discord.RichEmbed())
        .setTitle(
          `**✅ | Oynatma Listesi: **${playlist.title}** Kuyruğa Eklendi!**`
        );
    } else {
      try {
        var video = await youtube.getVideo(url);
      } catch (error) {
        try {
          var videos = await youtube.searchVideos(searchString, 10);
          let index = 0;

          msg.channel.send(
            new Discord.RichEmbed()
              .setTitle("Avalon Müzik | Şarkı Seçimi")
              .setDescription(
                `${videos
                  .map(video2 => `**${++index} -** ${video2.title}`)
                  .join("\n")}`
              )
              .setFooter(
                "Lütfen 1-10 arasında bir rakam seçiniz 10 saniye içinde liste iptal edilecektir."
              )
              .setColor("#FF0000")
          );
          msg.delete(5000);
          try {
            var response = await msg.channel.awaitMessages(
              msg2 => msg2.content > 0 && msg2.content < 11,
              {
                maxMatches: 1,
                time: 10000,
                errors: ["time"]
              }
            );
          } catch (err) {
            console.error(err);
            return msg.channel.send(
              new Discord.RichEmbed()
                .setColor("#FF0000")
                .setDescription(
                  ":warning: | **Şarkı Değeri Belirtmediğiniz İçin Seçim İptal Edilmiştir**."
                )
            );
          }
          const videoIndex = parseInt(response.first().content);
          var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
        } catch (err) {
          console.error(err);
          return msg.channel.send(
            new Discord.RichEmbed()
              .setColor("#FF0000")
              .setDescription(":( | **Aradım Fakat Hiç Bir Sonuç Çıkmadı**")
          );
        }
      }
      return handleVideo(video, msg, voiceChannel);
    }
  } else if (command === "geç" || command === "s" || command === "skip") {
    if (!msg.member.voiceChannel)
      if (!msg.member.voiceChannel)
        return msg.channel.send(
          new Discord.RichEmbed()
            .setColor("#FF0000")
            .setDescription(
              " :warning: | **Lütfen öncelikle sesli bir kanala katılınız**."
            )
        );
    if (!serverQueue)
      return msg.channel.send(
        new Discord.RichEmbed()
          .setColor("#FF0000")
          .setTitle(" :warning: | **Hiç Bir Müzik Çalmamakta**")
      );
    serverQueue.connection.dispatcher.end("**Müziği Geçtim!**");
    return undefined;
  } else if (command === "durdur" || command === "stop") {
    if (!msg.member.voiceChannel)
      if (!msg.member.voiceChannel)
        return msg.channel.send(
          new Discord.RichEmbed()
            .setColor("#FF0000")
            .setDescription(
              "**:warning: | Lütfen öncelikle sesli bir kanala katılınız.**"
            )
        );
    if (!serverQueue)
      return msg.channel.send(
        new Discord.RichEmbed()
          .setColor("#FF0000")
          .setTitle(":warning: **| Hiç Bir Müzik Çalmamakta**")
      );
    msg.channel.send(
      `:stop_button: **${serverQueue.songs[0].title}** Adlı Müzik Durduruldu`
    );
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end("**Müzik Bitti**");
    return undefined;
  } else if (command === "ses" || command === "volume") {
    if (!msg.member.voiceChannel)
      if (!msg.member.voiceChannel)
        return msg.channel.send(
          new Discord.RichEmbed()
            .setColor("#FF0000")
            .setDescription(
              ":warning: **| Lütfen öncelikle sesli bir kanala katılınız.**"
            )
        );
    if (!serverQueue)
      return msg.channel.send(
        new Discord.RichEmbed()
          .setColor("#FF0000")
          .setTitle(":warning:| **Hiç Bir Müzik Çalmamakta**")
      );
    if (!args[1])
      return msg.channel.send(
        new Discord.RichEmbed()
          .setTitle(`:warning: Şuanki Ses Seviyesi: **${serverQueue.volume}**`)
          .setColor("#FF0000")
      );
    serverQueue.volume = args[1];
    if (args[1] > 100) {
      msg.channel.send("100'den büyük bir ses seviyesi ayarlanamaz!");
    } else {
      serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
      return msg.channel.send(
        new Discord.RichEmbed()
          .setTitle(`:hammer:  Ses Seviyesi Ayarlanıyor: **${args[1]}**`)
          .setColor("#FF0000")
      );
    }
  } else if (
    command === "çalan" ||
    command === "song" ||
    command === "current" ||
    command === "şarkı"
  ) {
    if (!serverQueue)
      return msg.channel.send(
        new Discord.RichEmbed()
          .setTitle(":warning: | **Çalan Müzik Bulunmamakta**")
          .setColor("#FF0000")
      );
    return msg.channel.send(
      new Discord.RichEmbed()
        .setColor("#FF0000")
        .setTitle("  Music | Çalan")
        .addField(
          "Başlık",
          `[${serverQueue.songs[0].title}](${serverQueue.songs[0].url})`,
          true
        )
        .addField(
          "Süre",
          `${serverQueue.songs[0].durationm}:${serverQueue.songs[0].durations}`,
          true
        )
    );
  } else if (command === "sıra" || command === "liste" || command === "queue") {
    let index = 0;
    if (!serverQueue)
      return msg.channel.send(
        new Discord.RichEmbed()
          .setTitle(":warning: | **Sırada Müzik Bulunmamakta**")
          .setColor("#FF0000")
      );
    return msg.channel
      .send(
        new Discord.RichEmbed()
          .setColor("#FF0000")
          .setTitle("Avalon Müzik | Şarkı Kuyruğu")
          .setDescription(
            `${serverQueue.songs
              .map(song => `**${++index} -** ${song.title}`)
              .join("\n")}`
          )
      )
      .addField("Şu anda çalınan: " + `${serverQueue.songs[0].title}`);
  } else if (command === "duraklat" || command === "pause") {
    if (serverQueue && serverQueue.playing) {
      serverQueue.playing = false;
      serverQueue.connection.dispatcher.pause();
      return msg.channel.send(
        new Discord.RichEmbed()
          .setTitle("**:pause_button: Müzik Senin İçin Durduruldu!**")
          .setColor("#FF0000")
      );
    }
    return msg.channel.send(":warning: | **Çalan Müzik Bulunmamakta**");
  } else if (
    command === "devam" ||
    command === "devam-et" ||
    command === "devamet" ||
    command === "resume"
  ) {
    if (serverQueue && !serverQueue.playing) {
      serverQueue.playing = true;
      serverQueue.connection.dispatcher.resume();
      return msg.channel.send(
        new Discord.RichEmbed()
          .setTitle("**:arrow_forward: Müzik Senin İçin Devam Etmekte!**")
          .setColor("#FF0000")
      );
    }
    return msg.channel.send(
      new Discord.RichEmbed()
        .setTitle(":warning: ** | Çalan Müzik Bulunmamakta.**")
        .setColor("#FF0000")
    );
  }
  return undefined;
});

async function handleVideo(video, msg, voiceChannel, playlist = false) {
  const serverQueue = queue.get(msg.guild.id);
  console.log(video);
  const song = {
    id: video.id,
    title: video.title,
    url: `https://www.youtube.com/watch?v=${video.id}`,
    durationh: video.duration.hours,
    durationm: video.duration.minutes,
    durations: video.duration.seconds,
    views: video.views
  };
  if (!serverQueue) {
    const queueConstruct = {
      textChannel: msg.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 5,
      playing: true
    };
    queue.set(msg.guild.id, queueConstruct);

    queueConstruct.songs.push(song);

    try {
      var connection = await voiceChannel.join();
      queueConstruct.connection = connection;
      play(msg.guild, queueConstruct.songs[0]);
    } catch (error) {
      console.error(
        `:warning: **Şarkı Sisteminde Problem Var Hata Nedeni: ${error}**`
      );
      queue.delete(msg.guild.id);
      return msg.channel.send(
        new Discord.RichEmbed()
          .setTitle(
            `:warning: **Şarkı Sisteminde Problem Var Hata Nedeni: ${error}**`
          )
          .setColor("#FF0000")
      );
    }
  } else {
    serverQueue.songs.push(song);
    console.log(serverQueue.songs);
    if (playlist) return undefined;
    return msg.channel.send(
      new Discord.RichEmbed()
        .setTitle(
          `:arrow_heading_up:  **${song.title}** Adlı Müzik Kuyruğa Eklendi!`
        )
        .setColor("#FF0000")
    );
  }
  return undefined;
}

function play(guild, song) {
  const serverQueue = queue.get(guild.id);

  if (!song) {
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return;
  }
  console.log(serverQueue.songs);

  const dispatcher = serverQueue.connection
    .playStream(ytdl(song.url))
    .on("end", reason => {
      if (reason === " :x:  | **Yayın Akış Hızı Yeterli Değil.**")
        console.log("Müzik Bitti.");
      else console.log(reason);
      serverQueue.songs.shift();
      play(guild, serverQueue.songs[0]);
    })
  
    .on("error", error => console.error(error));
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

  serverQueue.textChannel.send(
    new Discord.RichEmbed()
      .setTitle(
        "** Avalon Müzik | 🎙 Müzik Başladı**",
        `https://cdn.discordapp.com/avatars/473974675194511361/6bb90de9efe9fb80081b185266bb94a6.png?size=2048`
      )
      .setThumbnail(
        `https://i.ytimg.com/vi/${song.id}/default.jpg?width=80&height=60`
      )
      .addField("\nBaşlık", `[${song.title}](${song.url})`, true)
      .addField("\nSes Seviyesi", `${serverQueue.volume}%`, true)
      .addField("Süre", `${song.durationm}:${song.durations}`, true)
      .setColor("#FF0000"))
}//en son hangi komutu ekledin hiçbi ey express.js ekledim sadece uptime robot çalısmadı diye forumlardan gördüm

  
// o komut nerde şuan hangi satır dosya komt değil onu yaptıktan sonra oldu böle

  
  client.login(ayarlar.token);
