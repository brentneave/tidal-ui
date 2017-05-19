const config = {}

Object.defineProperty(config, 'baseURL', { value: 'https://api.tidalhifi.com/v1' });

Object.defineProperty(config, 'URLs', {
    value: Object.freeze({
        login: config.baseURL + '/login/username?countryCode=NZ',
        user: config.baseURL + '/users',
        albums: function(sessionId) {
            return config.baseURL + '/users/' + sessionId + '/favorites/albums';
        },
        artists: function(userId) {
            return config.baseURL + '/users/' + userId + '/favorites/artists';
        },
        similarArtists: function(artistId) {
            return config.baseURL + '/artists/' + artistId + '/similar';
        },
        tracks: function(sessionId) {
            return config.baseURL + '/users/' + sessionId + '/favorites/tracks';
        },
        artistAlbums: function(artistId) {
            return config.baseURL + '/artists/' + artistId + '/albums';
        }
    })
});

Object.defineProperty(config, 'token', {
    value: 'wdgaB1CilGA-S_s2'
});

Object.defineProperty(config, 'tokenHeader', {
    value: Object.freeze({
        'X-Tidal-Token': 'wdgaB1CilGA-S_s2'
    })
});

Object.defineProperty(config, 'sessionHeader', {
    value: function(sessionId) {
        return {
            'X-Tidal-SessionId': sessionId
        }
    }
});

Object.defineProperty(config, 'method', {
    value: Object.freeze({
        get: 'get',
        post: 'post',
    })
});

module.exports = config;
