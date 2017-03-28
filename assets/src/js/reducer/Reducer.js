const Router = require('../router/Router.js');

const Reducer = function()
{
    const _actions =
    {
        LOGOUT : 'LOGOUT',
        LOGIN : 'LOGIN',
        RESTORE_STATE: 'RESTORE_STATE',
        FAVORITE_ARTISTS : 'FAVORITE_ARTISTS',
        RECOMMENDED_ARTISTS : 'RECOMMENDED_ARTISTS',
        LATEST_ALBUMS : 'LATEST_ALBUMS',
        RECOMMENDED_ALBUMS : 'RECOMMENDED_ALBUMS',
        SET_ROUTE : 'SET_ROUTE'
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
        route: {
            path: "/",
            data: null
        },
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

        if(!action)
        {
            console.log(newState);
            return newState;
        }

        switch(action.type)
        {
            case _actions.LOGOUT:
                newState = _cloneState(_defaultState);
                break;

            case _actions.LOGIN:
                newState = _cloneState(_defaultState);
                newState.session = action.payload;
                break;

            case _actions.RESTORE_STATE:
                newState = _cloneState(_defaultState);
                if
                (
                    action.payload
                    && action.payload.session
                    && action.payload.session.id
                    && action.payload.session.countryCode
                    && action.payload.session.user
                    && action.payload.session.user.id
                ){
                    newState.session = action.payload.session;
                }
                break;

            case _actions.SET_ROUTE:
                newState.route = action.payload;
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
        return newState;
    }

    Object.defineProperty(this, 'reduce', { value: _reduce });
    Object.defineProperty(this, 'actions', { value: Object.freeze(_actions) });
}

module.exports = new Reducer();
