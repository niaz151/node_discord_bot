const Discord = require('discord.js');
const auth = require('./auth.json');
const request = require('request');
const client = new Discord.Client();


  
/* ##########  GLOBAL VARS ##########  */
  
var ganks_top = 0
var ganks_mid = 0
var ganks_bot = 0


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});


client.on('message', msg => {

  const args = msg.content.slice(1).split(' ');
  const command = args.shift().toLowerCase();
  
  /* ########## DIE ROLL ##########  */

  if(command === 'die-roll') {
    var number = Math.round(Math.random() * 6)
    msg.reply(number)
  }

  /* ########## JOKE ##########  */
  
  if (command === 'joke'){

    const endpoint = 'https://icanhazdadjoke.com/'

    var options = {
      url: endpoint,
      headers:{
        'Accept': 'application/json'
      }
    }

    function callback(error,response,body){
      info = JSON.parse(body)
      msg.reply(info.joke)
    }

    request(options,callback)
  }

  /* ########## GIFS ##########  */
  
  if(command === 'gif'){

    if(args.length === 0){
      msg.reply("Missing search query")
    }

    const base = "http://api.giphy.com/v1/gifs/search?"
    var query = args.join("+") 
    var api_key = auth.gif_token 
    var limit = 30
    var endpoint =  base+"q="+query+"&"+"api_key="+api_key+"&"+"limit="+limit

    var index = Math.round(Math.random() * limit)

    request(endpoint, (error,response,body) => {
      var info = JSON.parse(body)
      var img = info.data[index].images.original.url
      msg.channel.send(img)
    })
  }


  /* ########## OW STATS ##########  */

  if(command === 'ow-sr'){

    if(args.length === 0){
      msg.reply("Missing search query")
    }

    const base = "https://ow-api.com/v1/stats/pc/us/"
    var username = args[0]
    var endpoint = base+username+"/profile"

    request(endpoint, (erorr,response,body) => {

      var info = JSON.parse(body)
      var tank_sr = info['ratings'][0]['level']
      var dps_sr = info['ratings'][1]['level']      
      var healer_sr = info['ratings'][2]['level']

      msg.channel.send(
        'Tank: ' + tank_sr + "\n" +
        'Damange: ' + dps_sr + "\n" + 
        'Healer: ' + healer_sr + "\n" 
      )
    })
  }


})

client.login(auth.bot_token)