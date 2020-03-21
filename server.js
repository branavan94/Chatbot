'use strict';
const express = require ('express') ;
const bodyParser = require('body-parser');
const server = express();
const conf= require('./config');
const FBeamer = require('./FBeamer');
const PORT = process .env. PORT || 3000;
const f = new FBeamer(conf.FB);
const api = require('./Musicapi/index.js');
const matcher = require('./matcher');
// Register the webhooks
server.get('/', (req, res) => {
	return f.registerHook(req, res);
});
// Receive all incoming messages
server.use(express.json());
server.post('/',
	((req, res, next) => {
		return f.incoming(req,res, async data =>{
			 matcher(data.content, async cb => {
				switch(cb.intent){
					    case "Hello":
          					await f.txt(data.sender,`${cb.entities.greeting} dear user !`);
          					break;
          				case "WhoMadeTrack":
          					await api.findmusic(cb.entities.track).then((result) => {
          						var response = "Let me make you some suggestions about your music. Here are the artists that I found on the internet:\n"
          						var data = ""
          						for (var i = 0; i < result.name.length; i++)
          						{
          							var str = result.artist[i]
          							var str1 = " made "
          							var str2 = result.name[i]
          							var str3 = "\n";
          							data = data.concat(str,str1,str2,str3)
          						}
          						var answer = response.concat(data);
          						f.txt(data.sender,answer);
								console.log(answer)
          					})
          					.catch(error => {
            									console.log(error)
          									})
          					break;

				}

			})
			 //await f.txt(data.sender,data.content);
			

	});
	}));
server.listen(PORT,() => console.log(`The bot server is running on port ${PORT}`));
//Find from music name
//DONT FORGER TO REPLACE AND TRIM INPUT

var input = {artist : "Lana Del Rey",
			album : "Norman Fucking Rockwell",
			track : "Love"}
input.artist = input.artist.replace(/ /g,"%20").trim();
input.album = input.album.replace(/ /g,"%20").trim();
input.track = input.track.replace(/ /g,"%20").trim();
api.findmusic("hi").then((result) => {});
api.findalbum("hi").then((result) => {});
api.datealbum(input).then((result) => {});
api.infomusic(input).then((result) => {});
api.infoartist(input.artist).then((result)=> {});
api.recommendation(input.artist).then((result => {}));
api.topartist().then((result => {}));
api.toptrack().then((result => {}));