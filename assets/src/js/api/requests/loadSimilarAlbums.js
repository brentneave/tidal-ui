const
    apiRequest = require('../apiRequest'),
    loadMultipleSimilarArtists = require('./loadMultipleSimilarArtists'),
    loadMultipleArtistAlbums = require('./loadMultipleArtistAlbums');



const loadSimilarAlbums = function(session, album, artistsLimit, albumsLimit) {

    artistsLimit = artistsLimit || 12;
    albumsLimit = albumsLimit || 1;

    console.log('loadSimilarAlbums', ...arguments);
    return loadMultipleSimilarArtists(session, album.artists, artistsLimit).then(
        (similarArtists) => (
            loadMultipleArtistAlbums(session, similarArtists, albumsLimit)
        )
    )
}



module.exports = loadSimilarAlbums;
