const base = 'https://api.tidalhifi.com/v1';

const urls = {

    login: base + '/login/username?countryCode=NZ',

    user: base + '/users',

    albums: function(sessionId) {
        return base + '/users/' + sessionId + '/favorites/albums';
    },

    album: function(albumId) {
        return base + '/albums/' + albumId;
    },

    albumTracks: function(albumId) {
        return base + '/albums/' + albumId + '/items/';
    },

    artists: function(userId) {
        return base + '/users/' + userId + '/favorites/artists';
    },

    artist: function(artistId) {
        return base + '/artists/' + artistId;
    },

    similarArtists: function(artistId) {
        return base + '/artists/' + artistId + '/similar';
    },

    artistAlbums: function(artistId) {
        return base + '/artists/' + artistId + '/albums';
    },

    tracks: function(sessionId) {
        return base + '/users/' + sessionId + '/favorites/tracks';
    },

    streamingURL: function(trackId) {
        return base + '/tracks/' + trackId + '/streamUrl'
    }
}

const token = 'wdgaB1CilGA-S_s2';

const tokenHeader = {
    'X-Tidal-Token': token
};

const sessionHeader = function(sessionId) {
    return {
        'X-Tidal-SessionId': sessionId
    }
}

const method = {
    get: 'get',
    post: 'post',
};

const config = {
    urls,
    token,
    tokenHeader,
    sessionHeader,
    method
};

module.exports = config;