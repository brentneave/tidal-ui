const
    loadFavoriteAlbums = require('./loadFavoriteAlbums'),
    loadFavoriteArtists = require('./loadFavoriteArtists'),
    loadMultipleSimilarArtists = require('./loadMultipleSimilarArtists'),
    _array = require('lodash/array');

// module.exports = function(session, artistsLimit) {
//     artistsLimit = artistsLimit ? artistsLimit : 2;
//
//     return loadFavoriteArtists(session)
//         .then(
//             function(artists) {
//                 return loadMultipleSimilarArtists(session, artists, artistsLimit);
//             }
//         );
// }









const loadRecommendedArtists = (session, artistsLimit, numArtists) => (

    loadFavoriteAlbums(session).then(

        (albums) => albums.map((album) => album.artist)

    ).then(

        (albumArtists) => loadFavoriteArtists(session).then(

            (artists) => _array.uniqBy(
                artists.concat(albumArtists),
                'id'
            ).slice(0, numArtists || 24)

        )

    ).then((artists) => (

        loadMultipleSimilarArtists(session, artists, artistsLimit || 1)

    ))


)



module.exports = loadRecommendedArtists;
