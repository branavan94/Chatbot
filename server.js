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
		f.incoming(req,res, async data =>{
			var result;
			  matcher(data.content, async cb => {
				switch(cb.intent){
          				case "WhoMadeTrack":
          					result = await api.findmusic(cb.entities.track.replace(/ /g,"%20").trim());
          					await f.txt(data.sender,`Well my first guess would be ${result.artist[0]} who sang \"${result.name[0]}\".\n Here are some other suggestions: \n${result.artist[1]} who made ${result.name[1]}\n${result.artist[2]} who made ${result.name[2]}`);
         					break;
         				case "WhoMadeAlbum":
          					result = await api.findalbum(cb.entities.album.replace(/ /g,"%20").trim());
          					await f.txt(data.sender,`Well my first guess would be ${result.artist[0]} who made the album \"${result.name[0]}\".\n Here are some other suggestions: \n-${result.artist[1]} who made ${result.name[1]}\n-${result.artist[2]} who made ${result.name[2]}`);
         					break;
         				case "ReleaseDate":
          					result = await api.datealbum({album : cb.entities.album.replace(/ /g,"%20").trim(),
          													artist : cb.entities.artist.replace(/ /g,"%20").trim()});
          					await f.txt(data.sender,`The album \"${result.name[0]}\" was released on ${result.date[0]} by ${result.artist[0]}.`);
          					await f.img(data.sender,result.images)
         					break;
         				case "InfoTrack":
          					result = await api.infomusic({track : cb.entities.track.replace(/ /g,"%20").trim(),
          													artist : cb.entities.artist.replace(/ /g,"%20").trim()});
          					await f.txt(data.sender,`The music \"${result.name[0]}\" comes from the album ${result.album} by ${result.artist}.\n${result.summary}`);
          					await f.img(data.sender,result.images)
         					break;
         				case "InfoArtist":
          					result = await api.infoartist(cb.entities.artist.replace(/ /g,"%20").trim());
          					await f.txt(data.sender,result.summary);
         					break;
         				case "Recommendation":
          					result = await api.recommendation(cb.entities.artist.replace(/ /g,"%20").trim());
          					await f.txt(data.sender,`Here are some recommendations :\n${result.name[0]}\n${result.name[1]}\n${result.name[2]}`);
         					break;
         				case "Top5Artist":
         					result = await api.topartist();
          					await f.txt(data.sender,`Here are the top 5 artists of the moment :\n${result[0]}\n${result[1]}\n${result[2]}\n${result[3]}\n${result[4]}`);
         					break;
         				case "Top5Track":
         					result = await api.toptrack();
          					await f.txt(data.sender,`Here are the top 5 artists of the moment :\n${result[0]}\n${result[1]}\n${result[2]}\n${result[3]}\n${result[4]}`);
         					break;
         				case "Hello":
          					f.txt(data.sender,`${cb.entities.greeting} dear user !`);
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
api.topartist().then((result => {}));
api.toptrack().then((result => {}));


/*
          					 api.findmusic(cb.entities.track).then((result) => {
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
          					}).catch(error => {console.log(error)})
          					*/