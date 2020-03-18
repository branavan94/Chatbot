const axios = require('axios');
const cheerio = require('cheerio');
const https = require("https");
const fction = require('./functions')

var dataset = [];
https.get('https://ws.audioscrobbler.com/2.0/?method=track.search&track=Halo&limit=5&api_key=bbc37f76eabbc9c12c5269605bc9e928&format=json', function(resp,res) {
  getsomedata(resp, function(result) {
  	console.log(result.results.trackmatches.track);
  });
});

function getsomedata(req, callback) {
	let chunks = [];
req.on('data', function(data) {
  chunks.push(data);
}).on('end', function() {
  let data   = Buffer.concat(chunks);
  let schema = JSON.parse(data);
  return callback(schema);
});
}




/*

const url = "https://api.musixmatch.com/ws/1.1/track.search?format=jsonp&callback=callback&q_track=halo&quorum_factor=1&page_size=1&apikey=876c8bb65945d518ccde585f7a6076e7&fbclid=IwAR06CZfIA_MSGalT8QH86yIr_2B73XKqrhNmgI4jeuwyISr8yXqQ8k4pqo0";

const getWeather = url => {
	return new Promise (async(resolve , reject ) =>{
		try {
const weatherConditions = await axios.get(url) ;
resolve (weatherConditions.data) // returns back the results to the chatbot
}
catch (error) 
	{
	reject (error) ;
	}
}) ;
}
var dataset;
getWeather(url)
  .then(response => {
    dataset = response;
  })
  .catch(error => {
    console.log(colors.red.underline(("An error has occured")));
    console.log(error)
  })     

console.log(dataset);
*/


/*
const options = {
    "method": "GET",
    "hostname": "api.musixmatch.com",
    "port": 443,
    "path": "/ws/1.1/track.search?format=jsonp&callback=callback&q_track=halo&quorum_factor=1&page_size=1&apikey=876c8bb65945d518ccde585f7a6076e7&fbclid=IwAR06CZfIA_MSGalT8QH86yIr_2B73XKqrhNmgI4jeuwyISr8yXqQ8k4pqo0",
}
var data;
const req = https.request(options, function(res) {

    var chunks = [];

    res.on("data", function (chunk) {
        chunks.push(chunk);
    });

    res.on("end", function(callback) {
        var body = Buffer.concat(chunks);
        console.log(body.toString());
        data = body.toString();
    });


});

req.end()

console.log(data)


*/




//bbc37f76eabbc9c12c5269605bc9e928