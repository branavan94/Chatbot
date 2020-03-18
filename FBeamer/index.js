'use strict ';
const request = require('request');
const crypto = require('crypto');
class FBeamer {

	constructor(config) {
		try {
			if (!config || config.PAGE_ACCESS_TOKEN === undefined || config.VERIFY_TOKEN === undefined || config.APP_SECRET === undefined) {
				throw new Error("Unable to access tokens!");
			} else {
				this.PAGE_ACCESS_TOKEN = config.PAGE_ACCESS_TOKEN;
				this.VERIFY_TOKEN = config.VERIFY_TOKEN;
				this.APP_SECRET = config.APP_SECRET;
			}
		} catch (e) {
			console.log(e);
		}
	}
	registerHook(req , res) {
		const  params = req.query;
		const  mode = params['hub.mode'],
		token = params['hub.verify_token'],
		challenge = params['hub.challenge'];
		console.log(mode,token,challenge);
		try {
			if (mode === 'subscribe' && token === this.VERIFY_TOKEN) { 
				return  res.send(challenge);
			} 
			else {
				throw "Could  not  register  webhook!";
				return  res.sendStatus(200);
			}
		} catch(e) {
			console.log(e);
		}
	}
		verifySignature(req, res, next) {
		let rawData = '';

		req.on('data', function(data) {
			rawData += data;
		});

		req.on('end', () => {
			
		});
		return next();
	}

	subscribe() {
		request({
			uri:'',
			qs: {
				access_token: this.PAGE_ACCESS_TOKEN
			},
			method: 'POST'
		}, (error, response, body) => {
			if (!error && JSON.parse(body).success) {
				console.log("Subscribed to the page!");
			} else {
				console.log(error);
			}
		});
	}

	incoming(req, res, cb) {
		// Extract the body of the POST request
		res.sendStatus(200);
		if(req.body.object  === 'page' && req.body.entry) 
		{
			return cb(this.messageHandler(req.body.entry[0]));	
		
		//let  data = this.messageHandler(req.body.entry);	
	}
}
	messageHandler(obj)
	{
		let sender = obj.messaging[0].sender.id;
		let message = obj.messaging[0].message;
		if(message.text){
			let obj = {
				sender,
				type : 'text',
				content : message.text
			}
			return obj;
		}
	}

	sendMessage(payload) {
		return new Promise((resolve, reject) => {
			// Create an HTTP POST request
			request({
				uri: 'https://graph.facebook.com/v2.6/me/messages',
				qs: {
					access_token: this.PAGE_ACCESS_TOKEN
				},
				method: 'POST',
				json: payload
			}, (error, response, body) => {
				if (!error && response.statusCode === 200) {
					resolve({
						messageId: body.message_id
					});
				} else {
					reject(error);
				}
			});
		});
	}

	// Send a text message
	txt(id, text, messaging_type = 'RESPONSE') {
		let obj = {
			messaging_type,
			recipient: {
				id
			},
			message: {
				text
			}
		}

		return this.sendMessage(obj);
	}

	// Send an image message
	img(id, url, messaging_type = 'RESPONSE') {
		let obj = {
			messaging_type,
			recipient: {
				id
			},
			message: {
				attachment: {
					type: 'image',
					payload: {
						url
					}
				}
			}
		}

		this.sendMessage(obj)
			.catch(error => console.log(error));
	}

}









module.exports = FBeamer ;
