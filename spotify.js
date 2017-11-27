var Spotify = require('node-spotify-api');

var spotify = new Spotify({
    id: "1bc59474664b451889b03d0060f12b0c",
    secret: "ea2b1978dd8940a1a325883bf77ee5f1"
});

module.exports = spotify;