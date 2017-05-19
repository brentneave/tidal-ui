const Router = require('../router/Router.js');

const Reducer = function()
{
    const _actions = {
        LOGOUT: 'LOGOUT',
        LOGIN: 'LOGIN',
        RESTORE_STATE: 'RESTORE_STATE',
        RESTORE_SESSION_FROM_LOCAL_STORAGE: 'RESTORE_SESSION_FROM_LOCAL_STORAGE',
        FAVORITE_ARTISTS: 'FAVORITE_ARTISTS',
        RECOMMENDED_ARTISTS: 'RECOMMENDED_ARTISTS',
        LATEST_ALBUMS: 'LATEST_ALBUMS',
        RECOMMENDED_ALBUMS: 'RECOMMENDED_ALBUMS',
        LOAD_ROUTE: 'LOAD_ROUTE',
        LOAD_ROUTE_FROM_CACHE: 'LOAD_ROUTE_FROM_CACHE',
        UNLOAD_CURRENT_ROUTE: 'UNLOAD_CURRENT_ROUTE'
    }

    console.log('Reducer._actions');
    console.log(_actions);

    const _defaultState = {
        session:
        {
            id: null,
            countryCode: null,
            loginError: null,
            user:
            {
                id: null
            }
        },
        routes: [
        {
            path: '/',
            data: null
        }],
        currentRoute: 0,
        // route: {
        //     path: "/",
        //     data: null
        // },
        // cache: {},
        favorites:
        {
            artists: [],
            albums: []
        },
        latestReleases:
        {
            albums: []
        },
        recommendations:
        {
            artists: [],
            albums: []
        }
    };

    const _cloneState = function(state)
    {
        return JSON.parse(JSON.stringify(state));
    }

    const _reduce = function(state, action)
    {
        console.log('Reducer._reduce');
        console.log(state);
        console.log(action);
        var newState = state ? _cloneState(state) : _cloneState(_defaultState);

        if (!action)
        {
            console.log(newState);
            return newState;
        }

        switch (action.type)
        {
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
                )
                {
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
                )
                {
                    newState.session = _cloneState(action.payload.session);
                }
                break;

            case _actions.UNLOAD_CURRENT_ROUTE:
                newState.route.data = [];
                break;

            case _actions.LOAD_ROUTE_FROM_CACHE:
                if (state.cache[action.payload.path])
                {
                    console.log('Getting cached route');
                    console.log(state.cache[action.payload.path]);
                    newState.route = _cloneState(state.cache[action.payload.path]);
                }
                break;

            case _actions.LOAD_ROUTE:
                return Router.setRoute(newState, action.payload.path).then(
                    function(response)
                    {
                        newState.routes = newState.routes.filter(
                                function(item)
                                {
                                    return item.path != action.payload.path;
                                }
                            )
                            .push(
                            {
                                path: action.payload.path,
                                data: response
                            })
                        newState.currentRoute = newState.routes.findIndex(
                            function(item)
                            {
                                return item.path == action.payload.path;
                            }
                        );
                        return newState;
                    }
                );
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

    Object.defineProperty(this, 'reduce',
    {
        value: _reduce
    });

    Object.defineProperty(this, 'actions',
    {
        value: Object.freeze(_actions)
    });
}

module.exports = new Reducer();
