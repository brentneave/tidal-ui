/*
codec: "FLAC"
encryptionKey: "N+OCdOtbzH2g8E1iUlg64xubpdyZ/spGY8u1DTkLVZtgApJrrlo4raZABrL4qBDD"
playTimeLeftInMinutes: -1
soundQuality: "LOSSLESS"
trackId: 73372385
url: "http://audio-enc.tidal.com/v2/0/2ec0cce677cb83bf4f112ded1f47e586_26.flac?__token__=exp=1504690392~hmac=b960c1cd26ed3d014f99775321a10df5513ce53af2e1edd2e0aa9cbc19170823"
*/
const
    apiRequest = require('../apiRequest'),
    config = require('../config');

const resolve = function(response) {
    console.log('getTrackStreamURL.resolve:', response)
    return response.body;
}

const reject = function(response) {
    throw new Error('Could not load track streaming URL');
}

const getStreamingURL = function(session, track, quality) {
    console.log('api.getStreamingURL', ...arguments);
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