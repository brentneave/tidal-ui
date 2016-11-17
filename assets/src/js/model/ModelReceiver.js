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

    const _handleAPIActions = function(action)
    {
        console.log('ModelReceiver handling ' + action.type);

        switch(action.type)
        {
            case APIActions.RESPONSE_LOGIN:
                ModelState.session.user = new User(action.payload.body.userId);
                ModelState.session.countryCode = action.payload.body.countryCode;
                ModelState.session.id = action.payload.body.sessionId;
                ModelDispatcher.actions.broadcast(new Action(ModelActions.LOGIN_RESPONSE, { state: ModelState }));
                break;

            case APIActions.ERROR_LOGIN:
                ModelState.session.user = null;
                ModelState.session.countryCode = null;
                ModelState.session.id = null;
                ModelDispatcher.actions.broadcast(new Action(ModelActions.LOGIN_ERROR, { state: ModelState }));
                break;

            case APIActions.RESPONSE_ARTISTS:
                var i, n = action.payload.body.items.length;
                for(i=0; i<n; i++)
                {
                    console.log(action.payload.body.items[i].item);
                    ModelState.artists.push(action.payload.body.items[i].item);
                }
                ModelDispatcher.actions.broadcast(new Action(ModelActions.ARTISTS_RESPONSE, { state: ModelState }));
                break;

            case APIActions.ERROR_ARTISTS:
                ModelDispatcher.actions.broadcast(new Action(ModelActions.ARTISTS_ERROR, { state: ModelState }));
                break;

            default:
            break;
        }
    }

    const _handleViewActions = function(action)
    {
        switch(action.type)
        {
            case ViewActions.LOGIN:
                ModelDispatcher.actions.broadcast(new Action(ModelActions.LOGIN, action.payload));
                break;
            case ViewActions.GET_ARTISTS:
                ModelDispatcher.actions.broadcast(new Action(ModelActions.GET_ARTISTS, {session: ModelState.session}));
                break;
            case ViewActions.GET_LATEST_RELEASES:
                ModelDispatcher.actions.broadcast(new Action(ModelActions.GET_LATEST_RELEASES, {artists: ModelState.artists, session: ModelState.session}));
                break;
            default:
                break;
        }
    }

    ViewDispatcher.addListener(this, _handleViewActions);
    APIDispatcher.actions.addListener(this, _handleAPIActions);
}

module.exports = new ModelReceiver();
