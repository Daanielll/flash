const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const colours = require("./colours.json");
const { Client, Collection } = require("discord.js");
const { RichEmbed } = require("discord.js")
const bot = new Discord.Client({disableEveryOne: true});
const token = process.env.BOT_TOKEN;
let srole = "<@&619515952928784393>"
let cooldown = new Set();
let cdseconds = 60;

bot.on("ready", () => {
    console.log(`Bot has started, with ${bot.users.size} users, in ${bot.channels.size} channels of ${bot.guilds.size} Servers.`);
    let myGuild = bot.guilds.get('551449197904265216')
    let mCount = myGuild.memberCount;
  bot.user.setActivity(`אני שונא את ליעד`, {type: 'WATCHING'});     
   
  });
bot.on('guildMemberAdd', member => {
      let avoided = member.guild.members.find(m => m.id === "176276100404477954");
  
  let myGuild = bot.guilds.get('719651237422825472')
    const welcomeChannel = member.guild.channels.find(channel => channel.id === "719651777481539634");
   if(!welcomeChannel) return; 
  
    if(member == avoided)
    {     
      avoided.kick();
      let embed = new RichEmbed()
    .setThumbnail(member.user.displayAvatarURL)
    .setTitle(`${member.user.username}  ברוכים הבאים לשרת!`)
   .setDescription(`לצערנו, אתה לא רצוי בשרת!`)
   .addField('בהצלחה בהמשך!')

   welcomeChannel.send(embed)
   avoided.send(embed)
   
  });

        
})

bot.login(token);


