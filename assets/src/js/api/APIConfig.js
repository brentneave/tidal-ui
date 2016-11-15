const APIConfig = {}

Object.defineProperty(APIConfig, 'baseURL', {
  value: 'https://api.tidalhifi.com/v1'
});

Object.defineProperty(APIConfig, 'URLs', {
  value: Object.freeze({
    login: APIConfig.baseURL + '/login/username',
    user: APIConfig.baseURL + '/users',
    favoriteAlbums: function(user) {
      return APIConfig.baseURL + '/users/' + user.id + '/favorites/albums';
    },
    favoriteArtists: function(user) {
      return APIConfig.baseURL + '/users/' + user.id + '/favorites/artists';
    },
    favoriteTracks: function(user) {
      return APIConfig.baseURL + '/users/' + user.id + '/favorites/tracks';
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
