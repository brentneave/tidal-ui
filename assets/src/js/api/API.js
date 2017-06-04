module.exports = Object.freeze({
    login: require('./requests/login'),
    loadFavoriteArtists: require('./requests/loadFavoriteArtists'),
    loadFavoriteAlbums: require('./requests/loadFavoriteAlbums'),
    loadMultipleSimilarArtists: require('./requests/loadMultipleSimilarArtists'),
    loadArtistProfile: require('./requests/loadArtistProfile'),
    loadArtistAlbums: require('./requests/loadArtistAlbums'),
    loadMultipleArtistAlbums: require('./requests/loadMultipleArtistAlbums'),
    loadRecommendedAlbums: require('./requests/loadRecommendedAlbums'),
    loadRecommendedArtists: require('./requests/loadRecommendedArtists')
});
