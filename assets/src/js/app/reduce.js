const
    clone = require('../utils/clone'),
    defaultState = require('./state').default,
    isNotEmptyString = require('../utils/isNotEmptyString');



var _state = defaultState;



const reduce = function({ action, payload }) {

    _state = _mutate[action](_state, payload);

    return Promise.resolve(
        clone(_state)
    );

};



const _mutate = {



    LOGIN: function(state, { session }) {
        state.session = clone(session);
        state.route.fresh = false;
        return state;
    },



    ERROR: function(state, { errors }) {
        errors = errors instanceof Array ? errors : [errors];
        state.errors = clone(errors);
        return state;
    },



    LOGOUT: function(state) {
        return clone(defaultState);
    },



    ROUTE: function(state, { path }) {
        state.path.str = path.replace(/^.*\/\/[^\/]+/, '');
        state.path.arr = state.path.str.split('/').filter(isNotEmptyString);
        state.data.fresh = false;
        return state;
    },



    INIT: function(state, { localState, path }) {
        state = localState ? localState : state;
        if (path) {
            state.path.str = path.replace(/^.*\/\/[^\/]+/, '');
            state.path.arr = state.path.str.split('/').filter(isNotEmptyString);
        }
        state.data.fresh = false;
        return state;
    },



    ADD_DATA: function(state, { key, data }) {
        state.data[key] = clone(data);
        state.data.fresh = true;
        return state;
    },


    SET_FAVORITE_ALBUMS: function(state, { albums }) {
        state.data.favorites.albums = clone(albums);
        state.data.fresh = true;
        return state;
    },



    SET_RECOMMENDED_ALBUMS: function(state, { albums }) {
        state.data.recommended.albums = clone(albums);
        state.data.fresh = true;
        return state;
    },



    SET_LATEST_ALBUMS: function(state, { albums }) {
        state.data.latest.albums = clone(albums);
        state.data.fresh = true;
        return state;
    },



    SET_FAVORITE_ARTISTS: function(state, { artists }) {
        state.data.favorites.artists = clone(artists);
        state.data.fresh = true;
        return state;
    },



    SET_RECOMMENDED_ARTISTS: function(state, { artists }) {
        state.data.recommended.artists = clone(artists);
        state.data.fresh = true;
        return state;
    },



    ADD_ALBUM_DETAILS: function(state, { albums }) {
        (albums instanceof Array ? albums : [albums]).map(
            album => {
                state.data.albums[album.id] = state.data.albums[album.id] || {};
                state.data.albums[album.id].details = clone(album);
            }
        )
        state.data.fresh = true;
        return state;
    },



    ADD_ALBUM_TRACKS: function(state, { album, tracks }) {
        console.log('ADD_ALBUM_TRACKS', album, tracks);
        state.data.albums[album.id] = state.data.albums[album.id] || {};
        state.data.albums[album.id].tracks = clone(tracks);
        state.data.fresh = true;
        return state;
    },



    ADD_SIMILAR_ALBUMS: function(state, { album, similarAlbums }) {
        state.data.albums[album.id] = state.data.albums[album.id] || {};
        state.data.albums[album.id].similar = clone(similarAlbums);
        state.data.fresh = true;
        return state;
    },



    ADD_ARTIST_DETAILS: function(state, { artist }) {
        state.data.artists[artist.id] = state.data.artists[artist.id] || {};
        state.data.artists[artist.id].details = clone(artist);
        state.data.fresh = true;
        return state;
    },



    ADD_ARTIST_ALBUMS: function(state, { artist, albums }) {
        state.data.artists[artist.id] = state.data.artists[artist.id] || {};
        state.data.artists[artist.id].albums = clone(albums);
        state.data.fresh = true;
        return state;
    },



    ADD_SIMILAR_ARTISTS: function(state, { artist, similar }) {
        state.data.artists[artist.id] = state.data.artists[artist.id] || {};
        state.data.artists[artist.id].similar = clone(similar);
        state.data.fresh = true;
        return state;
    },



    PLAY_TRACK: function(state, { streamingDetails }) {
        state.audio.streamingDetails = clone(streamingDetails);
        return state;
    }



}


module.exports = reduce;