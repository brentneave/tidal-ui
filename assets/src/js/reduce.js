const
    api = require('./api/API'),
    clone = require('./utils/clone'),
    defaultState = require('./state').default,
    isNotEmptyString = require('./utils/isNotEmptyString');



const reduce = function({ state, action, payload }) {

    return Promise.resolve(
        _mutate[action](clone(state), payload)
    );

}


const _mutate = {



    INIT: function(state) {
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
        return state;
    },



    SET_FAVORITE_ARTISTS: function(state, { artists }) {
        state.favorites.artists = clone(artists);
        return state;
    }



}


module.exports = reduce;
