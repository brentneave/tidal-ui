const apiRequest = require('../apiRequest'),
loadSimilarArtists = require('./loadSimilarArtists'),
_array = require('lodash/array');

const reducePromiseResolutions = function(arrays)
{
    console.log('reduce:');
    console.log(arrays);
    if(arrays.length)
    {
        return _array.uniqBy
        (
            arrays.reduce
            (
                function(a,b)
                {
                    return a.concat(b);
                }
            ),
            'id'
        )
    }
    else
    {
        return [];
    }
}

module.exports = function(session, artists, limit)
{
    console.log('API.loadRecommendedArtists:');
    console.log(session);
    console.log(artists);
    console.log(limit);

    limit = limit ? limit : 1;

    return Promise.all
    (
        artists.map
        (
            function(artist)
            {
                return loadSimilarArtists(session, artist, limit)
            }
        )
    )
    .then
    (
        reducePromiseResolutions
    );
}
