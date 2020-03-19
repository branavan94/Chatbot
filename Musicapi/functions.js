
const axios = require('axios');
const cheerio = require('cheerio');
const https = require("https");


async function httprequest(url) {
     return new Promise((resolve, reject) => {
        const options = {
            host: 'ws.audioscrobbler.com',
            path: url,
            port: 443,
            method: 'GET'
        };
        const req = https.request(options, (res) => {
          if (res.statusCode < 200 || res.statusCode >= 300) {
                return reject(new Error('statusCode=' + res.statusCode));
            }
            var body = [];
            res.on('data', function(chunk) {
                body.push(chunk);
            });
            res.on('end', function() {
                try {
                    body = JSON.parse(Buffer.concat(body).toString());
                } catch(e) {
                    reject(e);
                }
                resolve(body);
            });
        });
        req.on('error', (e) => {
          reject(e.message);
        });
        // send the request
       req.end();
    });
}

module.exports = httprequest;





/*
function getData(url,callbackData){
  var str = '';
  var options = {
        host: 'ws.audioscrobbler.com',
        path: url
  };

  callback = function(response) {

        response.on('data', function (chunk) {
            str += chunk;
        });

        response.on('end', function () {
          callbackData(str);
        });

        //return str;
  }
  var req = https.request(options, callback).end();
}
module.exports = getData;*/

