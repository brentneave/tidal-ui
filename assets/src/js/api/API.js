const API = function()
{
    Object.defineProperty(this, 'LoginRequest',              { value: require('./types/LoginRequest') });
    Object.defineProperty(this, 'FavoriteArtistsRequest',    { value: require('./types/ArtistsRequest') });
    Object.defineProperty(this, 'RecommendedArtistsRequest', { value: require('./types/RecommendedArtistsRequest') });
    Object.defineProperty(this, 'LatestAlbumsRequest',       { value: require('./types/LatestReleasesRequest') });
}

module.exports = new API();
