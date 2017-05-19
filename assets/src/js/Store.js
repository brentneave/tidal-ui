const
    clone = require('./utils/clone'),
    isNotEmptyString = require('./utils/isNotEmptyString'),
    defaultState = require('./data/defaultState');



const Store = function() {



    var _state = clone(defaultState);



    const _mutators = {



        INIT: function(state) {
            state = clone(defaultState);
            console.log('INIT', state);
            return state;
        },



        LOGIN: function(state, { session }) {
            state.session = clone(session);
            return state;
        },



        LOGIN_FAIL: function(state, { error }) {
            state = clone(defaultState);
            state.route.data = { loginError: 'Please check your login details and try again.' }
            return state;
        },



        LOGOUT: function(state) {
            return clone(defaultState);
        },



        LOAD_STATE: function(state, { newState }) {
            return clone(newState);
        },



        SET_ROUTE: function(state, { path, route }) {
            console.log('SET_ROUTE', state);
            state.route = {
                path: path,
                component: route.component,
                data: {}
            }
            return state;
        },



        DISPLAY_ERROR: function(state, { error }) {
            state.route.data = { error: error };
            return state;
        },



        FAVORITE_ARTISTS: function(state, { artists }) {
            state.favorites.artists = clone(artists);
            return state;
        },



        RECOMMENDED_ARTISTS: function(state, { artists }) {
            state.favorites.artists = clone(artists);
            return state;
        },



        LATEST_ALBUMS: function(state, { albums }) {
            state.latest.albums = clone(albums);
            return state;
        },



        RECOMMENDED_ALBUMS: function(state, { albums }) {
            state.recommended.albums = clone(albums);
        }



    }



    this.apply = function({ action, payload }) {

        console.log('Store.apply(', action, payload, ')');
        _state = clone(_state);
        return _mutators[action] ?
            _mutators[action](_state, payload) :
            new Error('Invalid action type');

    };



    this.getCurrentState = function() {
        return clone(_state);
    };



}



module.exports = Store;
