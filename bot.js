const Discord = require('discord.js');
const auth = require('./auth.json');
const request = require('request');
const client = new Discord.Client();


  
/* ##########  GLOBAL VARS ##########  */
  
var ganks_top = 0
var ganks_mid = 0
var ganks_bot = 0
var date = new Date().getDate()

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});


client.on('message', msg => {

  // ONLY TAKE COMMANDS STARTING WITH ! AND IGNORE MESSAGES FROM BOT ITSELF
  if (!msg.content.startsWith('!') || msg.author.bot) return;

  // SPLIT INPUT INTO ARGS AND INITIAL COMMAND
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

    // IF MISSING QUERY
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


   /* ########## LEAGUE OF LEGENDS GANKS ##########  */
  
   if(command === 'gank'){

    // IF MISSING LANE 
    if(args.length === 0){
      msg.reply('Missing lane description')
    }
    
    // IF INVALID LANE 
    var options = ['t','m','b']
    if(! options.includes(args[0])){
      msg.reply('Enter a valid lane abbreviation')
    }

    else{

      // DAILY RESET 
      var today = new Date().getDate()
      if(today != date){
        ganks_top = 0
        ganks_mid = 0
        ganks_bot = 0
      }

      switch(args[0]){

        case 't':
          ganks_top += 1
          msg.channel.send("Ganks Top: " + ganks_top)
          break;
  
        case 'm':
          ganks_mid += 1
          msg.channel.send("Ganks Mid: " + ganks_mid)
          break;
  
        case 'b': 
          ganks_bot += 1
          msg.channel.send("Ganks Bot: " + ganks_bot)
          break;
  
        default:
          break;
      }  
    }
   }


   if(command === 'track'){

    // IF MISSING BOTH ARGUEMENTS
    if(args.length === 0){
      msg.reply("Missing champion name and summoner spell name")
    }
   
   // IF MISSING SUMMONER SPELL ARGUEMENT
   if(args.length === 1){
     msg.reply("Missing summoner spell name")
   }

   // IF INVALID SUMMONER SPELL ARGUEMENT
   var options = ['f','e','i','h']
   if (!options.includes(args[1])){
     msg.reply("Enter a valid summoner spell name")
   }

  }

   switch(args[1]){

    case 'f':
      var time = 300000
      setTimeout( () => msg.reply(args[0] + " flash is now live"),time)
      break;

    case 'h':
        var time = 240000
        setTimeout( () => msg.reply(args[0] + " heal is now live"), time)
        break;

    case 'e':
      var time = 210000
      setTimeout( () => msg.reply(args[0] + " exhaust is now live"),time)
      break;

    case 'i':
      var time = 180000
      setTimeout( () => msg.reply(args[0] + " ignite is now live"),time)
      break;
   
    default:
      break;
  }

  /* ########## OVERWATCH STATS ##########  */

  if(command === 'ow-sr'){

    // IF MISSING USERNAME
    if(args.length === 0){
      msg.reply("Missing username")
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