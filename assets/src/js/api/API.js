module.exports = Object.freeze({
    login: require('./requests/login'),

    loadFavoriteArtists: require('./requests/loadFavoriteArtists'),
    loadFavoriteAlbums: require('./requests/loadFavoriteAlbums'),

    loadArtistProfile: require('./requests/loadArtistProfile'),
    loadArtistDetails: require('./requests/loadArtistDetails'),
    loadArtistAlbums: require('./requests/loadArtistAlbums'),
    loadSimilarArtists: require('./requests/loadSimilarArtists'),

    loadMultipleSimilarArtists: require('./requests/loadMultipleSimilarArtists'),
    loadMultipleArtistAlbums: require('./requests/loadMultipleArtistAlbums'),

    loadAlbum: require('./requests/loadAlbum'),
    loadAlbumTracks: require('./requests/loadAlbumTracks'),
    loadAlbumDetails: require('./requests/loadAlbumDetails'),
    loadSimilarAlbums: require('./requests/loadSimilarAlbums'),

    loadLatestAlbums: require('./requests/loadLatestAlbums'),
    loadRecommendedAlbums: require('./requests/loadRecommendedAlbums'),
    loadRecommendedArtists: require('./requests/loadRecommendedArtists')
});
