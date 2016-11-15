const APIConfig = {}

Object.defineProperty(APIConfig, 'baseURL', {
  value: 'https://api.tidalhifi.com/v1'
});

Object.defineProperty(APIConfig, 'URLs', {
  value: Object.freeze({
    login: APIConfig.baseURL + '/login/username',
    user: APIConfig.baseURL + '/users',
    albums: function(session) {
      return APIConfig.baseURL + '/users/' + session.user.id + '/favorites/albums';
    },
    artists: function(session) {
      return APIConfig.baseURL + '/users/' + session.user.id + '/favorites/artists';
    },
    tracks: function(session) {
      return APIConfig.baseURL + '/users/' + session.user.id + '/favorites/tracks';
    }
  })
});

Object.defineProperty(APIConfig, 'token', {
  value: 'wdgaB1CilGA-S_s2'
});

Object.defineProperty(APIConfig, 'tokenHeader', {
  value: Object.freeze({
    'X-Tidal-Token': 'wdgaB1CilGA-S_s2'
  })
});

Object.defineProperty(APIConfig, 'sessionHeader', {
  value: function(session) {
    return {
      'X-Tidal-SessionId': session.id
    }
  }
});

module.exports = APIConfig;
