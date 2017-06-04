const
    apiRequest = require('../apiRequest'),
    loadAlbumDetails = require('./loadAlbumDetails'),
    loadAlbumTracks = require('./loadAlbumTracks'),
    config = require('../config');



const resolve = function(response) {
    console.log('api.loadAlbum.resolve', response);
    return {
        album: response[0],
        tracks: response[1]
    };
}



const reject = function(response) {
    console.error('api.loadAlbum.reject', response);
    return Error();
}



const loadAlbum = function(session, album) {
    return Promise.all([
        loadAlbumDetails(session, album),
        loadAlbumTracks(session, album)
    ]).then(
        resolve,
        reject
    )
}



module.exports = loadAlbum;
