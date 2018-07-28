const Discord = require("discord.js");

module.exports.run = async (bot, msg, args) => {
  msg.channel.send("Command Handler test. Hi!");
};

module.exports.info = {
  name: "test"
};
