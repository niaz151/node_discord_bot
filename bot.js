const Discord = require('discord.js');
const auth = require('./auth.json');
const request = require('request');
const client = new Discord.Client();

var ganks_top = 0
var ganks_mid = 0
var ganks_bot = 0


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});


client.on('message', msg => {
  if(msg.content === '!die-roll') {
    var number = Math.round(Math.random() * 6)
    msg.reply(number)
  }
})


client.on('message', msg => {
  
  const args = msg.content.slice(1).split(' ');
  const command = args.shift().toLowerCase();
  const endpoint = 'https://icanhazdadjoke.com/'

  if (command === 'joke'){

    var options = {
      url: endpoint,
      headers:{
        'Accept': 'application/json'
      }
    }

    function callback(error,response,body){
      info = JSON.parse(body)
      console.log(info.joke)
      msg.reply(info.joke)
    }

    request(options,callback)
  }
})

client.login(auth.token)