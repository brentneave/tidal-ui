const
    Action = require('../events/Action'),
    Broadcaster = require('../events/Broadcaster'),
    APIRequest = require('./APIRequest');

const APIDispatcher = function()
{
    const _actions = new Broadcaster();

    const _broadcastResponseAction = function(e)
    {
        if(e.source.responseAction)
        {
            console.log(e.source.responseAction);
            _actions.broadcast
            (
                new Action(e.source.responseAction, e)
            );
        }
    }

    const _broadcastErrorAction = function(e)
    {
        if(e.source.responseAction)
        {
            _actions.broadcast
            (
                new Action(e.source.errorAction, e)
            );
        }
    }

    const _onCreateInstance = function(instance)
    {
        instance.onResponse.addListener(this, _broadcastResponseAction);
        instance.onError.addListener(this, _broadcastErrorAction);
    }

    APIRequest.onCreateInstance.addListener(this, _onCreateInstance);

    Object.defineProperty(this, 'actions', { value: _actions });
}
module.exports = new APIDispatcher();
