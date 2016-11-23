const Reducer = function()
{
    const _actions = 
    {
        LOGOUT : 'LOGOUT',
        LOGIN : 'LOGIN',
        LOGIN_ERROR : 'LOGIN_ERROR',
        FAVORITE_ARTISTS : 'FAVORITE_ARTISTS',
        RECOMMENDED_ARTISTS : 'RECOMMENDED_ARTISTS',
        LATEST_ALBUMS : 'LATEST_ALBUMS',
        RECOMMENDED_ALBUMS : 'RECOMMENDED_ALBUMS'
    }

    console.log('Reducer._actions');
    console.log(_actions);

    const _defaultState = {
        session:{
            id: null,
            countryCode: null,
            loginError: null
        },
        user: {
            id: null
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
        const newState = state ? _cloneState(state) : _cloneState(_defaultState);

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

            case _actions.LOGIN_ERROR:
                newState = _cloneState(_defaultState);
                newState.session.loginError = 'Please try again.';
                break;

            case _actions.LOGIN:
                newState = _cloneState(_defaultState);
                newState.user.id = action.payload.body.userId;
                newState.session.countryCode = action.payload.body.countryCode;
                newState.session.id = action.payload.body.sessionId;
                break;

            case _actions.FAVORITE_ARTISTS:
                newState.favorites.artists = [];
                const n = action.payload.body.items.length;
                for(var i=0; i<n; i++)
                {
                    newState.favorites.artists.push(action.payload.body.items[i].item);
                }
                break;

            case _actions.RECOMMENDED_ARTISTS:
                newState.recommendations.artists = action.payload.body.items;
                break;

            case _actions.LATEST_ALBUMS:
                newState.latestReleases.albums = action.payload.body.items;

            case _actions.RECOMMENDED_ALBUMS:
                newState.recommendations.albums = action.payload.body.items;
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
