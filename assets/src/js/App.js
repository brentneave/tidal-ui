const
    Store = require('./Store'),
    Actions = require('./Actions'),
    Routes = require('./Routes'),
    AddressBar = require('./AddressBar'),
    renderView = require('./renderView'),
    Local = require('./Local');



const App = function() {


    console.log(Store());
    const
        _store = new Store(),
        _routes = Routes(),
        _local = Local,
        _renderView = renderView,
        _localState = _local.read(),
        _update = function({ state }) {
            console.log('state', state);
            _renderView({ state: state, actions: _actions });
            _addressBar.update(state);
            _local.write(state);
        },
        _actions = new Actions({
            store: _store,
            callback: _update,
            routes: _routes
        }),
        _addressBar = AddressBar({ actions: _actions, popState: _actions.popState });



    _localState ?
        _actions.loadState(_localState) :
        _actions.init();



    return this;



}




module.exports = App();
