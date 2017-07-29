const
    loadFavoriteArtists = require('./loadFavoriteArtists'),
    loadFavoriteAlbums = require('./loadFavoriteAlbums'),
    loadMultipleArtistAlbums = require('./loadMultipleArtistAlbums'),
    _array = require('lodash/array');



const loadLatestAlbums = (session, albumsLimit) => (

    loadFavoriteAlbums(session).then(

        (albums) => albums.map((album) => album.artist)

    ).then(

        (albumArtists) => loadFavoriteArtists(session).then(

            (artists) => _array.uniqBy(
                artists.concat(albumArtists),
                'id'
            )

        )

    ).then((artists) => (

        loadMultipleArtistAlbums(session, artists, albumsLimit || 1)

    ))


)


module.exports = loadLatestAlbums;
