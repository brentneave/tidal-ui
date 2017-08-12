const
    loadLatestAlbums = require('./loadLatestAlbums'),
    loadFavoriteArtists = require('./loadFavoriteArtists'),
    loadMultipleSimilarArtists = require('./loadMultipleSimilarArtists'),
    loadMultipleArtistAlbums = require('./loadMultipleArtistAlbums'),
    loadFavoriteAlbums = require('./loadFavoriteAlbums'),
    loadSimilarAlbums = require('./loadSimilarAlbums'),
    _array = require('lodash/array');



const loadRecommendedAlbums = function(session, artistsLimit, albumsLimit, numAlbums) {

    artistsLimit = artistsLimit || 1;
    albumsLimit = albumsLimit || 1;
    numAlbums = numAlbums || 32;

    return loadFavoriteAlbums(session).then(

        (albums) => (
            Promise.all(
                albums
                .slice(0, numAlbums)
                .map(
                    (album) => loadSimilarAlbums(session, album, artistsLimit, albumsLimit)
                )
            )
        )

    ).then(

        (responses) => _array.uniqBy(
            responses.reduce((a, b) => a.concat(b)),
            'id'
        )

    )

}





module.exports = loadRecommendedAlbums;
