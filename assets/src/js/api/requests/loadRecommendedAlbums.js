const
    loadLatestAlbums = require('./loadLatestAlbums'),
    loadFavoriteArtists = require('./loadFavoriteArtists'),
    loadMultipleSimilarArtists = require('./loadMultipleSimilarArtists'),
    loadMultipleArtistAlbums = require('./loadMultipleArtistAlbums'),
    loadFavoriteAlbums = require('./loadFavoriteAlbums'),
    loadSimilarAlbums = require('./loadSimilarAlbums'),
    _array = require('lodash/array');

// const loadRecommendedAlbums = function(session, artistsLimit, albumsLimit) {
//     artistsLimit = artistsLimit ? artistsLimit : 2;
//     albumsLimit = albumsLimit ? albumsLimit : 1;
//
//     return loadFavoriteArtists(session).then(
//         function(artists) {
//             return loadMultipleSimilarArtists(session, artists, artistsLimit).then(
//                 function(similarArtists) {
//                     return loadMultipleArtistAlbums(session, artists.concat(similarArtists), albumsLimit);
//                 }
//             );
//         }
//     );
//
// }


// const loadRecommendedAlbums = function(session, artistsLimit, albumsLimit) {
//
//     artistsLimit = artistsLimit ? artistsLimit : 2;
//     albumsLimit = albumsLimit ? albumsLimit : 1;
//
//     return loadFavoriteArtists(session).then((artists) => (
//         loadMultipleSimilarArtists(
//             session,
//             artists,
//             artistsLimit
//         )
//     )).then((similarArtists) => (
//         loadMultipleArtistAlbums(
//             session,
//             artists.concat(similarArtists),
//             albumsLimit
//         )
//     ))
// }


// const loadRecommendedAlbums = function(session, numberOfFavoriteAlbums, artistsLimit, albumsLimit) {
//
//     artistsLimit = artistsLimit ? artistsLimit : 2;
//     albumsLimit = albumsLimit ? albumsLimit : 1;
//
//
//     console.log('loadRecommendedAlbums', ...arguments);
//
//     return loadFavoriteAlbums(session).then(
//         (albums) => Promise.all(
//             albums
//             .reverse()
//             .slice(0, numberOfFavoriteAlbums)
//             .map(
//                 (album) => (
//                     loadSimilarAlbums(session, album, artistsLimit, albumsLimit)
//                 )
//             )
//         )
//     ).then(
//         (responses) => (
//             _array.uniqBy(
//                 responses.reduce((a, b) => a.concat(b)),
//                 'id'
//             )
//         )
//     )
// }



// const loadRecommendedAlbums = function(session, artistsLimit, albumsLimit) {
//
//     artistsLimit = artistsLimit ? artistsLimit : 2;
//     albumsLimit = albumsLimit ? albumsLimit : 1;
//
//     return loadFavoriteAlbums(session).then((albums) => (
//         albums.map((album) => album.artist)
//     )).then((albumArtists) => (
//         loadFavoriteArtists(session).then((artists) => (
//             _array.uniqBy(artists.concat(albumArtists), 'id')
//         ))
//     )).then((artists) => (
//         loadMultipleSimilarArtists(session, artists, 1)
//     )).then((artists) => (
//         loadMultipleArtistAlbums(session, artists, 1)
//     ))
// }




// const loadRecommendedAlbums = function(session, artistsLimit, albumsLimit) {
//
//     artistsLimit = artistsLimit || 1;
//     albumsLimit = albumsLimit ? albumsLimit : 1;
//
//     return loadFavoriteAlbums(session).then((albums) => (
//
//         Promise.all(
//             albums.map((album) => loadSimilarAlbums(session, album, artistsLimit, albumsLimit))
//         )
//
//     )).then((responses) => (
//
//         _array.uniqBy(
//             responses.reduce((a, b) => a.concat(b)),
//             'id'
//         )
//
//     ))
//
// }




const loadRecommendedAlbums = function(session, artistsLimit, albumsLimit) {

    artistsLimit = artistsLimit || 1;
    albumsLimit = albumsLimit ? albumsLimit : 1;

    return loadFavoriteAlbums(session).then(

        (albums) => (
            Promise.all(
                albums.map((album) => loadSimilarAlbums(session, album, artistsLimit, albumsLimit))
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
