const apiRequest = require('../apiRequest'),
    config = require('../config');

const resolve = function(response) {
    return response.body.items
        .sort(
            (a, b) =>
            Date.parse(a.created.slice(0, 10)) >
            Date.parse(b.created.slice(0, 10)) ?
            -1 : 1
        )
        .map(obj => obj.item)
}

const reject = function(response) {
    throw new Error('Could not load albums')
}

module.exports = function(session) {
    console.log('loadFavoriteAlbums:', session);
    return apiRequest({
            method: config.method.get,
            url: config.urls.albums(session.user.id),
            header: config.sessionHeader(session.id),
            parameters: {
                countryCode: session.countryCode,
                limit: 9999
            }
        })
        .then(
            resolve,
            reject
        );
}
