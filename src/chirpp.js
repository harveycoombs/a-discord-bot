//Chirpp v2.59 - Harvey C. - http://www.bacharu.com/
//Some code has been removed due to dependencies/misc. issues
//Copyright, Written by Harvey C. | 2018-2021
const Discord = require("discord.js");
const Canvas = require("canvas");
const fetch = require('node-fetch');

const client = new Discord.Client();
const config = require("./config.json");
const { groupCollapsed } = require("console");
const { createGzip } = require("zlib");

client.on("ready", () => {

  console.log(`
 Written in JavaScript by...

  ██╗  ██╗ █████╗ ██████╗ ██╗   ██╗███████╗██╗   ██╗
  ██║  ██║██╔══██╗██╔══██╗██║   ██║██╔════╝╚██╗ ██╔╝
  ███████║███████║██████╔╝██║   ██║█████╗   ╚████╔╝
  ██╔══██║██╔══██║██╔══██╗╚██╗ ██╔╝██╔══╝    ╚██╔╝
  ██║  ██║██║  ██║██║  ██║ ╚████╔╝ ███████╗   ██║██╗
  ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝  ╚═══╝  ╚══════╝   ╚═╝╚═╝
  Harvey | Bacharu Developments

   Bot has started successfully in ${client.guilds.cache.size} guilds.`)
   
   console.log('\x1b[36m%s\x1b[0m', 'Chirpp v2.6 Started Successfully.')

  if (client.guilds.cache.size <= 2) {client.user.setActivity(`c! | chirpp.xyz | 1 server :(`, {type: 'LISTENING'})}

  else {client.user.setActivity(`c! | chirpp.xyz`, {type: 'LISTENING'})};

});

const terms = require('./cmdlist.json');
const { join } = require("path");


client.on('message', (message) => {if(message.content.includes(client.user.id)) return message.reply(':wave: Hi there! my prefix is: `c!`')})

client.on('message', (message) => {

  if(message.content.includes('.gg/') || message.content.includes('gg/')) {

    const nocmdEmbed = new Discord.MessageEmbed()
    .setColor('#33a9df')
    .setTitle(':warning: That URL is not allowed in this server!')
    .setTimestamp()

    message.channel.send(nocmdEmbed);
    return message.delete();    
  } 
});

client.on('message', (message) => {

  if (message.content.startsWith(config.prefix)) {

    const found = !!terms.find(function (word) {const regex = new RegExp(`\\b${word}\\b`, 'i'); return regex.test(message.content)});

    if (!found) {

      const nocmdEmbed = new Discord.MessageEmbed()
      .setColor('#33a9df')
      .setTitle(':warning: Command not found. try ```c!help``` for a full list of commands.')
      .setTimestamp()

      message.channel.send(nocmdEmbed);
    }
  }
});

client.on('message', (message) => {

  if(message.content === "carbon hydrogen iridium phosphorus phosphorus") {

    const chEmbed = new Discord.MessageEmbed()
    .setColor('#33a9df')
    .setTitle('CHIrP₂')
    .setThumbnail(client.user.displayAvatarURL({format: 'png'}))
    .addFields(
      {name: ':test_tube: Molecular Formula:', value: 'CHIrP₂', bold: true},
      {name: ':test_tube: Molecular Weight:', value: '267.18 g/mol', bold: true},
      {name: ':test_tube: Monoisotropic Mass:', value: '267.91827 Da', bold: true})
    .setTimestamp()
  
    message.channel.send(chEmbed);  
  }
});

client.on("guildMemberAdd", member => {

  let role = member.guild.roles.cache.find(r => r.name === setrole);
  member.roles.add(role);
});

client.on('messageDelete', (messageDelete) => {

  const msgDelEmbed = new Discord.MessageEmbed()
  .setColor('#33a9df')
  .setTitle(`:wastebasket: Message deleted in #${messageDelete.channel.name}:`)
  .setDescription(`'${messageDelete.content}'`)
  .setFooter(`Message sent by: ${messageDelete.author.tag}`, messageDelete.author.displayAvatarURL({format: 'jpg'}))

  const msgDelMediaEmbed = new Discord.MessageEmbed()
  .setColor('#33a9df')
  .setTitle(`:wastebasket: Message deleted in #${messageDelete.channel.name}:`)
  .setImage(messageDelete.content)
  .setFooter(`Message sent by: ${messageDelete.author.tag}`, messageDelete.author.displayAvatarURL({format: 'jpg'}))

  if (messageDelete.author.bot) return;

  if(messageDelete.content.includes('https://')) {messageDelete.guild.systemChannel.send(msgDelMediaEmbed)}

  else{messageDelete.guild.systemChannel.send(msgDelEmbed)};

});

client.on('messageUpdate', (oldMessage, newMessage) => {

  const msgEditEmbed = new Discord.MessageEmbed()
  .setColor('#33a9df')
  .setTitle(`:pencil: Message edited in #${oldMessage.channel.name}:`)
  .setDescription('From: `' + oldMessage.content + '` To: `' + newMessage.content + '`')
  .setFooter(`Message sent & edited by: ${oldMessage.author.tag}`, oldMessage.author.displayAvatarURL({format: 'jpg'}))

  newMessage.guild.systemChannel.send(msgEditEmbed);

});

client.on("guildCreate", guild => {

  const welcomeEmbed = new Discord.MessageEmbed()
  .setColor('#33a9df')
  .setTitle('Chirpp')
  .setURL('http://chirpp.xyz/')
  .setThumbnail(client.user.displayAvatarURL({format: 'png'}))
  .addFields({name: 'Thankyou :star2:', value: 'Thankyou for adding me to your server! I hope I can provide you with all the essentials a good discord server needs, plus some pretty fun commands on the side!'})
  .setFooter(`written in javascript by Harvey#3699`, client.user.displayAvatarURL({format: 'png'}))
  .setTimestamp()

  guild.systemChannel.send(welcomeEmbed);

});

client.on("guildMemberRemove", member => {

  const leaveEmbed = new Discord.MessageEmbed()
  .setColor('#33a9df')
  .setTitle(`${member.user.tag} Left the server.`)
  .setFooter(`${member.guild.name} Now has ${member.guild.memberCount} members.`, `${member.guild.iconURL()}`)
  .setTimestamp()

  member.guild.systemChannel.send(leaveEmbed);
});

client.on("guildMemberAdd", member => {

  const joinEmbed = new Discord.MessageEmbed()
  .setColor('#33a9df')
  .setTitle(`${member.user.tag} Joined the server.`)
  .setFooter(`${member.guild.name} Now has ${member.guild.memberCount} members.`, `${member.guild.iconURL()}`)
  .setTimestamp()

  member.guild.systemChannel.send(joinEmbed);
});

client.on("guildMemberAdd", member => {

  const welcJD = member.user.createdAt.toString()

  const membWelcEmbed = new Discord.MessageEmbed()
  .setColor('#33a9df')
  .setTitle(`:wave: Welcome to ${member.guild.name}, ${member.user.tag}!`)
  .setThumbnail(member.user.displayAvatarURL())
  .setDescription(`Account created on: ${welcJD.substring(0, welcJD.length - 40)}.`)
  .setFooter(`${member.guild.name} Now has ${member.guild.memberCount} members.`, `${member.guild.iconURL()}`)
  .setTimestamp()

  member.guild.systemChannel.send(membWelcEmbed);
  
});

client.on("message", async message => {

  if(message.author.bot) return;

  if(!message.content.startsWith(config.prefix)) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/);
  const input = args.shift().toLowerCase();

  const tagged = message.mentions.members.first() || message.member;
  const users = message.mentions.users.first() || message.author;
  
  switch(input) {

    case "help": 
    
        const helpEmbed = new Discord.MessageEmbed()
        .setColor('#33a9df')
        .setTitle(`Chirpp`)
        .setAuthor('Command list', client.user.displayAvatarURL({format: 'png'}))
        .setThumbnail(client.user.displayAvatarURL({format: 'png'}))
        .addFields(
        {name: '*prefix - c!*', value: '**:gear: General commands:**', inline: true},
        {name: '```help``` ```info``` ```user``` ```avatar``` ```clean``` ```server``` ```news``` ```channel``` ```calc``` ```weather``` ```embed``` ```timer```', value: ':crossed_swords: **Moderator commands:**'},
        {name: ' ```kick``` ```ban``` ```warn``` ```mute``` ```invite``` ```crole``` ```drole``` ```arole``` ```rrole``` ```srole``` ```nrole``` ```nick``` ```setup```', value: ':camera_with_flash: **Image commands:**'},
        {name: '```imgsrc``` ```contrast``` ```brightness``` ```bonk``` ```twitter``` ```sus```', value: ':dart: **Fun commands:**'},
        {name: '```define``` ```ship``` ```rather``` ```lie``` ```8ball``` ```ddate``` ```wheel```  ```fact``` ```chess``` ```trivia```', value: ':musical_note: **Music commands:**'},
        {name: '```play``` ```stop``` ```skip``` ```vol``` ```plist``` ```queue``` ```lyrics``` ```shuffle```', value: '**Thanks for using my bot! - Harvey :thumbsup:**'})
        .setImage('https://i.ibb.co/6gqB7ZH/botbanner.png')
        .setFooter(`written in javascript by Harvey#3699`, client.user.displayAvatarURL({format: 'png'}))
        .setTimestamp()

        await message.author.send(helpEmbed);

    break;

    case "user":
  
        const userAge = users.createdAt.toString();
        const joinDate = tagged.joinedAt.toString();

        const infoEmbed = new Discord.MessageEmbed()
        .setColor('#33a9df')
        .setTitle(`${users.username}'s account information`)
        .setThumbnail(users.displayAvatarURL({format: 'png'}))
        .addFields(
        {name: `:label: Username: `, value: users.tag, bold:true},
        {name: `:information_source: ID:`, value: users.id, bold:true},
        {name: ':calendar: Account created on:', value: userAge.substring(0, userAge.length - 40), bold:true},
        {name: ':clock: Joined server on:', value: joinDate.substring(0, joinDate.length - 40), bold:true},
        {name: ':speech_balloon: Last message:', value: users.lastMessage, bold:true},
        {name: ':placard: Server nickname:', value: tagged.nickname, bold:true})
        .setTimestamp()
        
        await message.channel.send(infoEmbed);
    
    break;

    case "info":

      const pms = require("pretty-ms");

        const botinfoEmbed = new Discord.MessageEmbed()
        .setColor('#33a9df')
        .setTitle(`About Chirpp`)
        .setURL('http://www.chirpp.xyz')
        .setThumbnail(client.user.displayAvatarURL({format: 'png'}))
        .addFields(
        {name: ':label: bot Username:', value: `Chirpp#3036`, inline:true},
        {name: ':information_source: Developed by:', value: `Harvey#3699`, inline:true},
        {name: ':tools: Written in:', value: 'JavaScript/Node.JS', inline:true},
        {name: ':speech_balloon: Prefix', value: `c!`, inline:true},
        {name: ':calendar: Version:', value: 'v2.5', inline:true},
        {name: ':busts_in_silhouette: In:', value: `${client.guilds.cache.size} servers`, inline:true},
        {name: ':alarm_clock: Uptime:', value: `${pms(client.uptime)}`})
        .setTimestamp()
  
        await message.channel.send(botinfoEmbed);
    
    break;

    case "server":
        
        const serverAge = message.guild.createdAt.toString();
        const emojiArray = [':smiley:', ':blush:', ':innocent:'];
        const randomIcon = emojiArray[Math.floor(Math.random() * emojiArray.length)];

        const chanCnt = message.guild.channels.cache;
        
        var region = '';
        var serverBanner = '';

        const roleList = message.guild.roles.cache.array();

        if(!message.guild.banner) {serverBanner = 'No server banner'}
        else {serverBanner = message.guild.banner}

        if(message.guild.region === 'europe') {region = ':flag_eu:'}
        else {region = ':flag_us:'}

        const servEmbed = new Discord.MessageEmbed()
        .setColor('#33a9df')
        .setThumbnail(message.guild.iconURL())
        .setTitle(`Information about ${message.guild.name}:`)
        .addFields(
        {name: `:label: Name:`, value: ` ${message.guild.name}`},
        {name: ':information_source: ID:', value: `${message.guild.id}`},
        {name: ':busts_in_silhouette: Members:', value: `${message.guild.memberCount}`},
        {name: ':globe_with_meridians: Server region:', value: `${region} ${message.guild.region}`},
        {name: ':calendar: Created on:', value: `${serverAge.substring(0, serverAge.length - 40)}`},
        {name: ':crown: Server owner:', value: `${message.guild.owner}`},
        {name: ':speech_balloon: Text channels:', value: `${message.guild.channels.cache.size} (Total): ${chanCnt.filter(c => c.type === "text").size} Text channels | ${chanCnt.filter(c => c.type === "voice").size} Voice channels | ${chanCnt.filter(c => c.type === "category").size} Categories`},
        {name: ':frame_photo: Server banner:', value: `${serverBanner}`},
        {name: `${randomIcon} Emoji most used:`, value: `${message.guild.emojis.cache.first()}`},
        {name: ':name_badge: Roles:', value: `${roleList[0]}, ${roleList.slice(1, 20)}...`})
        .setTimestamp()
      
        await message.channel.send(servEmbed);
      
    break;

    case "channel":

        var ChanAge = message.channel.createdAt.toString()

        const chanEmbed = new Discord.MessageEmbed()
        .setColor('#33a9df')
        .setTitle(`Channel Information about ${message.channel.name}:`)
        .addFields(
        {name: ':calendar: Created on:', value: `${ChanAge.substring(0, ChanAge.length - 40)}`},
        {name: ':scroll: Channel topic:', value: `${message.channel.topic}`},
        {name: ':speech_balloon: Message count (Today):', value: `${message.channel.messages.cache.size}`})
        .setTimestamp()
    
        await message.channel.send(chanEmbed);
    
    break;

    case "avatar":
        
        if(!users) {
         
          const authorAviEmbed = new Discord.MessageEmbed()  
          .setColor('#33a9df')
          .setTitle(`Your Avatar:`)
          .setImage(`${message.author.displayAvatarURL({ dynamic: true })}`)
          .setTimestamp()

          await message.channel.send(authorAviEmbed);
        }
        
        else {
    
          const aviEmbed = new Discord.MessageEmbed()
          .setColor('#33a9df')
          .setTitle(`${users.username}'s Avatar:`)
          .setImage(`${users.displayAvatarURL({ dynamic: true })}`)
          .setTimestamp()
          
          await message.channel.send(aviEmbed); 
        }
    
    break;

    case "timer":

        const numb = args[0];
        const timerName = args[1];
        var format = '';
        var timerInf = '';
      
        if(numb.endsWith('h')) {
        format = 360000000;
        timerInf = 'Hour';  
        }
      
        if(numb.endsWith('m')) {
        format = 60000;
        timerInf = 'Minute';
        }
      
        if(numb.endsWith('s')) {
        format = 1000;
        timerInf = 'Second';
        }
      
        const duration = format * numb.substring(0, numb.length -1);
      
        const timerSetEmbed = new Discord.MessageEmbed()
        .setColor('#33a9df')
        .setTitle(`:alarm_clock: ${numb.substring(0, numb.length -1)} ${timerInf} timer set with the name '${timerName}'.`)
      
        await message.channel.send(timerSetEmbed);
      
        function timerInitial() {
        
          const timerUpEmbed = new Discord.MessageEmbed()
          .setColor('#66ff99')
          .setTitle(`:alarm_clock: ${numb.substring(0, numb.length -1)} ${timerInf} timer up.`)
      
          return message.reply(timerUpEmbed);
        }
      
        setTimeout(timerInitial, duration);
    
    break;

    case "find":

      message.channel.messages.fetch().then((messages) => {findMsgs = messages.filter(m => m.content === args.join(' ')).array();

       const findEmbed = new Discord.MessageEmbed()
       .setColor('#33a9df')
       .setTitle(`:mag: ${findMsgs.length} Messages found containing string: ` + '`' + args.join(' ') + '`.')
       .setTimestamp()

       await message.channel.send(findEmbed);
      });

    break;  

    case "ddate":

        const dateArray = ['Years :skull_crossbones:', 'Months :skull_crossbones:', 'Days :skull_crossbones:'];
      
        const causeArray = ['Mysterious/unknown', 'Vehicular related', 'Natural causes', 'Disease', 'Kitchen accident', 
                            'Falling down the stairs', 'Alcohol', 'Dehyrdation', 'Starvation', 'Suicide', 'Fire', 'Doing something embarrassing...'];
      
        const deathRNG = [Math.floor((Math.random() * 118) + 1)];
        const dateRandom = dateArray[Math.floor(Math.random() * dateArray.length)];
        const causeRandom = causeArray[Math.floor(Math.random() * causeArray.length)];
      
        const deathDateEmbed = new Discord.MessageEmbed()
        .setColor('#33a9df')
        .setTitle('**You will die in:**')
        .addFields({name: `${deathRNG} ${dateRandom}`, value: `Cause of death: ${causeRandom}`, inline: true})
        .setTimestamp()
      
        await message.channel.send(deathDateEmbed);

    break;

    case "roll":
    
        var rollRNG = [Math.floor((Math.random() * 8) + 1)];

        if(rollRNG >= 6) {   
        const rollWinEmbed = new Discord.MessageEmbed()
        .setColor('#33a9df')
        .setTitle(':game_die: :sunglasses: GG.')
        .setTimestamp()
        .setFooter(`You rolled: 6`)

        await message.channel.send(rollWinEmbed);

        }

        else {

        const rollLoseEmbed = new Discord.MessageEmbed()
        .setColor('#33a9df')
        .setTitle(':game_die: :regional_indicator_x: Better luck next time.')
        .setTimestamp()
        .setFooter(`You rolled: ${rollRNG}`)
        
        message.channel.send(rollLoseEmbed);

        }
    
    break;

    case "slots":

        const slotsRNG = [Math.floor((Math.random() * 30000) + 1)];
        const fruits = [':cherries:', ':strawberry:', ':grapes:', ':lemon:', ':tangerine:', ':blueberries:', ':watermelon:', ':bell:'];
        const slotone = fruits[Math.floor(Math.random() * fruits.length)];
        const slottwo = fruits[Math.floor(Math.random() * fruits.length)];
        const slotthree = fruits[Math.floor(Math.random() * fruits.length)];

        if(slotsRNG >= 29990) {
        const slotsWinEmbed = new Discord.MessageEmbed()
        .setColor('#33a9df')
        .setTitle(':seven: :seven: :seven:')
        .setDescription('JACKPOT!')
        .setTimestamp()

        await message.channel.send(slotsWinEmbed);
        }

        else {
        const slotsLoseEmbed = new Discord.MessageEmbed()
        .setColor('#33a9df')
        .setTitle(`${slotone}${slottwo}${slotthree}`)
        .setDescription('better luck next time.')
        .setTimestamp()
        
        await message.channel.send(slotsLoseEmbed);
        }

    break;

    case "8ball":
    
        const answersArray = ['Yes', 'No', 'Maybe', 'Possibly', 'Impossible', 'Asbolutely', 'Youve gotta be joking',
                              '50/50', 'Without a doubt', 'Dont get your hopes up', 'It could go either way', 'Hmmm..'];

        const answer = answersArray[Math.floor(Math.random() * answersArray.length)];
                            
        const eballEmbed = new Discord.MessageEmbed()
        .setColor('#33a9df')
        .setTitle(`:8ball: ${answer}.`)
        .setTimestamp()

        await message.channel.send(eballEmbed);

    break;

    case "lie":

      const taggedUser = message.mentions.users.first();

      const rand_ld = ['a lie! :zap:', 'the truth. :white_check_mark:',];
  
      const liedetectEmbed = new Discord.MessageEmbed()
      .setColor('#66ff99')
      .setTitle(`${taggedUser.username} is telling:`)
      .setDescription(rand_ld[Math.floor(Math.random() * rand_ld.length)])
      .setTimestamp()
  
      await message.channel.send(liedetectEmbed);

    break;

    case "ship":

        const chance = [Math.floor((Math.random() * 100) + 1)];

        const firstUser = message.mentions.users.first();
        const secondUser = message.mentions.users.last();
      
        const loveGoodEmbed = new Discord.MessageEmbed()
        .setColor('#33a9df')
        .setTitle(`${chance}%`)
        .setDescription(`${firstUser.username} and ${secondUser.username}, its a match! :sparkling_heart: :revolving_hearts: :bow_and_arrow:`)
        .setTimestamp()
  
        const loveBadEmbed = new Discord.MessageEmbed()
        .setColor('#33a9df')
        .setTitle(`${chance}%`)
        .setDescription(`${firstUser.username} and ${secondUser.username}, Recipe for disaster? :broken_heart: :x: :knife:`)
        .setTimestamp()
  
        const loveNeutralEmbed = new Discord.MessageEmbed()
        .setColor('#33a9df')
        .setTitle(`${chance}%`)
        .setDescription(`${firstUser.username} and ${secondUser.username}, Hard to say... :heart: :grey_question: :comet:`)
        .setTimestamp()
  
        if(chance <= 49)
        return message.channel.send(loveBadEmbed);
  
        if(chance >= 51)
        return message.channel.send(loveGoodEmbed);
  
        if(chance = 50)
        return message.channel.send(loveNeutralEmbed);

    break;

    case "twitter":

        const twitterCanvas = Canvas.createCanvas(609, 407);
        const twitterContext = twitterCanvas.getContext('2d');
        const authorDate = message.author.createdAt.toString()
    
        const background = await Canvas.loadImage('./twit.jpg');
        twitterContext.drawImage(background, 0, 0, twitterCanvas.width, twitterCanvas.height);
    
        twitterContext.strokeStyle = '#74037b';
        twitterContext.strokeRect(0, 0, twitterCanvas.width, twitterCanvas.height);
    
        twitterContext.font = '23px Arial';
        twitterContext.fillStyle = '#000000';
        twitterContext.fillText(message.author.username, 23, 234, 200, 200);
    
        twitterContext.font = '14px Arial';
        twitterContext.fillStyle = '#657786';
        twitterContext.fillText(message.author.id, 36, 252, 200, 200);
    
        twitterContext.font = '14px Arial';
        twitterContext.fillStyle = '#000000';
        twitterContext.fillText(authorDate.substring(0, 15), 234, 333, 300, 200);
    
        twitterContext.font = '15px Arial';
        twitterContext.fillStyle = '#000000';
        twitterContext.fillText(args.join(' '), 21, 280, 1000, 200);
    
        twitterContext.font = '14px Arial';
        twitterContext.fillStyle = '#000000';
        twitterContext.fillText([Math.floor((Math.random() * 500) + 1)], 25, 362, 200, 200);
    
        twitterContext.font = '15px Arial';
        twitterContext.fillStyle = '#000000';
        twitterContext.fillText([Math.floor((Math.random() * 800) + 1)], 127, 362, 200, 200);
    
        twitterContext.beginPath();
        twitterContext.arc(88, 142, 67, 0, Math.PI * 2, true);
        twitterContext.closePath();
        twitterContext.clip();
    
        const twitterAvatar = await Canvas.loadImage(message.author.displayAvatarURL({ format: 'jpg' }));
        twitterContext.drawImage(twitterAvatar, -12, 42, 200, 200);
    
        const twitterFinal = new Discord.MessageAttachment(twitterCanvas.toBuffer(), 'twitter.png');
    
        message.channel.send(twitterFinal);    

    break;

    case "sus":

        const susCanvas = Canvas.createCanvas(360, 450);
        const susContext = susCanvas.getContext('2d');
        const susImg = await Canvas.loadImage('./sus.png');
        susContext.drawImage(susImg, 0, 0, susCanvas.width, susCanvas.height);
      
        susContext.strokeStyle = '#74037b';
        susContext.strokeRect(0, 0, susCanvas.width, susCanvas.height);
      
        susContext.beginPath();
        susContext.ellipse(254, 138, 58, 88, Math.PI / 2, 0, 2 * Math.PI);
        susContext.closePath();
        susContext.clip();
      
        const susAvatar = await Canvas.loadImage(users.displayAvatarURL({ format: 'jpg' }));
        susContext.drawImage(susAvatar, 166, 53, 180, 170);
      
        const susFinal = new Discord.MessageAttachment(susCanvas.toBuffer(), 'amongus.png');
        message.channel.send(susFinal);    

    break;

    case "rules":

      const servREmbed = new Discord.MessageEmbed()
      .setColor('#33a9df')
      .setThumbnail(message.guild.iconURL())
      .setTitle(`${message.guild.name} | Rules`)
      .addFields(
      {name: `:one: Rule 1:`, value: `No loli/shota/cub etc.`},
      {name: ':two: Rule 2:', value: `No unauthorised promotion/adv`},
      {name: ':three: Rule 3:', value: `No gore`},
      {name: ':four: Rule 4:', value: `Keep spamming to a minimum`})
      .setTimestamp()
    
      await message.channel.send(servREmbed);

    break;

    case "arrest":

        const arrestCanvas = Canvas.createCanvas(1024, 738);
        const arrestContext = arrestCanvas.getContext('2d');
        const arrestImg = await Canvas.loadImage('./cuffs.jpg');
        arrestContext.drawImage(arrestImg, 0, 0, arrestCanvas.width, arrestCanvas.height);
    
        arrestContext.strokeStyle = '#74037b';
        arrestContext.strokeRect(0, 0, arrestCanvas.width, arrestCanvas.height);
    
        arrestContext.beginPath();
        arrestContext.arc(630, 165, 67, 0, Math.PI * 2, true);
        arrestContext.arc(130, 465, 67, 0, Math.PI * 2, true);
        arrestContext.closePath();
        arrestContext.clip();
    
        const authorAvatar = await Canvas.loadImage(message.author.displayAvatarURL({ format: 'jpg' }));
        arrestContext.drawImage(authorAvatar, 555, 95, 150, 150);
    
        const targetAvatar = await Canvas.loadImage(users.displayAvatarURL({ format: 'jpg' }));
        arrestContext.drawImage(targetAvatar, 55, 389, 150, 150);
    
        const arrestFinal = new Discord.MessageAttachment(arrestCanvas.toBuffer(), 'arrested.png');
        message.channel.send(arrestFinal);

    break;

    case "frame":

        const frameCanvas = Canvas.createCanvas(473, 583);
        const frameContext = frameCanvas.getContext('2d');
        const frameImg = await Canvas.loadImage('./frame.jpg');
        frameContext.drawImage(frameImg, 0, 0, frameCanvas.width, frameCanvas.height);
      
        frameContext.strokeStyle = '#74037b';
        frameContext.strokeRect(0, 0, frameCanvas.width, frameCanvas.height);
        
        const imageURL = await Canvas.loadImage(args.join(' '));
        frameContext.drawImage(imageURL, 75, 78, 321, 429);
      
        const frameFinal = new Discord.MessageAttachment(frameCanvas.toBuffer(), 'framed.png');
        message.channel.send(frameFinal);

    break;

    case "crole":

        const croleName = args[0];
        const hexCode = args[1];
        const perms = args.slice(2);

        const crEmbed = new Discord.MessageEmbed()
        .setColor(hexCode)
        .setTitle(`:label: Role successfully created:`)
        .addFields(
          {name: `:placard: Name:`, value: croleName},
          {name: `:art: Color:`, value: hexCode},
          {name: `:label: Permissions:`, value: perms})
    
        const crErrEmbed = new Discord.MessageEmbed()
        .setColor('#33a9df')
        .setTitle(`:warning: Invalid role name.`)
    
        const crPermsEmbed = new Discord.MessageEmbed()
        .setColor('#33a9df')
        .setTitle(`:no_entry: Invalid permissions.`)
    

        if (!message.member.hasPermission(['MANAGE_ROLES'])) return message.channel.send(crPermsEmbed);
        if(!args) return message.channel.send(crErrEmbed);

        else {message.guild.roles.create({data: {name: croleName, color: hexCode, permissions: [perms]}}).then(message.channel.send(crEmbed))};

    break;

    case "drole":

        let delRole = message.guild.roles.cache.find(r => r.name == args.join(' '));
    
        const drEmbed = new Discord.MessageEmbed()
        .setColor('#33a9df')
        .setTitle(`:wastebasket: Role: '${args.join(' ')} successfully deleted.'`)
    
        const drErrEmbed = new Discord.MessageEmbed()
        .setColor('#33a9df')
        .setTitle(`:warning: Invalid role name.`)
    
        const drPermsEmbed = new Discord.MessageEmbed()
        .setColor('#33a9df')
        .setTitle(`:no_entry: Invalid permissions.`)
    
        if(!delRole) return message.channel.send(drErrEmbed);
        if (!message.member.hasPermission(['MANAGE_ROLES'])) return message.channel.send(drPermsEmbed);

        else {message.channel.send(drEmbed).then(message.guild.roles.delete(delRole))};

    break;

    case "srole":

        let guildRole = message.guild.roles.cache.find(r => r.name == args.join(' '));
      
        const srEmbed = new Discord.MessageEmbed()
        .setColor('#33a9df')
        .setTitle(`:white_check_mark: ${args.join(' ')} assigned.`)
        .addFields()  
      
        const srErrEmbed = new Discord.MessageEmbed()
        .setColor('#33a9df')
        .setTitle(`:no_entry: Unable to assign ${args.join(' ')}.`)
        .addFields()  
    
        if (!args.join(' ')) return message.channel.send(srErrEmbed);
      
        if (!guildRole) return message.channel.send(srErrEmbed);
        
        else {
        let authorS = message.member;
        authorS.roles.add(guildRole).then(message.channel.send(srEmbed));
        }

    break;

    case "nrole":

        let memberRole = message.member.roles.cache.find(r => r.name == args.join(' '));
  
        const nrEmbed = new Discord.MessageEmbed()
        .setColor('#33a9df')
        .setTitle(`:white_check_mark: Role: '${args.join(' ')}' successfully removed.`)
 
        const nrErrEmbed = new Discord.MessageEmbed()
        .setColor('#33a9df')
        .setTitle(`:no_entry: Unable to assign role: '${args.join(' ')}'.`)

        if (!args.join(' ')) throw message.channel.send(nrErrEmbed);

        if (!memberRole) throw message.channel.send(nrErrEmbed); 
        
        else {
        let authorN = message.member;
        authorN.roles.remove(memberRole).then(message.channel.send(nrEmbed));  
        }

    break;

    case "arole":

        const aRoleName = args.slice(1).join(' ');

        let aGuildRole = message.guild.roles.cache.find(r => r.name == aRoleName);

        const arEmbed = new Discord.MessageEmbed()
        .setColor('#33a9df')
        .setTitle(`:white_check_mark: ${aRoleName} assigned to ${users.tag}.`)
        .addFields()  
      
        const arErrEmbed = new Discord.MessageEmbed()
        .setColor('#33a9df')
        .setTitle(`:no_entry: Unable to assign ${aRoleName} to ${users.tag}.`)
        .addFields() 

        const arPermsEmbed = new Discord.MessageEmbed()
        .setColor('#33a9df')
        .setTitle(`:no_entry: Invalid permissions.`)
        .setTimestamp()

        if (!aGuildRole) return message.channel.send(arErrEmbed);  
        
        if (!message.member.hasPermission(['MANAGE_ROLES'])) return message.channel.send(arPermsEmbed);

        else {tagged.roles.add(aGuildRole).then(message.channel.send(arEmbed))};

    break;

    case "invite":

        const invite = message.channel.createInvite();

        const invEmbed = new Discord.MessageEmbed()
        .setColor('#33a9df')
        .setTitle(`:link: Invite created - ${invite}`)
        .setDescription('Expires - 1 Day')
      
        await message.channel.send(invEmbed); 

    break;

    case "nick":

      const nickn = args.slice(1).join(' ');

      const nickEmbed = new Discord.MessageEmbed()
      .setColor('#33a9df')
      .setTitle(`:label: Nickname changed for ${users.tag}:`)
      .setDescription('Nickname changed to: ' + '`' + nickn + '`')

      const nickLengthErrEmbed = new Discord.MessageEmbed()
      .setColor('#33a9df')
      .setTitle(`:warning: Nickname must be 32 characters or less in length.`)
      .setDescription('Length of input: ' + '`' + nickn.length + '`')

      const nickAuthEmbed = new Discord.MessageEmbed()
      .setColor('#33a9df')
      .setTitle(`:label: Nickname changed:`)
      .setDescription('Your nickname was changed to: ' + '`' + nickn + '`')

      if(!tagged) {message.member.setNickname(nickn).then(message.channel.send(nickAuthEmbed))}

      if(nickn.length > 32) throw message.channel.send(nickLengthErrEmbed);

      else {tagged.setNickname(nickn).then(message.channel.send(nickEmbed))};

    break;

    case "define":

        const querystring = require('querystring');

	      const phrase = querystring.stringify({ term: args.join(' ') });
        const { list } = await fetch(`https://api.urbandictionary.com/v0/define?${phrase}`).then(response => response.json());

        if (!list.length) return message.channel.send(`No results found.`);

        if (!args.join(' ')) {
        const defnoEmbed = new Discord.MessageEmbed()
        .setColor('#33a9df')
        .setTitle(`:warning: Please enter in a valid word/phrase to define.`)
        .setTimestamp()
        return message.channel.send(defnoEmbed);
        }
  
        else {
        const defEmbed = new Discord.MessageEmbed()
        .setColor('#33a9df')
        .setTitle(`Urban Dictionary - Definition of ${args.join(' ')} :book: :pencil2:`)
        .setDescription(list[0].definition)
        .setThumbnail('https://i.imgur.com/3H9s3IZ.png')
        .setTimestamp()

        await message.channel.send(defEmbed);
        }

    break;

    case "calc":

        const math = require('mathjs');

        const calculateEmbed = new Discord.MessageEmbed()
        .setColor('#33a9df')
        .setTitle(`:1234: ${math.evaluate(args[0])}`)
        .setTimestamp()

        await message.channel.send(calculateEmbed);

    break;

    case "warn":

        const warnReason = args.slice(1).join(' ');
        var reason = '';

        if(!warnReason) {reason = 'Reason unspecified.'}
        else {reason = warnReason}

        const warnEmbed = new Discord.MessageEmbed()
        .setColor('#33a9df')
        .setTitle(`:warning: | User: ${users.tag} Warned`)
        .setFooter(`Reason: ${warnReason}`, users.displayAvatarURL({ format: 'png' }))

        const warnDmEmbed = new Discord.MessageEmbed()
        .setColor('#33a9df')
        .setTitle(`:warning: You were warned in ${message.guild.name}. Reason: ${reason}`)

        const warnlogEmbed = new Discord.MessageEmbed()
        .setColor('#33a9df')
        .setFooter(`User ${users.username} warned by ${message.author.username}`, message.author.displayAvatarURL({ format: 'jpg' }))

        const warnPermsEmbed = new Discord.MessageEmbed()
        .setColor('#33a9df')
        .setTitle(`:no_entry: Invalid permissions.`)
        .setTimestamp()

        if (!message.member.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS'])) return message.channel.send(warnPermsEmbed);

        else {
        await message.channel.send(warnEmbed);
        tagged.send(warnDmEmbed).then(message.guild.systemChannel.send(warnlogEmbed));
        }

    break;

    case "kick":

        const kickReason = args.slice(1).join(' ');
    
        const kickEmbed = new Discord.MessageEmbed()
        .setColor('#33a9df')
        .setTitle(`:foot: | User: ${users.tag} Kicked`)
        .setFooter(`Reason: ${kickReason}`, users.displayAvatarURL({ format: 'png' }))
    
        const kickDmEmbed = new Discord.MessageEmbed()
        .setColor('#33a9df')
        .setTitle(`:foot: You were kicked from ${message.guild.name}.`)
        .setDescription(`Reason: ${kickReason}`)
        .setTimestamp()
    
        const kickPermsEmbed = new Discord.MessageEmbed()
        .setColor('#33a9df')
        .setTitle(`:no_entry: Invalid permissions.`)
        .setTimestamp()
    
        if (message.member.hasPermission('KICK_MEMBERS')) {
        await message.channel.send(kickEmbed).then(
        users.send(kickDmEmbed).then(tagged.kick(kickReason)));
        }
    
        if (!message.member.hasPermission('KICK_MEMBERS')) {
        message.channel.send(kickPermsEmbed);
        }    

    break;

    case "ban":

        const banReason = args.slice(1).join(' ');
    
        const banEmbed = new Discord.MessageEmbed()
        .setColor('#33a9df')
        .setTitle(`:hammer: | User: ${users.tag} Banned`)
        .setFooter(`Reason: ${banReason}`, users.displayAvatarURL({ format: 'png' }))
    
        const BanDmEmbed = new Discord.MessageEmbed()
        .setColor('#33a9df')
        .setTitle(`:hammer: You were banned from ${message.guild.name}.`)
        .setDescription(`Reason: ${banReason}`)
        .setTimestamp()
    
        const bpermsEmbed = new Discord.MessageEmbed()
        .setColor('#33a9df')
        .setTitle(`:no_entry: Invalid permissions.`)
        .setTimestamp()
    
        if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send(bpermsEmbed);
       
        message.channel.send(banEmbed).then(users.send(BanDmEmbed).then(tagged.ban()));

    break;

    case "clean":

        const delAmt = parseInt(args[0], 10);

        const cleanupEmbed = new Discord.MessageEmbed()
        .setColor('#33a9df')
        .setTitle(`:wastebasket: | Deleted **${delAmt}** Messages. `)

        const cleanNoticeEmbed = new Discord.MessageEmbed()
        .setColor('#33a9df')
        .setTitle(`:wastebasket: Deleted **${delAmt}** Messages in ${message.channel.name}`)
        .setFooter(`Initiated by: ${message.author.tag}`, message.author.displayAvatarURL())
          
        const cleanupErrEmbed = new Discord.MessageEmbed()
        .setColor('#33a9df')
        .setTitle(`**Invalid Parameters. Check to see if you chose an integer between 1-100** :no_entry_sign:`)
    
        const cleanupPermsEmbed = new Discord.MessageEmbed()
        .setColor('#33a9df')
        .setTitle(`**Invalid Permissions.** :no_entry_sign:`)
    
        if (!message.member.hasPermission(['MANAGE_MESSAGES'])) return message.channel.send(cleanupPermsEmbed); 
    
        if(!delAmt || delAmt < 2 || delAmt > 100) return message.reply(cleanupErrEmbed);

        else {
        const fetched = await message.channel.messages.fetch({limit: delAmt});
        message.channel.bulkDelete(fetched)
        .then(message.channel.send(cleanupEmbed))
        .then(message.guild.systemChannel.send(cleanNoticeEmbed));
        }

    break;

    case "erase":

      const eraseEmbed = new Discord.MessageEmbed()
      .setColor('#33a9df')
      .setTitle(':wastebasket: Successfully Deleted 10 Messages Containing String: `' + args.join(' ') + '`')
      .setTimestamp()

      message.channel.messages.fetch({limit: 100})
      .then((messages) => {
       message.channel.bulkDelete(messages.filter(m => m.content.includes(args.join(' '))).array().slice(0, 10))
      .then(message.channel.send(eraseEmbed))
      });

    break;  

    case "wipe":
    
        if(!message.member.hasPermission('MANAGE_CHANNELS')) return
        
        else {
        const channelName = message.channel.name;
        message.guild.channels.create(channelName).then(message.channel.delete())
        }
  
    break;

    case "embed":

        const embEmbed = new Discord.MessageEmbed()
        .setColor('#33a9df')
        .setTitle(args.join(' '))
        .setFooter(`message sent by ${message.author.username}`, message.author.displayAvatarURL({ format: 'jpg' }))
    
        await message.channel.send(embEmbed);

    break;

    case "ping":

        const pingEmbed = new Discord.MessageEmbed()
        .setColor('#33a9df')
        .setTitle(`**Pong!** :signal_strength: Latency: ${Date.now() - message.createdTimestamp - 800}ms.`)
        .setTimestamp()

        await message.channel.send(pingEmbed);

    break;

    case "s":

      const statusEmbed = new Discord.MessageEmbed()
      .setColor('#33a9df')
      .setTitle(`:green_circle: Bot is online.`)
      .setDescription(`:signal_strength: API Latency: ${Date.now() - message.createdTimestamp - 800}ms.`)
      .setTimestamp()

      await message.channel.send(statusEmbed);

    break;

  }

});
client.login(config.token);
