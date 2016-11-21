const APIDispatcher = require('../api/APIDispatcher'),
APIActions = require('../api/APIActions'),
ViewDispatcher = require('../view/ViewDispatcher'),
ViewActions = require('../view/ViewActions'),
ModelDispatcher = require('./ModelDispatcher'),
ModelActions = require('./ModelActions'),
ModelState = require('./ModelState'),
Action = require('../events/Action'),
User = require('./types/User'),
Session = require('./types/Session');

const ModelReceiver = function()
{

    const _handleAPINotifications = function(action)
    {
        console.log('ModelReceiver._handleAPINotifications: ' + action.type);
        console.log(action.payload);
        switch(action.type)
        {
            case APIActions.RESPONSE_LOGIN:
                ModelState.session.user = new User(action.payload.body.userId);
                ModelState.session.countryCode = action.payload.body.countryCode;
                ModelState.session.id = action.payload.body.sessionId;
                ModelDispatcher.requests.broadcast(new Action(ModelActions.requests.GET_ARTISTS, { session: ModelState.session }));
                ModelDispatcher.notifications.broadcast(new Action(ModelActions.notifications.LOGIN_RESPONSE, { state: ModelState }));
                break;

            case APIActions.ERROR_LOGIN:
                ModelState.session.user = null;
                ModelState.session.countryCode = null;
                ModelState.session.id = null;
                ModelDispatcher.notifications.broadcast(new Action(ModelActions.notifications.LOGIN_ERROR, { state: ModelState }));
                break;

            case APIActions.RESPONSE_ARTISTS:
                ModelState.artists = [];
                const n = action.payload.body.items.length;
                for(var i=0; i<n; i++)
                {
                    ModelState.artists.push(action.payload.body.items[i].item);
                }
                ModelDispatcher.requests.broadcast(new Action(ModelActions.requests.GET_RECOMMENDED_ARTISTS, { artists: ModelState.artists, session: ModelState.session }));
                ModelDispatcher.notifications.broadcast(new Action(ModelActions.notifications.ARTISTS_RESPONSE, { state: ModelState }));
                break;

            case APIActions.RESPONSE_RECOMMENDED_ARTISTS:
                ModelState.recommendedArtists = action.payload.body.items;
                ModelDispatcher.requests.broadcast(new Action(ModelActions.requests.GET_LATEST_RELEASES, {artists: ModelState.recommendedArtists.concat(ModelState.artists), session: ModelState.session}));
                break;

            case APIActions.ERROR_ARTISTS:
                ModelDispatcher.notifications.broadcast(new Action(ModelActions.notifications.ARTISTS_ERROR, { state: ModelState }));
                break;

            case APIActions.RESPONSE_LATEST_RELEASES:
                ModelState.latestReleases = action.payload.body.items;
                ModelDispatcher.notifications.broadcast(new Action(ModelActions.notifications.LATEST_RELEASES_RESPONSE, { state: ModelState }));
                break;

            default:
                break;
        }
    }

    const _handleViewRequests = function(action)
    {
        console.log('ModelReceiver._handleViewRequests: ' + action.type);
        switch(action.type)
        {
            case ViewActions.GET_LOGIN:
                ModelDispatcher.requests.broadcast(new Action(ModelActions.requests.GET_LOGIN, action.payload));
                break;

            case ViewActions.GET_ARTISTS:
                ModelDispatcher.requests.broadcast(new Action(ModelActions.requests.GET_ARTISTS, {session: ModelState.session}));
                break;

            case ViewActions.GET_LATEST_RELEASES:
                ModelDispatcher.requests.broadcast(new Action(ModelActions.requests.GET_LATEST_RELEASES, {artists: ModelState.artists, session: ModelState.session}));
                break;

            default:
                break;
        }
    }

    ViewDispatcher.requests.addListener(this, _handleViewRequests);
    APIDispatcher.notifications.addListener(this, _handleAPINotifications);
}

module.exports = new ModelReceiver();
