const
    apiRequest = require('../apiRequest'),
    config = require('../config');



const resolve = function(response) {
    console.log('api.loadArtistDetails.resolve', response);
    return response.body;
}



const reject = function(response) {
    console.error('api.loadArtistDetails.reject', response);
    return { body: { items: [] } }
}



module.exports = function(session, artist) {

    console.log('API.loadArtistDetails', session, artist.id);

    return apiRequest({
            method: config.method.get,
            url: config.urls.artist(artist.id),
            header: config.sessionHeader(session.id),
            parameters: {
                countryCode: session.countryCode
            }
        })
        .then(
            resolve,
            reject
        );
};
