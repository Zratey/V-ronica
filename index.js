const Discord = require('discord.js');
const client = new Discord.Client();
var prefix = "/"

/*bonjour*/
client.login('NTUxMTUwNjczMzQ2MDM1NzIz.D1vWWQ.J8-FPs_5nkGyCfhCxG7IGNLXEFM');
client.on('message', message =>{
    if(message.content === "Bonjour Véronica"){
        message.reply('Hey ! :wave:');
        console.log('répond quand on lui dit bonjour');
    }
});

client.on('message', message =>{
    if(message.content === "bonjour Véronica"){
        message.reply('Hey ! :wave:');
        console.log('répond quand on lui dit bonjour sans maj bonjour');
    }
});

client.on('message', message =>{
    if(message.content === "bonjour véronica"){
        message.reply('Hey ! :wave:');
        console.log('répond quand on lui dit bonjour sans maj');
    }
});

/*comment ça va*/
client.on('message', message =>{
    if(message.content === "comment tu vas Véronica ?"){
        message.channel.sendMessage('Toujours comme jaja ^^ et toi ?');
        console.log('répond quand on lui demande comment elle va');
    }
});

/*quit*/
client.on('guildMemberRemove', member =>{
    member.guild.channels.get('397334148710400000').send('Aurevoir' + member.user + ':cry: Dommages que tu sois parti...*le bon côté des choses, c est que j aurais plus de pizza* :yum:');
    member.guild.channels.get('397378707960102922').send('Nous sommes maintenant ' + member.guild.memberCount + ' sur le serveur');
    console.log('message de aurevoir');
})

/*acceuil*/
client.on('guildMemberAdd', member =>{
    member.guild.channels.get('397334148710400000').send('Bienvenue' + member.user + '! Nous sommes ravis de t accueillir sur le serveur ! Je t invite à lire le #reglement :eyes:');
    member.guild.channels.get('397378707960102922').send('Nous sommes maintenant ' + member.guild.memberCount + ' sur le serveur');
    member.addRole('397371364685643779')
    console.log('accueil une nouvelle personne');
})

/*Kick*/
client.on('message',message =>{
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)
 
    if (args[0].toLocaleLowerCase() === prefix + 'kick'){
       if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande ;(")
       let member = message.mentions.members.first()
       if (!member) return message.channel.send("Veuillez mentionner un utilisateur :x:")
       if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.owner.id) return message.channel.send("Vous ne pouvez pas kick cet utilisateur :x:")
       if (!member.kickable) return message.channel.send("Je ne peux pas exclure cet utilisateur éwè")
       member.kick()
       message.channel.send("**"+member.user.username + '** a été exclu :white_check_mark:')
    }
});

/*Ban*/
client.on('message',message =>{
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)
 
    if (args[0].toLocaleLowerCase() === prefix + 'ban'){
       if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande ;(")
       let member = message.mentions.members.first()
       if (!member) return message.channel.send("Veuillez mentionner un utilisateur :x:")
       if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.owner.id) return message.channel.send("Vous ne pouvez pas bannir cet utilisateur :x:")
       if (!member.bannable) return message.channel.send("Je ne peux pas bannir cet utilisateur éwè")
       message.guild.ban(member, {days: 7})
       message.channel.send("**"+member.user.username + '** a été banni :white_check_mark:')
    }
});

client.on("message", message => {
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)
 
    if (args[0].toLowerCase() === prefix + "clear") {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("T as cru wsh ?")
        let count = args[1]
        if (!count) return message.channel.send("Veuillez indiquer un nombre de messages à supprimer")
        if (isNaN(count)) return message.channel.send("Veuillez indiquer un nombre valide")
        if (count < 1 || count > 100) return message.channel.send("Veuillez indiquer un nombre entre 1 et 100")
        message.channel.bulkDelete(parseInt(count) + 1)
    }
})

client.on("message", message => {
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)
 
    if (args[0].toLowerCase() === prefix + "clear") {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande")
        let count = args[1]
        if (!count) return message.channel.send("Veuillez indiquer un nombre de messages à supprimer")
        if (isNaN(count)) return message.channel.send("Veuillez indiquer un nombre valide")
        if (count < 1 || count > 100) return message.channel.send("Veuillez indiquer un nombre entre 1 et 100")
        message.channel.bulkDelete(parseInt(count) + 1)
    }
 
    if (args[0].toLowerCase() === prefix + "mute") {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande")
        let member = message.mentions.members.first()
        if (!member) return message.channel.send("Membre introuvable")
        if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.ownerID) return message.channel.send("Vous ne pouvez pas mute ce membre")
        if (member.highestRole.calculatedPosition >= message.guild.me.highestRole.calculatedPosition || member.id === message.guild.ownerID) return message.channel.send("Je ne peux pas mute ce membre")
        let muterole = message.guild.roles.find(role => role.name === 'Muted')
        if (muterole) {
            member.addRole(muterole)
            message.channel.send(member + ' a été mute :white_check_mark:')
        }
        else {
            message.guild.createRole({name: 'Muted', permissions: 0}).then((role) => {
                message.guild.channels.filter(channel => channel.type === 'text').forEach(channel => {
                    channel.overwritePermissions(role, {
                        SEND_MESSAGES: false
                    })
                })
                member.addRole(role)
                message.channel.send(member + ' a été mute :white_check_mark:')
            })
        }
    }
})