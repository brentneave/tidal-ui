const apiRequest = require('../apiRequest'),
    loadArtistAlbums = require('./loadArtistAlbums'),
    _array = require('lodash/array');



const reducePromiseResolutions = function(arrays) {
    console.log('reduce multipleArtistAlbums:', arrays);

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
    ).filter(
        album => album.streamStartDate != null
    ).sort(
        (a, b) => (
            Date.parse(a.streamStartDate.slice(0, 10)) >
            Date.parse(b.streamStartDate.slice(0, 10)) ?
            -1 : 1
        )
    )
}



const reject = function(response) {
    // fail silently if there are no similar albums
    return []
}



module.exports = function(session, artists, limit) {
    console.log('loadMultipleArtistAlbums', ...arguments);

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
