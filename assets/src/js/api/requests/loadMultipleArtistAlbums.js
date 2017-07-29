const apiRequest = require('../apiRequest'),
    loadArtistAlbums = require('./loadArtistAlbums'),
    _array = require('lodash/array');



const reducePromiseResolutions = function(arrays) {
    // console.log('reduce:');
    // console.log(arrays);

    arrays = arrays || [];

    return _array.uniqBy(
        arrays.reduce(
            function(a, b) {
                a = a instanceof Array ? a : [];
                b = b instanceof Array ? b : [];
                return a.concat(b);
            }
        ),
        'id'
    ).sort(
        function(a, b) {
            a = Date.parse(a.releaseDate.slice(0, 10));
            b = Date.parse(b.releaseDate.slice(0, 10));
            return a > b ? -1 : 1;
        }
    )
}



const reject = function(response) {
    // console.error('API.loadMultipleArtistAlbums.reject', response);
    return Error(response);
}



module.exports = function(session, artists, limit) {
    // console.log('API.loadMultipleArtistAlbums:');
    // console.log(session);
    // console.log(artists);
    // console.log(limit);

    limit = limit ? limit : 1;
    artists = artists || [];

    return Promise.all(
            artists.map(
                function(artist) {
                    return loadArtistAlbums(session, artist, limit)
                }
            )
        )
        .then(reducePromiseResolutions)
        .catch(reject)
}
