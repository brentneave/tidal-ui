const APIConfig = {}

Object.defineProperty(APIConfig, 'baseURL', { value: 'https://api.tidalhifi.com/v1' });

Object.defineProperty(APIConfig, 'URLs',
{
    value: Object.freeze
    ({
        login: APIConfig.baseURL + '/login/username?countryCode=NZ',
        user: APIConfig.baseURL + '/users',
        albums: function(sessionId)
        {
            return APIConfig.baseURL + '/users/' + sessionId + '/favorites/albums';
        },
        artists: function(userId)
        {
            return APIConfig.baseURL + '/users/' + userId + '/favorites/artists';
        },
        similarArtists: function(artistId)
        {
            return APIConfig.baseURL + '/artists/' + artistId + '/similar';
        },
        tracks: function(sessionId)
        {
            return APIConfig.baseURL + '/users/' + sessionId + '/favorites/tracks';
        },
        artistAlbums: function(artistId)
        {
            return APIConfig.baseURL + '/artists/' + artistId + '/albums';
        }
    })
});

Object.defineProperty(APIConfig, 'token',
{
    value: 'wdgaB1CilGA-S_s2'
});

Object.defineProperty(APIConfig, 'tokenHeader',
{
    value: Object.freeze
    (
        {
            'X-Tidal-Token': 'wdgaB1CilGA-S_s2'
        }
    )
});

Object.defineProperty(APIConfig, 'sessionHeader',
{
    value: function(sessionId)
    {
        return {
            'X-Tidal-SessionId': sessionId
        }
    }
});

Object.defineProperty(APIConfig, 'method',
{
    value: Object.freeze
    (
        {
            get: 'get',
            post: 'post',
        }
    )
});

module.exports = APIConfig;
