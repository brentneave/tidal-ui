const
    apiRequest = require('../apiRequest'),
    loadAlbumDetails = require('./loadAlbumDetails'),
    loadMultipleSimilarArtists = require('./loadMultipleSimilarArtists'),
    loadMultipleArtistAlbums = require('./loadMultipleArtistAlbums');



const loadSimilarAlbums = (session, album, artistsLimit, albumsLimit) => (

    ((album) => (
        album.artists ?
        Promise.resolve(album) :
        loadAlbumDetails(
            session,
            album
        )
    ))(album).then(
        (album) => (
            loadMultipleSimilarArtists(
                session,
                album.artists,
                artistsLimit || 12)
        )
    ).then(
        (similarArtists) => (
            loadMultipleArtistAlbums(
                session,
                similarArtists,
                albumsLimit || 1
            )
        )
    )

)


module.exports = loadSimilarAlbums;
