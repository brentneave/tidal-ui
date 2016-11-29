const apiRequest = require('../apiRequest'),
      APIConfig = require('../APIConfig');

const resolve = function(response)
{
    const extractItem = function(o)
    {
        return o.item;
    }
    return response.body.items.map(extractItem);
}

const reject = function(response)
{
    return {
        error: 'Could not load artists'
    }
}

module.exports = function(session)
{
    return apiRequest
    ({
        method: APIConfig.method.get,
        url: APIConfig.URLs.artists(session.user.id),
        header: APIConfig.sessionHeader(session.id),
        parameters:
        {
            countryCode: session.countryCode,
            limit: 9999
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
