const APIDispatcher = require('../api/APIDispatcher'),
APIActions = require('../api/APIActions'),
ViewDispatcher = require('../view/ViewDispatcher'),
ViewActions = require('../view/ViewActions'),
ModelDispatcher = require('./ModelDispatcher'),
ModelActions = require('./ModelActions'),
LocalStorageDispatcher = require('../localstorage/LocalStorageDispatcher'),
LocalStorageActions = require('../localstorage/LocalStorageActions'),
Action = require('../events/Action'),
User = require('./types/User'),
Session = require('./types/Session');

const ModelReceiver = function()
{
    const _defaultState =
    {
        session:
        {
            id: null,
            countryCode: null
        },

        user:
        {
            id: null
        },

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

    var _currentState = null;

    const _handleAPINotifications = function(action, state)
    {
        console.log('ModelReceiver._handleAPINotifications: ' + action.type);
        console.log(action);

        var stateWillUpdate = true;

        if(!state)
        {
            state = _cloneState(_defaultState);
        }
        else {
            state = _cloneState(state);
        }

        switch(action.type)
        {
            case APIActions.ERROR:
                if(action.payload.body.status == 401
                || action.payload.body.status == 400
                || action.payload.body.status == 403)
                {
                    // session is over, login again
                    state.user = null;
                    state.session.countryCode = null;
                    state.session.id = null;
                    ModelDispatcher.notifications.broadcast(new Action(ModelActions.notifications.SESSION_INVALID, { state: state }));
                }
                stateWillUpdate = false;
                break;

            case APIActions.ERROR_LOGIN:
                state.user = null;
                state.session.countryCode = null;
                state.session.id = null;
                stateWillUpdate = false;
                ModelDispatcher.notifications.broadcast(new Action(ModelActions.notifications.LOGIN_ERROR, { state: state }));
                break;

            case APIActions.RESPONSE_LOGIN:
                console.log('state.user.id = ' + state.user.id);
                console.log('action.payload.body.userId = ' + action.payload.body.userId);
                state.user.id = action.payload.body.userId;
                state.session.countryCode = action.payload.body.countryCode;
                state.session.id = action.payload.body.sessionId;
                ModelDispatcher.requests.broadcast(new Action(ModelActions.requests.GET_ARTISTS, { session: state.session, user: state.user }));
                ModelDispatcher.notifications.broadcast(new Action(ModelActions.notifications.LOGIN_RESPONSE, { state: state }));
                break;

            case APIActions.RESPONSE_ARTISTS:
                state.favorites.artists = [];
                const n = action.payload.body.items.length;
                for(var i=0; i<n; i++)
                {
                    state.favorites.artists.push(action.payload.body.items[i].item);
                }
                // ModelDispatcher.requests.broadcast
                // (
                //     new Action
                //     (
                //         ModelActions.requests.GET_RECOMMENDED_ARTISTS,
                //         { session: state.session, artists: state.favorites.artists }
                //     )
                // );
                break;

            case APIActions.RESPONSE_RECOMMENDED_ARTISTS:
                state.recommendations.artists = action.payload.body.items;
                ModelDispatcher.requests.broadcast
                (
                    new Action
                    (
                        ModelActions.requests.GET_LATEST_RELEASES,
                        {
                            artists: state.recommendations.artists.concat(state.favorites.artists),
                            session: state.session
                        }
                    )
                );
                break;

            case APIActions.RESPONSE_LATEST_RELEASES:
                state.latestReleases.albums = action.payload.body.items;
                // ModelDispatcher.notifications.broadcast(new Action(ModelActions.notifications.LATEST_RELEASES_RESPONSE, { state: state }));
                break;

            default:
                break;
        }

        if(stateWillUpdate)
        {
            ModelDispatcher.notifications.broadcast(new Action(ModelActions.notifications.STATE_CHANGE, { state: _cloneState(state) }));
        }

        _currentState = state;
    }

    const _handleViewRequests = function(action, state)
    {
        if(!state)
        {
            state = _cloneState(_defaultState);
        }

        switch(action.type)
        {
            case ViewActions.GET_LOGIN:
                ModelDispatcher.requests.broadcast
                (
                    new Action
                    (
                        ModelActions.requests.GET_LOGIN,
                        action.payload
                    )
                );
                break;

            case ViewActions.GET_ARTISTS:
                ModelDispatcher.requests.broadcast
                (
                    new Action
                    (
                        ModelActions.requests.GET_ARTISTS,
                        {
                            session: state.session,
                            user: state.user
                        }
                    )
                );
                break;

            case ViewActions.GET_LATEST_RELEASES:
                ModelDispatcher.requests.broadcast
                (
                    new Action
                    (
                        ModelActions.requests.GET_LATEST_RELEASES,
                        {
                            artists: state.favorites.artists,
                            session: state.session
                        }
                    )
                );
                break;

            default:
                break;
        }
    }

    const _handleLocalStorageNotifications = function(action, state)
    {
        console.log('ModelReceiver._handleLocalStorageNotifications:' + action.type)
        console.log(action);

        if(!state)
        {
            state = _cloneState(_defaultState);
        }

        switch (action.type)
        {
            case LocalStorageActions.READ_LOCAL_STATE:
                _currentState = action.payload.state;
                _currentState.session.id = 'TEST';
                ModelDispatcher.requests.broadcast
                (
                    new Action
                    (
                        ModelActions.requests.GET_ARTISTS,
                        {
                            artists: _currentState.favorites.artists,
                            session: _currentState.session
                        }
                    )
                );
                ModelDispatcher.notifications.broadcast(new Action(ModelActions.notifications.STATE_CHANGE, { state: _currentState }));
                break;
            default:
                break;
        }
    }

    LocalStorageDispatcher.notifications.addListener
    (
        this, function(action)
        {
            _handleLocalStorageNotifications(action, _currentState);
        }
    );
    ViewDispatcher.requests.addListener
    (
        this,
        function(action)
        {
            _handleViewRequests(action, _currentState);
        }
    );
    APIDispatcher.notifications.addListener
    (
        this, function(action)
        {
            console.log('handling action' + action.type);
            _handleAPINotifications(action, _currentState);
        }
    );
}

module.exports = new ModelReceiver();
