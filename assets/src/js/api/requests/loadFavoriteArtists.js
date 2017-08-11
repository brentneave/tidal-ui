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
    return {
        error: 'Could not load artists'
    }
}

module.exports = function(session) {
    console.log('loadFavoriteArtists:', session);
    return apiRequest({
            method: config.method.get,
            url: config.urls.artists(session.user.id),
            header: config.sessionHeader(session.id),
            parameters: {
                countryCode: session.countryCode,
                limit: 9999
            }
        })
        .catch(
            reject
        )
        .then(
            resolve, reject
        );
}
