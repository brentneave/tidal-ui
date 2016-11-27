// const
//     APIConfig = require('../APIConfig'),
//     APIRequest = require('../APIRequest');
//
// const ArtistsRequest = function(session, user)
// {
//     APIRequest.prototype.constructor.call(this);
//     this.url = APIConfig.URLs.artists(user.id);
//     this.header = APIConfig.sessionHeader(session.id);
//     this.method = APIRequest.method.get;
//     this.form =
//     {
//         countryCode: session.countryCode,
//         limit: 9999
//     };
// }
//
// ArtistsRequest.prototype = new APIRequest();
//
// module.exports = ArtistsRequest;


const apiRequest = require('../apiRequest'),
      APIConfig = require('../APIConfig');

const resolve = function(response)
{
    console.log('API.loadFavoriteArtists.resolve:');
    console.log(response);
    const extractItem = function(o)
    {
        return o.item;
    }
    return response.body.items.map(extractItem);
}

const reject = function(response)
{
    console.log('API.loadFavoriteArtists.reject:');
    console.log(response);
    return {
        error: 'Could not load artists'
    }
}

module.exports = function(session)
{
    console.log('API.loadFavoriteArtists:');
    console.log(session);

    return apiRequest
    ({
        method: 'get',
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
