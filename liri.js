// TODO
// 1. randomizer - execute the line in the file instead of console.log it
// 2. twitter - limit the console.log to 20 tweets



// Include the following packages
var client = require("./keys.js");
var spotify = require("./spotify.js")
var request = require("request");
var fs = require("fs");

// ================================================


// TWITTER
if (process.argv[2].toLowerCase() === "my-tweets") {
    var params = { screen_name: 'msherman8383' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            tweets.forEach(tweet => {
                console.log(tweet.text + " - " + tweet.created_at);
            });
        }
    });
}


// SPOTIFY
let songQuery = process.argv[3];

if (process.argv[2].toLowerCase() === "spotify-this-song") {
    spotify.search({ type: 'track', query: songQuery }, function (err, data) {
        if (err) {
            spotify
                .request("https://api.spotify.com/v1/tracks/0hrBpAOgrt8RXigk83LLNE")
                .then(function (data) {
                    console.log(data.album.artists[0].name);
                    console.log(data.name);
                    console.log("https://api.spotify.com/v1/tracks/0hrBpAOgrt8RXigk83LLNE");
                    console.log(data.album.name);
                })
                .catch(function (err) {
                    console.error('Error occurred: ' + err);
                });
        } else {
            console.log(data.tracks.items[0].album.artists[0].name);
            console.log(data.tracks.items[0].name);
            console.log(data.tracks.items[0].preview_url);
            console.log(data.tracks.items[0].album.name);
        }
    });
}


// OMDB MOVIE MAGIC
let movieName = process.argv[3];
let queryUrl = "http://www.omdbapi.com/?t=" + process.argv[3] + "&y=&plot=short&apikey=40e9cece";

if (process.argv[2].toLowerCase() === "movie-this")
    request(queryUrl, function (error, response, body) {

        if (!error && response.statusCode === 200) {
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            // console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
        }
    });


// LIRI RANDOM COMMAND GENERATOR
if (process.argv[2].toLowerCase() === "do-what-it-says") {
    fs.readFile("./random.txt", "utf8", function (error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }

        var lines = data.split("\n");
        var randomLine = lines[Math.floor(Math.random() * lines.length)];


        console.log(randomLine);

    });
}


// fs.writeFile('dump.json', JSON.stringify(data, null, 2), 'utf8', err => {
//     if (err) console.log(err);
// });