module.exports = Object.freeze
({
    login: require('./requests/login'),
    loadFavoriteArtists: require('./requests/loadFavoriteArtists'),
    loadMultipleSimilarArtists: require('./requests/loadMultipleSimilarArtists'),
    loadArtistAlbums: require('./requests/loadArtistAlbums'),
    loadMultipleArtistAlbums: require('./requests/loadMultipleArtistAlbums')
});
