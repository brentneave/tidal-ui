const
    Store = require('./Store'),
    Actions = require('./Actions'),
    AddressBar = require('./AddressBar'),
    renderView = require('./renderView'),
    Local = require('./Local');



const App = function() {


    console.log(Store());
    const
        _store = Store(),
        _local = Local,
        _renderView = renderView,
        _update = function(state) {

            console.log('App.update(', state, ')');

            _renderView({ state: state, actions: _actions });
            _addressBar.update(state);
            _local.write(state);
        },
        _actions = Actions({ store: _store, callback: _update }),
        _addressBar = AddressBar(_actions.popState),
        _localState = _local.read();



    _localState ?
        _actions.loadState(_localState) :
        _actions.init();



    return this;



}




module.exports = App();
