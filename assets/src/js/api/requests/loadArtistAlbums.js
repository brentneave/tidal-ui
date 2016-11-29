const apiRequest = require('../apiRequest'),
      APIConfig = require('../APIConfig');

const resolve = function(response)
{
    return response.body.items;
}

const reject = function(response)
{
    return Error('Could not load artist’s albums');
}

module.exports = function(session, artist, limit)
{
    console.log('API.loadArtistAlbums:');
    console.log(session);
    console.log(artist);
    console.log(limit);

    limit = limit ? limit : 99;

    return apiRequest
    ({
        method: APIConfig.method.get,
        url: APIConfig.URLs.artistAlbums(artist.id),
        header: APIConfig.sessionHeader(session.id),
        parameters:
        {
            countryCode: session.countryCode,
            limit: limit
        }
    })
    .catch
    (
        reject
    )
    .then
    (
        resolve, reject
    )
}
