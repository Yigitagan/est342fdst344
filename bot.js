const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client({ disableEveryone: true });
client.commands = new Discord.Collection();
const bot = new Discord.Client();
const prefix = "!";
const moment = require("moment");
const db = require("quick.db");
const Jimp = require("jimp");
require("moment-duration-format");
const chalk = require("chalk");
const YouTube = require("simple-youtube-api");
const queue = new Map();
const ytdl = require("ytdl-core");
let owner = "401797698799271948"; // sizin id'niz
const express = require('express');
const app = express();
const http = require('http');
    app.get("/", (request, response) => {
    console.log(`Aktiflk benim için bir tutku, yeni bir pinge merhaba!`);
    response.sendStatus(200);
    });
    app.listen(process.env.PORT);
    setInterval(() => {
    http.get(`http://proje-adı.glitch.me/`);
    }, 280000); 
const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};
client.on("ready", () => {
  console.log(`BOT: ${client.user.username} adı ile giriş yaptı!`);

  client.user.setStatus("online");
  client.user.setGame("!pdavet| !özel-komut-yardım " + client.guilds.size +" Sunucu " +client.users.size +" Kullanıcı ","https://www.twitch.tv/lasttcaptain"
  );
});
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yükleniyor!`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
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

client.on("message", async message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;

  let prefix = "!"; //botun ön eki
  let owner = "401797698799271948"; // sizin id'niz
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandfile = client.commands.get(cmd.slice(prefix.length));
  if (commandfile) commandfile.run(client, message, args);
});
client.on("message", async msg => {
  if (msg.content.toLowerCase() === "sa") {
    msg.channel.sendMessage(
      "Aleyküm Selam **" +
        msg.author.username +
        "** Hoşgeldin! <a:selam:647108296058208257>"
    );
    await msg.react("🇦");
    msg.react("🇸");
  }
});
client.on("message", async msg => {
  if (msg.content.toLowerCase() === "selam") {
    msg.channel.sendMessage(
      "Aleyküm Selam **" +
        msg.author.username +
        "** Hoşgeldin! <a:selam:647108296058208257>"
    );
    await msg.react("🇦");
    msg.react("🇸");
  }
});
client.on("message", async msg => {
  if (msg.content.toLowerCase() === "hb") {
    msg.channel.sendMessage("Nasılsın ? **" + msg.author.username + "**");
  }
});

client.on("message", async msg => {
  if (msg.content.toLowerCase() === "ping") {
    msg.reply("Pingin" + client.ping + "ms");
  }
});
client.on("message", async msg => {
  if (msg.content.toLowerCase() === prefix + "desteksunucum") {
    msg.channel.sendMessage("**Destek Sunucum:** https://discord.gg/AfaDXvj");
  }
});
client.on("message", async msg => {
  if (msg.content.toLowerCase() === "selamın aleyküm") {
    msg.channel.sendMessage(
      "Aleyküm Selam **" +
        msg.author.username +
        "** Hoşgeldin! <a:selam:647108296058208257>"
    );
    await msg.react("🇦");
    msg.react("🇸");
  }
});
client.on("message", async msg => {
  if (msg.content.toLowerCase() === "selamun aleyküm") {
    msg.channel.sendMessage(
      "Aleyküm Selam **" +
        msg.author.username +
        "** Hoşgeldin! <a:selam:647108296058208257>"
    );
    await msg.react("🇦");
    msg.react("🇸");
  }
});

client.on("message", message => {
  if (message.content.toLowerCase() === prefix + "avatarım") {
    message.channel.sendEmbed(
      new Discord.RichEmbed()
        .setDescription(`Avatarınız:`)
        .setImage(`${message.author.avatarURL} `)
        .setColor("RANDOM")
    );
  }
});

client.on("message", msg => {
  if (msg.content.toLowerCase() === prefix + "pdavet") {
    if (msg.channel.type !== "dm") {
      const ozelmesajkontrol = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setTimestamp()
        .setAuthor(msg.author.username, msg.author.avatarURL)
        .addField(
          msg.author.username,
          "Davet Linkimi Attım İyi Eğlenceler. :postbox:"
        );
      msg.channel.sendEmbed(ozelmesajkontrol);
    }
    msg.author
      .sendMessage(
        "Link: https://discordapp.com/oauth2/authorize?client_id=510432180774764555&scope=bot&permissions=805829694"
      )
      .then(message =>
        console.log(
          `[${moment().format("YYYY-MM-DD HH:mm:ss")}] Gönderilen mesaj: ${
            message.content
          }`
        )
      )
      .catch(console.error);
  }
});

client.on("guildMemberRemove", member => {
  const channel = member.guild.channels.find("name", "gelen-giden"); // 'gelen-giden' log ismidir. değiştirebilirsiniz. belirttiğiniz isme giriş çıkış gösterecektir.
  if (!channel) return;
  const embed = new Discord.RichEmbed()
    .setColor("0xff1a1a")
    .setAuthor(client.user.username, client.user.avatarURL)
    .setThumbnail(member.user.avatarURL)
    .setTitle(`:outbox_tray: ${member.user.username} Sunucudan ayrıldı.`)
    .setTimestamp();
  channel.sendEmbed(embed);
});
client.on("message", async msg => {
  if (msg.content.toLowerCase() === prefix + "kayıt-yardım") {
    msg.channel.sendMessage(
      "``!kayıt-rol-ayarla`` Yazarak Kayıt Olduktan Sonra Verilecek Rolü Ayarlayabilirsiniz"
    );
    msg.channel.sendMessage(
      "``!kayıt-kanal-ayarla`` Yazarak Oyuncuların Kayıt İşlemini Hangi Kanala Uygulayacağını Belirtebilirsiniz"
    );
    msg.channel.sendMessage(
      "``!kayıt-bildirim-ayarla`` Yazarak Kayıt Bildimini Açabilir kayıt-bildirim-ayarla sıfırla Yazarakta Kapatabilirsiniz"
    );
    msg.channel.sendMessage("``!kayıt`` Yazarak Kayıt Olabilirsiniz!");
  }
});
client.on("message", async msg => {
  if (msg.content.toLowerCase() === prefix + "özel-komut-yardım") {
    msg.channel.sendMessage("``!komut-ekle`` Yazarak Komut Ekleyebilirsiniz");
    msg.channel.sendMessage(
      "``!komut-liste`` Yazarak Oluşturduğunuz Komutların Listesini Görebilirsiniz"
    );
    msg.channel.sendMessage(
      "``!komut-sil`` Yazarak Oluşturduğunuz Komutu Silebilirsiniz"
    );
  }
});
let sayac = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));
client.on("message", async message => {
  if (sayac[message.guild.id]) {
    if (sayac[message.guild.id].sayi <= message.guild.members.size) {
      const embed = new Discord.RichEmbed()
        .setDescription(
          `Tebrikler, başarılı bir şekilde ${sayac[message.guild.id].sayi} kullanıcıya ulaştık!`
        )
        .setColor("0x808080")
        .setTimestamp();
      message.channel.send({ embed });
      delete sayac[message.guild.id].sayi;
      delete sayac[message.guild.id];
      fs.writeFile(".ayarlar/sayac.json", JSON.stringify(sayac), err => {
        console.log(err);
      });
    }
  }
});
client.on("guildMemberRemove", async member => {
  let sayac = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));
  let giriscikis = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));
  let embed = new Discord.RichEmbed()
    .setTitle("")
    .setDescription(``)
    .setColor("RED")
    .setFooter("", client.user.avatarURL);

  if (!giriscikis[member.guild.id].kanal) {
    return;
  }

  try {
    let giriscikiskanalID = giriscikis[member.guild.id].kanal;
    let giriscikiskanali = client.guilds
      .get(member.guild.id)
      .channels.get(giriscikiskanalID);
    giriscikiskanali.send(`:loudspeaker: :outbox_tray: \`${member.user.tag}\` Kullanıcısı Sunucudan Ayrıldı. \`${sayac[member.guild.id].sayi}\` Kişi Olmamıza \`${sayac[member.guild.id].sayi -member.guild.memberCount}\` Kişi Kaldı \`${member.guild.memberCount }\` Kişiyiz!`);
  } catch (e) {
    // eğer hata olursa bu hatayı öğrenmek için hatayı konsola gönderelim.
    return console.log(e);
  }
});

client.on("guildMemberAdd", async member => {
  let sayac = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));
  let giriscikis = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));
  let embed = new Discord.RichEmbed()
    .setTitle("")
    .setDescription(``)
    .setColor("GREEN")
    .setFooter("", client.user.avatarURL);
  if (!giriscikis[member.guild.id].kanal) {
    return;
  }
  try {
    let giriscikiskanalID = giriscikis[member.guild.id].kanal;
    let giriscikiskanali = client.guilds.get(member.guild.id).channels.get(giriscikiskanalID);giriscikiskanali.send(`:loudspeaker: :inbox_tray: \`${member.user.tag}\` Kullanıcısı Sunucuya Katıldı! \`${sayac[member.guild.id].sayi}\` Kişi Olmamıza \`${sayac[member.guild.id].sayi -member.guild.memberCount}\` Kişi Kaldı \`${member.guild.memberCount}\` Kişiyiz!`
    );
  } catch (e) {
    // eğer hata olursa bu hatayı öğrenmek için hatayı konsola gönderelim.
    return console.log(e);
  }
});


client.on("message", msg => {
  const uyarıembed = new Discord.RichEmbed()
    .setColor(0x00ae86)
    .setDescription(
      ":rage:" +
        msg.author +
        " GRAVİTY reklam koruması aktif, reklam yapmayı bırak evlat! :rage:"
    );

  const dmembed = new Discord.RichEmbed()
    .setTitle("Sunucunda " + msg.author.tag + " reklam yapıyor!")
    .setColor(0x00ae86)
    .addField("Kullanıcının mesajı:", "**" + msg.content + "**");

  if (
    msg.content
      .toLowerCase()
      .match(/(discord\.gg\/)|(discordapp\.com\/invite\/)/g) &&
    msg.channel.type === "text" &&
    msg.channel
      .permissionsFor(msg.guild.member(client.user))
      .has("MANAGE_MESSAGES")
  ) {
    if (msg.member.hasPermission("BAN_MEMBERS")) {
      return;
    } else {
      msg
        .delete(30)
        .then(deletedMsg => {
          deletedMsg.channel.send(uyarıembed);
          msg.guild.owner.send(dmembed).catch(e => {
            console.error(e);
          });
        })
        .catch(e => {
          console.error(e);
        });
    }
  }
});

client.on("message", async message => {
  const ms = require("ms");
  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase();
  let u = message.mentions.users.first() || message.author;
  if (command === "sunucu-kur") {
    if (
      message.guild.channels.find(channel => channel.name === "Bot Kullanımı")
    )
      return message.channel.send(" Bot Paneli Zaten Ayarlanmış.");
    message.channel.send(
      `Bot Bilgi Kanallarının kurulumu başlatılsın mı? başlatılacak ise **evet** yazınız.`
    );
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send(
        " Bu Kodu `Yönetici` Yetkisi Olan Kişi Kullanabilir."
      );
    message.channel
      .awaitMessages(response => response.content === "evet", {
        max: 1,
        time: 10000,
        errors: ["time"]
      })
      .then(collected => {
        message.guild.createChannel("|▬▬|ÖNEMLİ KANALLAR|▬▬|", "category", [
          {
            id: message.guild.id,
            deny: ["SEND_MESSAGES"]
          }
        ]);

        message.guild
          .createChannel("「📃」kurallar", "text", [
            {
              id: message.guild.id,
              deny: ["SEND_MESSAGES"]
            }
          ])
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "|▬▬|ÖNEMLİ KANALLAR|▬▬|"
              )
            )
          );
        message.guild
          .createChannel("「🚪」gelen-giden", "text", [
            {
              id: message.guild.id,
              deny: ["SEND_MESSAGES"]
            }
          ])
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "|▬▬|ÖNEMLİ KANALLAR|▬▬|"
              )
            )
          );
        message.guild
          .createChannel("「✅」sayaç", "text", [
            {
              id: message.guild.id,
              deny: ["SEND_MESSAGES"]
            }
          ])
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "|▬▬|ÖNEMLİ KANALLAR|▬▬|"
              )
            )
          );
        message.guild
          .createChannel("「💾」log-kanalı", "text", [
            {
              id: message.guild.id,
              deny: ["SEND_MESSAGES"]
            }
          ])
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "|▬▬|ÖNEMLİ KANALLAR|▬▬|"
              )
            )
          );
        message.guild
          .createChannel("「📢」duyuru-odası", "text", [
            {
              id: message.guild.id,
              deny: ["SEND_MESSAGES"]
            }
          ])
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "|▬▬|ÖNEMLİ KANALLAR|▬▬|"
              )
            )
          );
      })
      .then(collected => {
        message.guild.createChannel("|▬▬|GENEL KANALLAR|▬▬|", "category", [
          {
            id: message.guild.id
          }
        ]);

        message.guild
          .createChannel(`「💡」şikayet-ve-öneri`, "text")
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "|▬▬|GENEL KANALLAR|▬▬|"
              )
            )
          );
        message.guild
          .createChannel(`「👥」pre-arama-odası`, "text")
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "|▬▬|GENEL KANALLAR|▬▬|"
              )
            )
          );
        message.guild
          .createChannel(`「📷」görsel-içerik`, "text")
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "|▬▬|GENEL KANALLAR|▬▬|"
              )
            )
          );
        message.guild
          .createChannel(`「🤖」bot-komutları`, "text")
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "|▬▬|GENEL KANALLAR|▬▬|"
              )
            )
          );
        message.guild
          .createChannel(`「💬」sohbet`, "text")
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "|▬▬|GENEL KANALLAR|▬▬|"
              )
            )
          );

        message.guild
          .createChannel(`🏆》Kurucu Odası`, "voice")
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "|▬▬|SES KANALLARI|▬▬|"
              )
            )
          )
          .then(c => {
            let role = message.guild.roles.find("name", "@everyone");
            let role2 = message.guild.roles.find("name", "Kurucu");

            c.overwritePermissions(role, {
              CONNECT: false
            });
            c.overwritePermissions(role2, {
              CONNECT: true
            });
          });

        message.guild.createChannel("|▬▬|SES KANALLARI|▬▬|", "category", [
          {
            id: message.guild.id
          }
        ]);

        message.guild
          .createChannel(`🏆》Yönetici Odası`, "voice")
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "|▬▬|SES KANALLARI|▬▬|"
              )
            )
          )
          .then(c => {
            let role = message.guild.roles.find("name", "@everyone");
            let role2 = message.guild.roles.find("name", "Kurucu");
            let role3 = message.guild.roles.find("name", "Yönetici");
            c.overwritePermissions(role, {
              CONNECT: false
            });
            c.overwritePermissions(role2, {
              CONNECT: true
            });
            c.overwritePermissions(role3, {
              CONNECT: true
            });
          });

        message.guild
          .createChannel(`💬》Sohbet Odası`, "voice")
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "|▬▬|SES KANALLARI|▬▬|"
              )
            )
          )
          .then(c => {
            let role = message.guild.roles.find("name", "@everyone");
            c.overwritePermissions(role, {
              CONNECT: true
            });
          });

        message.guild.createChannel("|▬▬|OYUN ODALARI|▬▬|", "category", [
          {
            id: message.guild.id
          }
        ]);

        message.guild
          .createChannel(`🎮》LOL`, "voice")
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "|▬▬|OYUN ODALARI|▬▬|"
              )
            )
          );
        message.guild
          .createChannel(`🎮》ZULA`, "voice")
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "|▬▬|OYUN ODALARI|▬▬|"
              )
            )
          );
        message.guild
          .createChannel(`🎮》COUNTER STRİKE`, "voice")
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "|▬▬|OYUN ODALARI|▬▬|"
              )
            )
          );
        message.guild
          .createChannel(`🎮》PUBG`, "voice")
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "|▬▬|OYUN ODALARI|▬▬|"
              )
            )
          );
        message.guild
          .createChannel(`🎮》FORTNİTE`, "voice")
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "|▬▬|OYUN ODALARI|▬▬|"
              )
            )
          );
        message.guild
          .createChannel(`🎮》MİNECRAFT`, "voice")
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "|▬▬|OYUN ODALARI|▬▬|"
              )
            )
          );
        message.guild
          .createChannel(`🎮》ROBLOX`, "voice")
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "|▬▬|OYUN ODALARI|▬▬|"
              )
            )
          );
        message.guild
          .createChannel(`🎮》WOLFTEAM`, "voice")
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "|▬▬|OYUN ODALARI|▬▬|"
              )
            )
          );

        message.guild.createRole({
          name: "Kurucu",
          color: "RED",
          permissions: ["ADMINISTRATOR"]
        });

        message.guild.createRole({
          name: "Yönetici",
          color: "BLUE",
          permissions: [
            "MANAGE_GUILD",
            "MANAGE_ROLES",
            "MUTE_MEMBERS",
            "DEAFEN_MEMBERS",
            "MANAGE_MESSAGES",
            "MANAGE_NICKNAMES",
            "KICK_MEMBERS"
          ]
        });

        message.guild.createRole({
          name: "Moderatör",
          color: "GREEN",
          permissions: [
            "MANAGE_GUILD",
            "MANAGE_ROLES",
            "MUTE_MEMBERS",
            "DEAFEN_MEMBERS",
            "MANAGE_MESSAGES",
            "MANAGE_NICKNAMES"
          ]
        });

        message.guild.createRole({
          name: "V.I.P",
          color: "00ffff"
        });

        message.guild.createRole({
          name: "Üye",
          color: "WHITE"
        });

        message.guild.createRole({
          name: "Ladys",
          color: "PINK"
        });

        message.guild.createRole({
          name: "Bot",
          color: "ORANGE"
        });

        message.channel.send("Gerekli Odalar Kuruldu!");
      });
  }
});

client.on("message", message => {
  if (message.content.toLowerCase() === prefix + "reload") {
    if (message.author.id === "401797698799271948") {
      const blnmyn = new Discord.RichEmbed()
        .setColor(0xff0000)
        .setTimestamp()
        .setAuthor(message.author.username, message.author.avatarURL)
        .addField(
          ":warning: Uyarı :warning:",
          "Bu komutu kullanabilmek için `Bot Sahibi` yetkisine sahip olmalısın."
        );
      return message.channel.sendEmbed(blnmyn);
    }
    process.exit(1).catch(console.error);
  }
});

client.on("message", message => {
  if (message.content.toLowerCase() === prefix + "bilgi") {
    const embed = new Discord.RichEmbed()
      .addField("Bot Sahibi", `<@${owner}>`, true)

      .addField("Version", "0.0.7", true)

      .addField("Toplam Sunucu Sayısı", client.guilds.size, true)

      .addField(
        "Toplam Kullanıcı Sayısı",
        client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString(),
        true
      )

      .addField("Toplam Kanal Sayısı", client.channels.size, true)
      .addField("Botun Prefixi", "!", true)
      .addField(
        "**❯ Destek sunucusu**",
        " [Sunucumuza Katıl](https://discord.gg/AfaDXvj) "
      )
      .setThumbnail("https://forum.gamer.com.tr/attachments/bilgi-png.55209/")
      .setFooter(
        `${client.user.username} - Tüm hakları saklıdır.`,
        client.user.avatarURL
      )
      .setColor("RANDOM");

    return message.channel.sendEmbed(embed);
  }
});


client.on("guildBanAdd", (guild, user) => {
  let cezalılar = guild.channels.find("name", "cezalılar");
  if (!cezalılar) return;
  cezalılar.send(
    "https://media.giphy.com/media/lbOK3uj00mqLC/giphy.gif **Adalet Mülkün Temeldir !** " +
      user.username +
      "**Bakıyorum Suç İşlemişsin Doğru Sunucudan Dışarı** :fist: :writing_hand:  :spy:"
  );
});
let kufurEngel = JSON.parse(
  fs.readFileSync("./jsonlar/kufurEngelle.json", "utf8")
);
client.on("message", msg => {
  if (!msg.guild) return;
  if (!kufurEngel[msg.guild.id]) return;
  if (kufurEngel[msg.guild.id].küfürEngel === "kapali") return;
  if (kufurEngel[msg.guild.id].küfürEngel === "acik") {
    const kufur = [
      "mk",
      "amk",
      "aq",
      "orospu",
      "oruspu",
      "oç",
      "sikerim",
      "yarrak",
      "piç",
      "amq",
      "sik",
      "amcık",
      "çocu",
      "sex",
      "seks",
      "amına",
      "orospu çocuğu",
      "sg",
      "siktir git"
    ];
    if (kufur.some(word => msg.content.toLowerCase().includes(word))) {
      if (!msg.member.hasPermission("ADMINISTRATOR")) {
        msg.delete();
        msg
          .reply("Küfür filtresi, aktif!")
          .then(message => message.delete(3000));
      }
    }
  }
});

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




let reklamEngel = JSON.parse(
  fs.readFileSync("./jsonlar/reklamEngelle.json", "utf8")
);
client.on("message", msg => {
  if (!msg.guild) return;
  if (!reklamEngel[msg.guild.id]) return;
  if (reklamEngel[msg.guild.id].reklamEngel === "kapali") return;
  if (reklamEngel[msg.guild.id].reklamEngel === "acik") {
    const reklam = [
      ".com",
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
      "discord.gg"
    ];
    if (reklam.some(word => msg.content.toLowerCase().includes(word))) {
      if (!msg.member.hasPermission("ADMINISTRATOR")) {
        msg.delete();
        msg.reply("Reklam Yasak Bunu Bilmiyormusun! <a:kzgn:608389894485704750>")
          .then(message => message.delete(3000));
      }
    }
  }
});
client.on("guildMemberAdd", async member => {
  let sayac = JSON.parse(fs.readFileSync("./otorol.json", "utf8"));
  let otorole = JSON.parse(fs.readFileSync("./otorol.json", "utf8"));
  let arole = otorole[member.guild.id].sayi;
  let giriscikis = JSON.parse(fs.readFileSync("./otorol.json", "utf8"));
  let embed = new Discord.RichEmbed()
    .setTitle("Otorol Sistemi")
    .setDescription(
      `:loudspeaker: :inbox_tray:  @${member.user.tag}'a Otorol Verildi `
    )
    .setColor("GREEN")
    .setFooter("GRAVİTY", client.user.avatarURL);

  if (!giriscikis[member.guild.id].kanal) {
    return;
  }

  try {
    let giriscikiskanalID = giriscikis[member.guild.id].kanal;
    let giriscikiskanali = client.guilds
      .get(member.guild.id)
      .channels.get(giriscikiskanalID);
    giriscikiskanali.send(
      `:loudspeaker: :white_check_mark: Hoşgeldin **${member.user.tag}** Rolün Başarıyla Verildi.`
    );
  } catch (e) {
    // eğer hata olursa bu hatayı öğrenmek için hatayı konsola gönderelim.
    return console.log(e);
  }
});

client.on("guildMemberAdd", async member => {
  let autorole = JSON.parse(fs.readFileSync("./otorol.json", "utf8"));
  let role = autorole[member.guild.id].sayi;

  member.addRole(role);
});
client.on(`guildMemberAdd`, async member => {
  const e = new Discord.RichEmbed()
    .setColor(`RANDOM`)
    .setImage(`https://media.giphy.com/media/PjBhcOypzsTRfv7bKr/giphy.gif`)
  .addField(`Sunucumuza geldiğin için teşekkür ederim!`,`Botumuzu Eklemeyi Unutma!`)
  .addField(`Davet Linkleri;`,`[Botu Sunucuna Eklemek için Tıkla](https://discordapp.com/oauth2/authorize?client_id=510432180774764555&scope=bot&permissions=805829694)\n[Botun Destek Sunucusu](https://discord.gg/AfaDXvj)`)
  .setFooter(`Teşekkürler!`);
  member.send(e);
});

client.on("message", async message => {
  if (message.content === "a!debug") {
    client.emit(
      "guildMemberAdd",
      message.member || (await message.guild.fetchMember(message.author))
    );
  }
});

client.on("guildMemberAdd", async member => {
  const fs = require("fs");
  let gkanal = JSON.parse(fs.readFileSync("./ayarlar/glog.json", "utf8"));
  const gözelkanal = member.guild.channels.get(gkanal[member.guild.id].resim);
  if (!gözelkanal) return;
  let username = member.user.username;
  if (gözelkanal === undefined || gözelkanal === null) return;
  if (gözelkanal.type === "text") {
    const bg = await Jimp.read(
      "https://i.postimg.cc/LXrHDVJC/guildAdd.png"
    );
    const userimg = await Jimp.read(member.user.avatarURL);
    var font;
    if (member.user.tag.length < 15)
      font = await Jimp.loadFont(Jimp.FONT_SANS_128_WHITE);
    else if (member.user.tag.length > 15)
      font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
    else font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
    await bg.print(font, 420, 160, member.user.tag);
    await userimg.resize(310, 310);
    await bg.composite(userimg, 42, 24).write("./img/" + member.id + ".png");
    setTimeout(function() {
      gözelkanal.send(new Discord.Attachment("./img/" + member.id + ".png"));
    }, 1000);
    setTimeout(function() {
      fs.unlink("./img/" + member.id + ".png");
    }, 10000);
  }
});

client.on("guildMemberRemove", async member => {
  const fs = require("fs");
  let gkanal = JSON.parse(fs.readFileSync("./ayarlar/glog.json", "utf8"));
  const gözelkanal = member.guild.channels.get(gkanal[member.guild.id].resim);
  if (!gözelkanal) return;
  let username = member.user.username;
  if (gözelkanal === undefined || gözelkanal === null) return;
  if (gözelkanal.type === "text") {
    const bg = await Jimp.read(
      "https://i.postimg.cc/zGJqxvfr/guild-Remove.png");
    const userimg = await Jimp.read(member.user.avatarURL);
    var font;
    if (member.user.tag.length < 15)
      font = await Jimp.loadFont(Jimp.FONT_SANS_128_WHITE);
    else if (member.user.tag.length > 15)
      font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
    else font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
    await bg.print(font, 420, 160, member.user.tag);
    await userimg.resize(310, 310);
    await bg.composite(userimg, 42, 24).write("./img/" + member.id + ".png");
    setTimeout(function() {
  gözelkanal.send(new Discord.Attachment("./img/" + member.id + ".png"));
    }, 1000);
setTimeout(function() {fs.unlink("./img/" + member.id + ".png");
    }, 10000);
  }
});

client.on("message", async msg => {
  let ozelkomut = await db.fetch(`sunucuKomut_${msg.guild.id}`);
  let ozelkomutYazi;
  if (ozelkomut == null) ozelkomutYazi = "Burayı silme yoksa hatalı olur";
  else ozelkomutYazi = "" + ozelkomut + "";
  if (msg.content.toLowerCase() === `${ozelkomutYazi}`) {
    let mesaj = await db.fetch(`sunucuMesaj_${msg.guild.id}`);
    let mesajYazi;
    if (mesaj == null) mesajYazi = "Burayı silme yoksa hatalı olur";
    else mesajYazi = "" + mesaj + "";
  msg.channel.send(mesajYazi);
  }
});
client.on("message", async message => {
  let uyarisayisi = await db.fetch(`reklamuyari_${message.author.id}`);
  let reklamkick = await db.fetch(`reklamkick_${message.guild.id}`);
  let kullanici = message.member;
  if (reklamkick == "kapali") return;
  if (reklamkick == "acik") {
    const reklam = [
      "discord.app",
      "discord.gg",
      "invite",
      "discordapp",
      "discordgg",
      ".com",
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
      ".party",
      ".rf.gd",
      ".az"
    ];
    if (reklam.some(word => message.content.toLowerCase().includes(word))) {
      if (!message.member.hasPermission("ADMINISTRATOR")) {
        message.delete();
        db.add(`reklamuyari_${message.author.id}`, 1); //uyarı puanı ekleme
        if (uyarisayisi === null) {
          let uyari = new Discord.RichEmbed()
            .setColor("RANDOM")
            .setFooter("Reklam kick sistemi", client.user.avatarURL)
            .setDescription(
              `<@${message.author.id}> reklam kick sistemine yakalandın! Reklam yapmaya devam edersen kickleniceksin (1/3)`
            )
            .setTimestamp();
          message.channel.send(uyari);
        }
        if (uyarisayisi === 1) {
          let uyari = new Discord.RichEmbed()
            .setColor("RANDOM")
            .setFooter("Reklam kick sistemi", client.user.avatarURL)
            .setDescription(
              `<@${message.author.id}> reklam kick sistemine yakalandın! Reklam yapmaya devam edersen kickleniceksin (2/3)`
            )
            .setTimestamp();
          message.channel.send(uyari);
        }
        if (uyarisayisi === 2) {
          message.delete();
          await kullanici.kick({
            reason: `Reklam Kick`
          });
          let uyari = new Discord.RichEmbed()
            .setColor("RANDOM")
            .setFooter("Reklam kick sistemi", client.user.avatarURL)
            .setDescription(
              `<@${message.author.id}> 3 Adet Reklam Uyarısı Aldığı İçin Kicklendi. Bir Kez Daha Yaparsa Banlanacak`
            )
            .setTimestamp();
          message.channel.send(uyari);
        }
        if (uyarisayisi === 3) {
          message.delete();
          await kullanici.ban({
            reason: `Reklam Ban`
          });
          db.delete(`reklamuyari_${message.author.id}`);
          let uyari = new Discord.RichEmbed()
            .setColor("RANDOM")
            .setFooter("Reklam kick sistemi", client.user.avatarURL)
            .setDescription(
              `<@${message.author.id}> Kick Yedikten Sonra Tekrar Devam Ettiği İçin Banlandı.`
            )
            .setTimestamp();
          message.channel.send(uyari);
        }
      }
    }
  }
});
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
         .setColor('BLUE')
         .setDescription(':loudspeaker:'+ message.author + '<a:yesil:647108301279985710> **Hizaya Geçin! Burda Gold Üye Belirdi!**')

         message.channel.send(embed)
    }
    };

       
     
     }
     else if (gold == undefined) {           
          }
          if (!gold) return;
});








client.on("message", message => {
    if (message.channel.type === "dm") {
        if (message.author.bot) return;
        const dmlog = new Discord.RichEmbed()
         .setTitle(`${client.user.username}'e Özelden Mesaj Gönderildi!`)
         .setColor('RANDOM')
         .addField('Mesajı Gönderen',` \`\`\` ${message.author.tag} \`\`\` `)
         .addField('Mesajı Gönderenin ID', ` \`\`\`${message.author.id}\`\`\` `)
         .addField(`Gönderilen Mesaj`, message.content)
         .setThumbnail(message.author.avatarURL) 
    client.channels.get("647125676528369699").send(dmlog);
    }
});
client.on("guildMemberAdd", async member => {
  db.fetch(`botkoruma.coderscode_${member.guild.id}`).then(yusuf => {
  if(yusuf !== "aktif") return;
  setTimeout(() => {
   member.guild.fetchMember(member).then(codersgelmezse => {
   codersgelmezse.roles.forEach(function(codersgelirsekodu) {
   if(codersgelirsekodu.name.includes(member.user.username)) {
   member.guild.member(member).ban();
   member.guild.channels.find(daşşak => daşşak.name === "☠│bot-komutları").send(`**GRAVİTY Bot Koruma Sistemi** \n ${member.guild.owner} Sunucuya Bot Çekmeye Çalıştıklarını Bildirmek İstedim. \n__**Atılan Botun Tagı :**__ ${member.user.tag}`)
}})})
  }, 1000)
})
})


const serverStats = {
  guildID: "646792974105313293",
};
client.on("guildMemberAdd",async message => {
  if (message.guild.id !== serverStats.guildID) return;
  client.channels.get("647861005313114122").setName(`• Üye Sayısı: ${message.guild.memberCount} `);
  client.channels.get("647861139274989620").setName(`• Bot Sayısı: ${message.guild.members.filter(m => m.user.bot).size} `);
  client.channels.get("647861270619488299").setName(`• Kanal Sayısı:  ${message.guild.channels.size}`);
  client.channels.get("655113066320625706").setName(`• Aktif Sayısı:  ${message.guild.members.filter(m => m.presence.status !== "offline").size}`);
// kanal id yazan yerlere sesli kanalın id'sini sağtıklayıp kopyalayın ve yapıştırın
});
//Sunucudan Çıktığın Kişi Sayını Azaltma
client.on("guildMemberRemove", message => {
  if (message.guild.id !== serverStats.guildID) return;
  client.channels.get("647861005313114122").setName(`• Üye Sayısı: ${message.guild.memberCount} `);
   client.channels.get("647861139274989620").setName(`• Bot Sayısı: ${message.guild.members.filter(m => m.user.bot).size} `);
  client.channels.get("647861270619488299").setName(`• Kanal Sayısı:  ${message.guild.channels.size}`);
    client.channels.get("655113066320625706").setName(`• Aktif Sayısı:  ${message.guild.members.filter(m => m.presence.status !== "offline").size}`);

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
client.on("guildMemberRemove", async member => {

    member.guild.fetchInvites().then(guildInvites => {

      const ei = invites[member.guild.id];
  
    invites[member.guild.id] = guildInvites;
 
    const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);

       db.subtract(`davet_${invite.inviter.id + member.guild.id}`,1)
    })
})
client.login(process.env.TOKEN)