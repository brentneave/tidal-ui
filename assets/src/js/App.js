const Action = require('./events/Action.js'),
API = require('./api/API.js'),
View = require('./view/View.js'),
ViewEvents = require('./view/ViewEvents.js'),
Router = require('./router/Router.js'),
Reducer = require('./reducer/Reducer.js'),
LocalStorage = require('./localstorage/LocalStorage.js');


const App = function()
{
    const _that = this;

    var _state;

    const _update = function(action)
    {
        console.log('App._update');
        Reducer.reduce(_state, action).then
        (
            function(state)
            {
                _state = state;
                View.render(_state);
                LocalStorage.writeState(_state);
                Router.updateCurrentRoute(_state);
            }
        );
    }

    const _login = function(form)
    {
        console.log('App._login');
        return API.login(form)
        .then
        (
            function(response)
            {
                _update(new Action(Reducer.actions.LOGIN, response));
            }
        )
    }


    const _route = function(path)
    {
        _update(new Action(Reducer.actions.UNLOAD_CURRENT_ROUTE, { path: path }));
        _update(new Action(Reducer.actions.SET_ROUTE, { path: path }));
    }

    ViewEvents.login.addListener(this, _login);
    ViewEvents.setRoute.addListener(this, _route);
    window.onpopstate = function(event) {
        console.log('window.onpopstate');
        console.log(event.state)
       _update(new Action(Reducer.actions.RESTORE_STATE, event.state));
    };

    // load state from cache
    _update(new Action(Reducer.actions.RESTORE_STATE, LocalStorage.readState()));

    // update history with state
    Router.updateCurrentRoute(_state);

}

module.exports = new App();
