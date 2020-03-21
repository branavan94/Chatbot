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
	var images;
	var date = [];
	var tags;
	var summary = [];
	var result = JSON.parse(response.body);
	result = result.album;
	artist.push(result.artist);
	name.push(result.name);
	images = result.image;
	const keys = Object.values(images[0])
	images = keys[0]
	tags = result.tags;
	date.push(result.wiki.published);
	summary.push(result.wiki.content);
	var tab = summary[0].split("<a");
	var content = tab[0].trim();
	return ({artist,name,images,date,content,tags});
});

module.exports.infomusic = async input => await api(`/2.0/?method=track.getInfo&artist=${input.artist}&track=${input.track}&limit=4&api_key=bbc37f76eabbc9c12c5269605bc9e928&format=json`).then((data) => {
	const response = {
		statusCode: 200,
		body: JSON.stringify(data),
	};
	var artist = [];
	var name = [];
	var images = [];
	var album = [];
	var result = JSON.parse(response.body);
	name.push(result.track.name);
	images = result.track.album.image;
	const keys = Object.values(images[0])
	images = keys[0]
	artist.push(result.track.album.artist);
	album.push(result.track.album.title);
	var content = result.track.wiki.content;
	var tab = content.split('<a');
	var summary = tab[0];
	return ({artist,name,album,summary,images});
});

module.exports.infoartist = async input => await api(`/2.0/?method=artist.getInfo&artist=${input}&limit=4&api_key=bbc37f76eabbc9c12c5269605bc9e928&format=json`).then((data) => {
	const response = {
		statusCode: 200,
		body: JSON.stringify(data),
	};
	var result = JSON.parse(response.body);
	var content = result.artist.bio.summary;
	var tab = content.split('<a');
	var summary = tab[0];
	return ({summary});
});
module.exports.recommendation = async input => await api(`/2.0/?method=artist.getSimilar&artist=${input}&limit=4&api_key=bbc37f76eabbc9c12c5269605bc9e928&format=json`).then((data) => {
	const response = {
		statusCode: 200,
		body: JSON.stringify(data),
	};
	var result = JSON.parse(response.body);
	var name = [];
	result.similarartists.artist.forEach(obj =>{
		name.push(obj.name.toLowerCase());
	});
	return ({name});
});
module.exports.topartist = async () => await api(`/2.0/?method=chart.getTopArtists&limit=5&api_key=bbc37f76eabbc9c12c5269605bc9e928&format=json`).then((data) => {
	const response = {
		statusCode: 200,
		body: JSON.stringify(data),
	};
	var result = JSON.parse(response.body);
	var name = [];
	result.artists.artist.forEach(obj =>{
		name.push(obj.name.toLowerCase());
	});
	return name;
});

module.exports.toptrack = async () => await api(`/2.0/?method=chart.getTopTracks&limit=5&api_key=bbc37f76eabbc9c12c5269605bc9e928&format=json`).then((data) => {
	const response = {
		statusCode: 200,
		body: JSON.stringify(data),
	};
	var result = JSON.parse(response.body);
	var name = [];
	result.tracks.track.forEach(obj =>{
		name.push(obj.name.toLowerCase());
	});
	return (name);
});



//bbc37f76eabbc9c12c5269605bc9e928

/*	*/