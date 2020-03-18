<<<<<<< HEAD
'use strict';
const express = require ('express') ;
const bodyParser = require('body-parser');
const server = express();
const conf= require('./config');
const FBeamer = require('./FBeamer');
const PORT = process .env. PORT || 3000;
const f = new FBeamer(conf.FB);


//server.use(Restify.plugins.jsonp());

// Register the webhooks
server.get('/', (req, res) => {
	return f.registerHook(req, res);
});


// Receive all incoming messages
server.use(express.json());
server.post('/',
	((req, res, next) => {
		return f.incoming(req,res, async data =>{
			await f.txt(data.sender,"Hello you sucker !")

	});
	}));
server.listen(PORT,() => console.log(`The bot server is running on port ${PORT}`));
=======
'use strict';
const express = require ('express') ;
const bodyParser = require('body-parser');
const server = express();
const conf= require('./config');
const FBeamer = require('./FBeamer');
const PORT = process .env. PORT || 3000;
const f = new FBeamer(conf.FB);


//server.use(Restify.plugins.jsonp());

// Register the webhooks
server.get('/', (req, res) => {
	return f.registerHook(req, res);
});


// Receive all incoming messages
server.use(express.json());
server.post('/',
	((req, res, next) => {
		return f.incoming(req,res, async data =>{
			await f.txt(data.sender,"Hello you sucker !")

	});
	}));
server.listen(PORT,() => console.log(`The bot server is running on port ${PORT}`));
>>>>>>> 03452f8431af374ce171c2a2a04404b495110abd
