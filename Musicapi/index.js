const axios = require('axios');


const getMovie = async link => {
  try {
 	const response = await axios(link);
 	const {data} = response;
 	return data;

} catch (error) {
    console.error(error);
    return [];
  }
}

const test = getMovie("https://api.musixmatch.com/ws/1.1/track.search?format=jsonp&callback=callback&q_track=Let%20me%20love%20you&quorum_factor=1&page_size=1&apikey=876c8bb65945d518ccde585f7a6076e7&fbclid=IwAR06CZfIA_MSGalT8QH86yIr_2B73XKqrhNmgI4jeuwyISr8yXqQ8k4pqo0")

console.log(test)







/*
Give me the song artist for "song_name"
Give me the song name for the following "lyrics"
Most popular track of "artist_name"
Least popular track of "artist_name"
Is there a artist or a song with that "name"
*/