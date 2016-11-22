const
    Action = require('../events/Action'),
    Broadcaster = require('../events/Broadcaster'),
    APIRequest = require('./APIRequest'),
    RecommendedArtistsRequest = require('./types/RecommendedArtistsRequest');

const APIDispatcher = function()
{
    const _notifications = new Broadcaster();

    const _broadcastResponseAction = function(e)
    {
        if(e.source.responseAction)
        {
            _notifications.broadcast
            (
                new Action(e.source.responseAction, e)
            );
        }
    }

    const _broadcastErrorAction = function(e)
    {
        console.log('dispatcher onerror ' + e.source.errorAction);
        console.log(e.source);
        if(e.source.errorAction)
        {
            _notifications.broadcast
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

    Object.defineProperty(this, 'notifications', { value: _notifications });
}
module.exports = new APIDispatcher();
