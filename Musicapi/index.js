const api = require('./functions.js')

module.exports.findmusic = async name => await api(`/2.0/?method=track.search&track=${name}&limit=5&api_key=bbc37f76eabbc9c12c5269605bc9e928&format=json`).then((data) => {
	const response = {
		statusCode: 200,
		body: JSON.stringify(data),
	};
	var artist = [];
	var name = [];
	var images = [];
	var result = JSON.parse(response.body);
	result = result.results.trackmatches.track;
	result.forEach(obj =>{
	artist.push(obj.artist);
	name.push(obj.name);
	images.push(obj.image);

	});
	return ({artist,name,images});
});

module.exports.findalbum = async album => await api(`/2.0/?method=album.search&album=${album}&limit=4&api_key=bbc37f76eabbc9c12c5269605bc9e928&format=json`).then((data) => {
	const response = {
		statusCode: 200,
		body: JSON.stringify(data),
	};
	var artist = [];
	var name = [];
	var images = [];
	var result = JSON.parse(response.body);
	result = result.results.albummatches.album;
	result.forEach(obj =>{
	artist.push(obj.artist);
	name.push(obj.name);
	images.push(obj.image);
});

	return ({artist,name,images});
});
module.exports.datealbum = async input => await api(`/2.0/?method=album.getInfo&artist=${input.artist}&album=${input.album}&limit=4&api_key=bbc37f76eabbc9c12c5269605bc9e928&format=json`).then((data) => {
	const response = {
		statusCode: 200,
		body: JSON.stringify(data),
	};
	var artist = [];
	var name = [];
	var images = [];
	var result = JSON.parse(response.body);
	result = result.results
	return result;
});



/*

	result.forEach(obj =>{
	artist.push(obj.artist);
	name.push(obj.name);
	images.push(obj.image);

	});
	*/





//bbc37f76eabbc9c12c5269605bc9e928