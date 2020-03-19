'use strict';
const express = require ('express') ;
const bodyParser = require('body-parser');
const server = express();
const conf= require('./config');
const FBeamer = require('./FBeamer');
const PORT = process .env. PORT || 3000;
const f = new FBeamer(conf.FB);
const api = require('./Musicapi/index.js');

// Register the webhooks
server.get('/', (req, res) => {
	return f.registerHook(req, res);
});
// Receive all incoming messages
server.use(express.json());
server.post('/',
	((req, res, next) => {
		return f.incoming(req,res, async data =>{
			await f.txt(data.sender,data.content)

	});
	}));
server.listen(PORT,() => console.log(`The bot server is running on port ${PORT}`));

//Find from music name
api.findmusic("baby").then((data) => {
});

