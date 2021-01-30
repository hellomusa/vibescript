const Discord = require('discord.js');
const client = new Discord.Client();
const channelID = '805189024200785964';




client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (msg.content === 'ping') {
        guild = msg.guild;

        guild.channels.create('new-general', { reason: 'Needed a cool new channel' })
        .then()
        .catch(console.error);

        // Create a new channel with permission overwrites
        guild.channels.create('new-voice', {
        type: 'voice',
        permissionOverwrites: [
            {
            id: msg.author.id,
            deny: ['VIEW_CHANNEL'],
            },
        ],
        })

        msg.reply('Pong!');
    }
});


client.on('guildMemberAdd', member => {
    member.guild.channels.get(channelID).send("Welcome"); 
});

client.login('ODA1MTg4Njk4MjUzNjg4ODQz.YBXQaQ.vSqL3djzDqWVTDyDnzeNPUeyOs4');