const Action = require('../events/Action'),
      ModelDispatcher = require('../model/ModelDispatcher'),
      ModelActions = require('../model/ModelActions'),
      LocalStorageDispatcher = require('./LocalStorageDispatcher'),
      LocalStorageActions = require('./LocalStorageActions');

const LocalStorageReceiver = function()
{
    const _readLocalState = function()
    {
        return JSON.parse(localStorage.getItem("state"))

    }

    const _writeLocalState = function(state)
    {
        localStorage.setItem("state", JSON.stringify(state));
        return _readLocalState();
    }

    const _handleModelNotifications = function(action)
    {
        console.log('LocalStorageReceiver._handleModelNotifications: ');
        console.log(action);

        switch (action.type) {
            case ModelActions.notifications.INITIALISE:
                console.log('LocalStorageReceiver._readLocalState:');
                console.log(_readLocalState());
                LocalStorageDispatcher.notifications.broadcast
                (
                    new Action
                    (
                        LocalStorageActions.READ_LOCAL_STATE,
                        { state: _readLocalState() }
                    )
                );
                break;

            case ModelActions.notifications.STATE_CHANGE:
                _writeLocalState(action.payload.state);
                break;

            default:
                break;
        }
    }

    ModelDispatcher.notifications.addListener(this, _handleModelNotifications);

}

module.exports = new LocalStorageReceiver();
