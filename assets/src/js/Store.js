const
    clone = require('./utils/clone'),
    defaultState = require('./data/defaultState'),
    routes = require('./data/routes');



const Store = function() {



    var _state = clone(defaultState);



    const _getRoute = function({ state, routes, path }) {

        const clean = path.replace(/^.*\/\/[^\/]+/, ''),
            segments = clean.split('/').filter(isNotEmptyString);

        var
            route = routes,
            data = {},
            i = 0;

        segments.map(function(segment) {

            if (route.routes) {
                route = route.routes[segment] ?
                    route.routes[segment] :
                    route.routes['default'];
            } else {
                route = route;
            }

            if (route.getParams !== undefined) {
                data = route.getParams(state, segments.slice(i));
            }

            i++;

        });

        return {
            path: clean,
            component: route.component,
            data: data
        };

    }



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



        SET_ROUTE: function(state, { path }) {

            const route = _getRoute({
                state: state,
                routes: routes,
                path: path
            });

            state.route = route;

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



    return Object.freeze({

        apply: function({ action, payload }) {

            console.log('Store.apply(', action, payload, ')');

            return _mutators[action] ?
                _mutators[action](clone(_state), payload) :
                new Error('Invalid action type');

        }

    });



}



module.exports = Store;
