const
    api = require('../api/API'),
    clone = require('../utils/clone'),
    defaultState = require('./state').default,
    isNotEmptyString = require('../utils/isNotEmptyString');



var _state = defaultState;



const reduce = function({ action, payload }) {

    console.log('reduce', ...arguments);

    return Promise.resolve(
        _mutate[action](clone(_state), payload)
    ).then((state) => {
        _state = state;
        return state;
    });

};



const _mutate = {



    INIT: function(state, { localState }) {
        state = localState || state;
        if (state.route.data) state.route.data.fresh = false;
        return state;
    },



    LOGIN: function(state, credentials) {

        const handleResponse = function(response) {
            console.log('handleResponse', response)
            if (response.error) {
                state = clone(defaultState);
                state.errors = ['Please check your login details and try again.'];
            } else {
                state.session = response.session;
            }
            return state;
        }

        return api.login(credentials).then(handleResponse);
    },



    LOGOUT: function(state) {
        return clone(defaultState);
    },



    ROUTE: function(state, { path }) {
        state.path.str = path.replace(/^.*\/\/[^\/]+/, '');
        state.path.arr = state.path.str.split('/').filter(isNotEmptyString);
        state.route.fresh = false;
        state.route.data = state.cache[state.path.str] ?
            clone(state.cache[state.path.str]) :
            null;
        return state;
    },



    SET_ROUTE_DATA: function(state, { path, data }) {
        if (path === state.path.str) {
            state.route.fresh = true;
            state.route.data = clone(data); // only update route data if it’s still the active route
        }
        state.cache[path] = clone(data);
        return state;
    },




    ADD_ROUTE_DATA: function(state, { path, key, value }) {
        if (path === state.path.str) {
            state.route.fresh = true;
            state.route.data[key] = clone(value); // only update route data if it’s still the active route
        }
        state.cache[path] = clone(state.route.data);
        return state;
    },



    SET_FAVORITE_ARTISTS: function(state, { artists }) {
        state.favorites.artists = clone(artists);
        return state;
    }



}


module.exports = reduce;
