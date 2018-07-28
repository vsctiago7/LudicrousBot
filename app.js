const Discord = require("discord.js");
const Config = require("./config.json");
const Token = require("./token.json");
const fs = require("fs");

const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0) {
    console.log("Could not find command.");
    return;
  }

  jsfile.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.info.name, props);
  });
});

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online! It's running on ${bot.guilds.size} servers.`);
  bot.user.setActivity("Work in Progress", {type: "STREAMING"});
});

bot.on("message", async msg => {
  if(msg.author.bot) return;
  if(msg.channel.type === "dm") return;
  let prefix = Config.prefix;
  let msgArray = msg.content.split(" ");
  let cmd = msgArray[0];
  let args = msgArray.slice(1);
  let cmdFile = bot.commands.get(cmd.slice(prefix.length));
  if(cmdFile) cmdFile.run(bot, msg, args);
});

bot.login(Token.token);
