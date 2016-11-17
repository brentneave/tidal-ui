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
            ModelDispatcher.actions.broadcast(new Action(ModelActions.GET_ARTISTS, { session: ModelState.session }));
            break;

            case APIActions.RESPONSE_ARTISTS:
            var n = action.payload.body.items.length,
            i;
            for(i=0; i<n; i++)
            {
                console.log(action.payload.body.items[i].item);
            }
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
            default:
            break;
        }
    }

    ViewDispatcher.addListener(this, _handleViewActions);
    APIDispatcher.actions.addListener(this, _handleAPIActions);
}

module.exports = new ModelReceiver();
