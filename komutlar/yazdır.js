const Discord = require('discord.js');

	

	

exports.run = function (client, message, args) {

	

    let kişi = message.mentions.users.first();

	

    if (message.mentions.users.size < 1) return message.reply('Ne Yazılacagını ve kimin Yazacagını seçmelisin \n `Doğru Kullanım: a!yazdır [@Kullanici#1234] [Mesaj]`!')

	

    

	

	

    let yazi = args.join(" ").slice(22);

	

    if (!yazi) return message.reply('Ne Yazılacagını ve kimin Yazacagını seçmelisin \n `Doğru Kullanım: a!yazdır [@Kullanici#1234] [Mesaj]`!')

	

    message.delete();

	

    message.channel.createWebhook(kişi.username, kişi.avatarURL)

	

    .then(webhook => webhook.edit(kişi.username, kişi.avatarURL)

	

        .then(wb => {

	

            const hook = new Discord.WebhookClient(wb.id, wb.token);

	

            hook.send(yazi)

	

            hook.delete()

	

        })

	

        .catch(console.error))

	

        .catch(console.error);

	

};

	

	

exports.conf = {

	

    enabled: true,

	

    guildOnly: false,

	

    aliases: ['sahte','sahtemesaj'],

	

    permLevel: 3

	

};

	

	

exports.help = {

	

    name: 'yazdır',

	

    description: 'yazdır',

	

    usage: 'yazdır'

	

};