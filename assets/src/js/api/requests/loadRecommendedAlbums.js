const loadFavoriteArtists = require('./loadFavoriteArtists'),
      loadMultipleSimilarArtists = require('./loadMultipleSimilarArtists'),
      loadMultipleArtistAlbums = require('./loadMultipleArtistAlbums');

module.exports = function(session, artistsLimit, albumsLimit)
{
    artistsLimit = artistsLimit ? artistsLimit : 2;
    albumsLimit = albumsLimit ? albumsLimit : 1;

    return loadFavoriteArtists(session).then
    (
        function(artists)
        {
            return loadMultipleSimilarArtists(session, artists, artistsLimit).then
            (
                function(similarArtists)
                {
                    return loadMultipleArtistAlbums(session, artists.concat(similarArtists), albumsLimit);
                }
            );
        }
    );

}
