const
    Broadcaster = require('./utils/Broadcaster'),
    clone = require('./utils/clone'),
    defaultState = require('./data/defaultState');



const Store = function() {



    const _events = Object.freeze({
        onStateChange: new Broadcaster()
    });



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
            if (newState.session.id) state.session = newState.session;
            state.favorites = clone(newState.favorites);
            state.recommended = clone(newState.recommended);
            state.route = clone(newState.route);
            return state;
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



    const _applyAction = function({ action, payload }) {

        console.log('Store.onDispatchAction(', action, payload, ')');

        if (_mutators[action]) {

            _state = _mutators[action](_state, payload);
            _events.onStateChange.broadcast(clone(_state));

        } else {

            throw new Error('Invalid action type');

        }

    };



    Object.defineProperties(this, {
        'events': {
            value: _events
        },
        'onCreateAction': {
            value: _applyAction
        }
    });



}



module.exports = Store;
