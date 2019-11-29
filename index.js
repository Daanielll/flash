const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const colours = require("./colours.json");
const bot = new Discord.Client({disableEveryOne: true});
let srole = "<@&619515952928784393>"
let cooldown = new Set();
const token = process.env.BOT_TOKEN;
let cdseconds = 60;

bot.on("ready", () => {
    console.log(`Bot has started, with ${bot.users.size} users, in ${bot.channels.size} channels of ${bot.guilds.size} Servers.`); 
    bot.user.setActivity(`${bot.users.size} Members In FleshGG's Server`, {type: 'WATCHING'});
  });

bot.on("message", async message => {
    if(message.author.bot || message.channel.type === "dm") return;

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ")
    let cmd = messageArray[0].toLowerCase();
    let args = messageArray.slice(1);

    if(cmd === `${prefix}hello`){
        return message.channel.send("Hello")
    }

    if(cmd === `${prefix}help`){
        let sEmbed = new Discord.RichEmbed()
        .setColor(colours.red)
        .setTitle("📃__**פקודות**__📃")
        .setThumbnail(message.guild.iconURL)
        .addField("** **", "**!yt** - שולח קישור לערוץ יוטיוב של פלאש")
        .addField("** **", "**!membercount** - מראה כמה אנשים יש בשרת", true)
        .addField("** **", "**!invite** - שולח קישור לשרת הדיסקורד של פלאש")
        .addField("** **", "**!helpme** - קורא לצוות לעזרה")
        .addField("** **", "**!form** - שולח את הטפסים להצטרפות לצוות", true)
        .setFooter("FleshGG Bot", bot.user.displayAvatarURL)
        message.channel.send({embed: sEmbed});
    }
    if(cmd === `${prefix}invite`){
        let dEmbed = new Discord.RichEmbed()
        .setColor(colours.red)
        .setTitle("** קישור לשרת הדיסקורד: **")
        .addField("Discord" , "https://discord.gg/6Fvbxwc")
        message.channel.send({embed: dEmbed});
    }
    if(cmd === `${prefix}yt`){
        let yEmbed = new Discord.RichEmbed()
        .setColor(colours.red)
        .setTitle("** קישור לערוץ היוטיוב: **")
        .addField("YouTube" , "https://www.youtube.com/channel/UCvVq3ZaBOesSWpCkI048_6Q")
        message.channel.send({embed: yEmbed});
    }
    let mEmbed = new Discord.RichEmbed()
        .setColor(colours.red)
        .setTitle(message.author.username + `** היי**` )
        .addField("** **" , "**הפקודות שלי מתחילות ב - !**")
        .addField("** **", "**אם אתה צריך עזרה מהצוות תכתוב !helpme**")

        if (message.mentions.users.first() === bot.user){
        
        message.channel.send("**Hello **" + message.author + "**\nMy Prefix Is ! \nIf You Nedd Help Type !helpme**")
        }
    
    if(cmd === `${prefix}form`){
        let fEmbed = new Discord.RichEmbed()
        .setColor(colours.red)
        .setTitle("** טופס הצטרפות לצוות **")
        .addField("Google Forms" , "https://forms.gle/qRZQxoCHKJ5KaJ7b6")
        message.channel.send({embed: fEmbed});
    }

    if(cmd === `${prefix}helpme`){
        let reason = args.join(' ');
        if(!reason) reason = "None";
        if(cooldown.has(message.author.id)){
            message.delete();
            return message.reply(" אתה צריך לחכות דקה אחרי בקשת עזרה ")
        } else{
            message.channel.send(`**${srole}, **` + message.author + `** Needs Your Help! \nReason: ${reason}**`)
            cooldown.add(message.author.id);
        }
        setTimeout(() =>{
            cooldown.delete(message.author.id)
        }, cdseconds * 1000)
    }
    
    if(cmd === `${prefix}membercount`){
    message.channel.send(`***!יש ${bot.users.size} אנשים בשרת***`)
    
    }
    
    if(cmd === `${prefix}say`)
            {
        if(!message.member.hasPermission(["ADMINISTRATOR"])) return message.reply("** אתה לא יכול להשתמש בפעולה הזאת **")

        let argsresault;
        let mChannel = message.mentions.channels.first()
  
          message.delete()
          if(mChannel)
          {
              argsresault = args.slice(1).join(" ")
              mChannel.send(argsresault)
          }
          else
          {
              argsresault = args.join(" ")
              message.channel.send(argsresault)
          }
          }
          if(cmd === `${prefix}addrole`){
            if(!message.member.hasPermission(["ADMINISTRATOR"])) return message.reply(" אתה לא יכול להשתמש בפקודה הזאת ")

            let rMember = message.mentions.members.first() || message.guild.members.find(m => m.user.tag === args[0]) || message.guild.members.get(args[0])
            if(!rMember) return message.reply(" לא בחרת משתמש להביא לו את הרול.")
            let role = message.guild.roles.find(r => r.name == args[1]) || message.guild.roles.find(r => r.id == args[1]) || message.mentions.roles.first()
            if (!role) return message.reply(" לא כתבת רול להביא למשתמש.")

           if(!message.guild.me.hasPermission(["ADMINISTRATOR"])) return message.reply(" אין לי גישה לעשות את זה.") 

            if(rMember.roles.has(role.id)) {
                return message.reply(`.${role.name} כבר יש את הרול ${rMember.displayName} למשתמש`)
            } else {
                await rMember.addRole(role.id).catch(e => console.log(e.message))
                message.reply(`.${role.name} קיבל את הרול ${rMember.displayName} המשתמש`)
            
              let grembed = new Discord.embed()
            .setColor(colours.red)
            .setTitle(`**${rMember.user.username} הוספת רול ל**`)
            .setThumbnail(rMember.user.displayAvatarURL)
            .addField("Role Added By: ", message.member.username)
            .addField("Role Added:", role.name)
            .setFooter(`Date: ${message.createdAt.toLocaleString()}`, bot.user.displayAvatarURL)
            let sChannel = message.guild.channels.find(c => c.name === "（🔷）לוג-רולים")
            sChannel.send({embed: grembed})
            }
         }
        let rrembed = new Discord.embed()
            .setColor(colours.red)
            .setTitle(`**${rMember.user.username} הורדת רול ל**`)
            .setThumbnail(rMember.user.displayAvatarURL)
            .addField("Role Removed By: ", message.member.username)
            .addField("Role Removed:", role.name)
            .setFooter(`Date: ${message.createdAt.toLocaleString()}`, bot.user.displayAvatarURL)
            let sChannel = message.guild.channels.find(c => c.name === "（🔷）לוג-רולים")
            
         if(cmd === `${prefix}removerole`){
            if(!message.member.hasPermission(["ADMINISTRATOR"])) return message.reply(" אתה לא יכול להשתמש בפקודה הזאת ")

            let rMember = message.mentions.members.first() || message.guild.members.find(m => m.user.tag === args[0]) || message.guild.members.get(args[0])
            if(!rMember) return message.reply(" לא בחרת משתמש להוריד לו את הרול.")
            let role = message.guild.roles.find(r => r.name == args[1]) || message.guild.roles.find(r => r.id == args[1]) || message.mentions.roles.first()
            if (!role) return message.reply(" לא כתבת רול להוריד למשתמש.")

           if(!message.guild.me.hasPermission(["ADMINISTRATOR"])) return message.reply(" אין לי גישה לעשות את זה.") 

            if(!rMember.roles.has(role.id)) {
                return message.reply(`.${role.name} אין את הרול ${rMember.displayName} למשתמש`)
            } else {
                await rMember.removeRole(role.id).catch(e => console.log(e.message))
                message.reply(`.${role.name} ירד הרול ${rMember.displayName} למשתמש`)
              sChannel.send(rrembed)
             message.channel.send({embed: rrembed});
         }
         }
})

bot.login(token);


