const apiRequest = require('../apiRequest'),
    config = require('../config');

const resolve = function(response) {
    const extractItem = function(o) {
        return o.item;
    }
    return response.body.items.map(extractItem);
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
            url: config.URLs.artists(session.user.id),
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
