## Discord Bot Utilizing Node.js ##

A pure Node.JS application currently hosted via AWS EC2 and available for download on Discord 


### General Features ###


**Jokes** 

Command: ```!joke```

Makes a request to [this](https://icanhazdadjoke.com/api) api and returns a random joke


**Gif Request**

Command: ```!gif keyword```

Makes a request to [this](https://developers.giphy.com/) api ( also used by Facebook Messenger and iMessage ) and retuns a gif associated with the user-provided keyword


**Die Roll**

Command: ```!die-roll```

A simple 1-6 random number generation tool


### Game Specific Features ###


**League of Legends Summoner Spell Tracking**

Command: ```!track champion first-letter-of-summoner-spell```

Sends a message to the user once the summoner spell is for use to the specified enemy champion, assuming the command was entered as soon as the spell was used


**League of Legends Gank Counter**

Command: ```!gank first-letter-of-lane```

Updates the daily count for ganks in the specified lane and sends it to the user


**Overwatch Stat Fetcher**

Command: ```!ow-stats battle-net-username```

Returns Skill Rating for each of the three roles in the Overwatch Ranked (assuming the profile is public)
