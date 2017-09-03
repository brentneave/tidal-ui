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
                state.data.albums[album.id].details = album;
            }
        )
        state.data.fresh = true;
        return state;
    },


    ADD_ALBUM_TRACKS: function(state, { tracks }) {
        state.data.albums[album.id] = state.data.albums[album.id] || {};
        state.data.albums[album.id].tracks = tracks;
        state.data.fresh = true;
        return state;
    },


    ADD_ALBUM_TRACKS: function(state, { album, tracks }) {
        state.data.albums[album.id] = state.data.albums[album.id] || {};
        state.data.albums[album.id].tracks = tracks;
        state.data.fresh = true;
        return state;
    },


    ADD_SIMILAR_ALBUMS: function(state, { album, similarAlbums }) {
        state.data.albums[album.id] = state.data.albums[album.id] || {};
        state.data.albums[album.id].similar = similarAlbums;
        state.data.fresh = true;
        return state;
    },


    ADD_ARTIST_DETAILS: function(state, { artists }) {
        (artists instanceof Array ? artists : [artists]).map(
            artist => {
                state.data.artists[artist.id] = state.data.artists[artist.id] || {};
                state.data.artists[artist.id].details = artist;
            }
        )
        state.data.fresh = true;
        return state;
    }



}


module.exports = reduce;