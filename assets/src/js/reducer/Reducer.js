const Router = require('../router/Router.js');

const Reducer = function() {
    const _actions = {
        INIT: 'INIT',
        LOGOUT: 'LOGOUT',
        LOGIN: 'LOGIN',
        RESTORE_STATE: 'RESTORE_STATE',
        RESTORE_SESSION_FROM_LOCAL_STORAGE: 'RESTORE_SESSION_FROM_LOCAL_STORAGE',
        FAVORITE_ARTISTS: 'FAVORITE_ARTISTS',
        RECOMMENDED_ARTISTS: 'RECOMMENDED_ARTISTS',
        LATEST_ALBUMS: 'LATEST_ALBUMS',
        RECOMMENDED_ALBUMS: 'RECOMMENDED_ALBUMS',
        UNLOAD_CURRENT_ROUTE: 'UNLOAD_CURRENT_ROUTE',
        UPDATE_ROUTE_DATA: 'UPDATE_ROUTE_DATA',
        SET_CURRENT_ROUTE: 'SET_CURRENT_ROUTE'
    }

    console.log('Reducer._actions');
    console.log(_actions);

    const _defaultState = {
        session: {
            id: null,
            countryCode: null,
            loginError: null,
            user: {
                id: null
            }
        },
        routeCache: [{
            path: '/',
            data: null
        }],
        currentRoute: [{
            path: '/',
            data: null
        }],
        // route: {
        //     path: "/",
        //     data: null
        // },
        // cache: {},
        favorites: {
            artists: [],
            albums: []
        },
        latestReleases: {
            albums: []
        },
        recommendations: {
            artists: [],
            albums: []
        }
    };

    const _cloneState = function(state) {
        return JSON.parse(JSON.stringify(state));
    }

    const _reduce = function(action, state) {
        console.log('Reducer._reduce');
        console.log(state);
        console.log(action);
        var newState = state ? _cloneState(state) : _cloneState(_defaultState);

        if (!action) {
            console.log(newState);
            return newState;
        }

        switch (action.type) {
            case _actions.INIT:
                break;

            case _actions.LOGOUT:
                newState = _cloneState(_defaultState);
                break;

            case _actions.LOGIN:
                newState = _cloneState(_defaultState);
                newState.session = action.payload;
                break;

            case _actions.RESTORE_STATE:
                if (
                    action.payload &&
                    action.payload.session &&
                    action.payload.session.id &&
                    action.payload.session.countryCode &&
                    action.payload.session.user &&
                    action.payload.session.user.id
                ) {
                    newState = _cloneState(action.payload);
                }
                break;

            case _actions.RESTORE_SESSION_FROM_LOCAL_STORAGE:
                newState = _cloneState(_defaultState);
                if (
                    action.payload &&
                    action.payload.session &&
                    action.payload.session.id &&
                    action.payload.session.countryCode &&
                    action.payload.session.user &&
                    action.payload.session.user.id
                ) {
                    newState.session = _cloneState(action.payload.session);
                }
                break;

            case UNLOAD_CURRENT_ROUTE:
                newState.currentRoute[action.payload.path].data = null;
                break;

            case UPDATE_ROUTE_DATA:
                newState.routeCache[action.payload.path].path = action.payload.path;
                newState.routeCache[action.payload.path].data = action.payload.data;
                break;

            case SET_CURRENT_ROUTE:
                newState.routeCache[action.payload.path].path = action.payload.path;
                newState.routeCache[action.payload.path].data = action.payload.data;
                newState.currentRoute[action.payload.path].path = action.payload.path;
                newState.currentRoute[action.payload.path].data = action.payload.data;
                break;

            case _actions.FAVORITE_ARTISTS:
                newState.favorites.artists = action.payload;
                break;

            case _actions.RECOMMENDED_ARTISTS:
                newState.recommendations.artists = action.payload;
                break;

            case _actions.LATEST_ALBUMS:
                newState.latestReleases.albums = action.payload;

            case _actions.RECOMMENDED_ALBUMS:
                newState.recommendations.albums = action.payload;
                break;

            default:
                break;
        }

        console.log(newState);
        return Promise.resolve(newState);
    }

    Object.defineProperty(this, 'reduce', {
        value: _reduce
    });

    Object.defineProperty(this, 'actions', {
        value: Object.freeze(_actions)
    });
}

module.exports = new Reducer();
