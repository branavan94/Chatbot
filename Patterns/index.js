//Pattern dictionnary
const patternDict = [
	{
		pattern : "\\b(who) (made|sing) (the) (track|song) (?<track>.+)\\b",
		intent : "WhoMadeTrack"
	},
	{
		pattern : "\\b(who) (made|sing) (the) (album) (?<album>.+)\\b",
		intent : "WhoMadeAlbum"
	},
	{
		pattern : "\\b(when was released|release date of) (?<album>.+) (from) (?<artist>.+)\\b",
		intent : "ReleaseDate"
	},
	{
		pattern : "\\b(give me|do you have|any) (informations|some informations|info|summary|description) (about|on|of) (?<track>.+) (from) (?<artist>.+)\\b",
		intent : "InfoTrack"
	},
	{
		pattern : "\\b(who is) (?<artist>.+)\\b",
		intent : "InfoArtist"
	},
	{
		pattern : "\\b(give me|do you have) (recommendations|some recommendations|similarity) (that look like|like) (?<artist>.+)\\b",
		intent : "Recommendation"
	},
	{
		pattern : "\\b(top 5 artist)\\b",
		intent : "Top5Artist"
	},
	{
		pattern : "\\b(top 5 tracks)\\b",
		intent : "Top5Track"
	},
	{
		pattern : "\\b(?<greeting>Hi|Hello|Hey)\\b",
		intent : "Hello"
	}
];
module.exports = patternDict;