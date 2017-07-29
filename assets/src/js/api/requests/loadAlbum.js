const
    apiRequest = require('../apiRequest'),
    loadAlbumDetails = require('./loadAlbumDetails'),
    loadAlbumTracks = require('./loadAlbumTracks'),
    loadSimilarAlbums = require('./loadSimilarAlbums'),
    config = require('../config');



const resolve = function(response) {

    console.log('api.loadAlbum.resolve', response);
    return {
        album: response[0],
        tracks: response[1],
        similar: response[2]
    }

}



const loadAlbum = function(session, album) {

    // return Promise.all([
    //     loadAlbumDetails(session, album),
    //     loadAlbumTracks(session, album),
    //     loadSimilarAlbums(session, album)
    // ]).then(
    //     resolve,
    //     reject
    // )

    return Promise.all([

        loadAlbumDetails(session, album),
        loadAlbumTracks(session, album)

    ]).then(

        (responses) => ({
            album: responses[0],
            tracks: responses[1]
        })

    ).then((response) => (

        loadSimilarAlbums(session, response.album).then(

            (similar) => ({
                debug: console.log('Similar:', similar),
                album: response.album,
                tracks: response.tracks,
                similar: similar || []
            })

        )

    ))

}



module.exports = loadAlbum;
