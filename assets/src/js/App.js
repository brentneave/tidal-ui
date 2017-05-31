const
    Store = require('./Store'),
    Actions = require('./Actions'),
    Routes = require('./Routes'),
    AddressBar = require('./AddressBar'),
    renderView = require('./renderView'),
    Local = require('./Local');



const App = function() {



    const
        _actions = new Actions(),
        _store = new Store(),
        _router = new Router(),
        _local = new Local(),
        _view = new View();



    _actions.events.createAction.addListener({
        scope: Store,
        handler: Store.onCreateAction
    });



    _store.events.stateChange.addListeners({
        scope: View,
        handler: View.onStateChange
    }, {
        scope: Local,
        handler: Local.onStateChange
    });



    _view.events.routerLinkClick.addListener({
        scope: Router,
        handler: Router.onRouterLinkClick
    });



    _view.events.submitLogin.addListener({
        scope: Actions,
        handler: Actions.onSubmitLogin
    });



    _router.events.routeChange.addListeners({
        scope: View,
        handler: View.onRouteChange
    }, {
        scope: Local,
        handler: Local.onRouteChange
    });



    Store.init();



}




module.exports = App();
