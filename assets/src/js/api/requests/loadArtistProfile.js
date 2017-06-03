const
    apiRequest = require('../apiRequest'),
    loadArtistDetails = require('./loadArtistDetails'),
    loadArtistAlbums = require('./loadArtistAlbums'),
    loadSimilarArtists = require('./loadSimilarArtists'),
    config = require('../config');



const resolve = function(response) {
    console.log('api.loadArtistProfile.resolve', response);
    return {
        details: response[0],
        albums: response[1],
        similar: response[2]
    };
}



const reject = function(response) {
    console.error('api.loadArtistProfile.reject', response);
    return Error();
}



const loadArtistProfile = function(session, artist) {
    return Promise.all([
        loadArtistDetails(session, artist),
        loadArtistAlbums(session, artist),
        loadSimilarArtists(session, artist)
    ]).then(
        resolve,
        reject
    )
}



module.exports = loadArtistProfile;
