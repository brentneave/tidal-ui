const apiRequest = require('../apiRequest'),
    config = require('../config');

const resolve = function(response) {
    const extractItem = function(o) {
        return o.item;
    }
    return response.body.items.map(extractItem).reverse();
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
