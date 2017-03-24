const loadFavoriteArtists = require('./loadFavoriteArtists'),
      loadMultipleSimilarArtists = require('./loadMultipleSimilarArtists');

module.exports = function(session, artistsLimit)
{
    artistsLimit = artistsLimit ? artistsLimit : 2;

    return loadFavoriteArtists(session)
    .then
    (
        function(artists)
        {
            return loadMultipleSimilarArtists(session, artists, artistsLimit);
        }
    );
}
