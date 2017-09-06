const
    apiRequest = require('../apiRequest'),
    config = require('../config');

const resolve = function(response) {
    console.log('getTrackStreamURL.resolve:', response)
    return response;
}

const reject = function(response) {
    throw new Error('Could not load track streaming URL');
}

const getStreamingURL = function({ session, track, quality }) {
    return apiRequest({
            method: config.method.get,
            url: config.urls.streamingURL(track.id),
            header: config.sessionHeader(session.id),
            parameters: {
                countryCode: session.countryCode,
                soundQuality: quality || 'LOSSLESS'
            }
        })
        .then(
            resolve,
            reject
        );
}



module.exports = getStreamingURL;