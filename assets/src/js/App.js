const Action = require('./events/Action.js'),
    API = require('./api/API.js'),
    View = require('./view/View.js'),
    ViewEvents = require('./view/ViewEvents.js'),
    Router = require('./router/Router.js'),
    Reducer = require('./reducer/Reducer.js'),
    LocalStorage = require('./localstorage/LocalStorage.js'),
    _fetchData = require('./fetchData');

var _state,
    _remoteTransactionID = 0;


const _doAction = function(action) {
    return Reducer.reduce(action, _state);
}

const _init = function() {
    return _doAction(new Action(Reducer.actions.INIT));
}

const _readLocalStorage = function() {
    return _doAction(new Action(Reducer.actions.RESTORE_SESSION_FROM_LOCAL_STORAGE, LocalStorage.readState()));
}

const _updateUI = function(state) {
    View.deriveUIState(state)
        .then(View.convertToHTML)
        .then(View.updateDOM);
};

const _loadRoute = function(path) {

    const clearCurrentRouteData = function() {
        return _doAction(
            new Action(Reducer.UNLOAD_CURRENT_ROUTE, {
                path: path,
                data: null
            })
        );
    }

    const fetchRouteData = function(state) {
        return _fetchData(path, state, _remoteTransactionID);
    }

    const saveFetchedRouteData = function(fetchedData) {
        if (fetchedData.remoteTransactionID === _remoteTransactionID) {
            return _doAction(
                new Action(Reducer.SET_CURRENT_ROUTE, {
                    path: path,
                    data: fetchedData.data
                })
            );
        } else {
            return _state;
        }
    };

    clearCurrentRouteData()
        .then(_updateUI)
        .then(fetchRouteData)
        .then(saveFetchedRouteData)
        .then(_updateUI);

    _transactionID++;
}


_init()
    .then(_readLocalStorage)
    .then(_updateUI);

// const App = function()
// {
//     const _that = this;
//
//     var _state;
//
//     const _update = function(action)
//     {
//         console.log('App._update');
//         return Reducer.reduce(_state, action).then(
//             function(state)
//             {
//                 _state = state;
//                 LocalStorage.writeState(_state);
//                 Router.updateCurrentRoute(_state);
//                 View.render(_state);
//             }
//         );
//     }
//
//     const _login = function(form)
//     {
//         console.log('App._login');
//         return API.login(form)
//             .then(
//                 function(response)
//                 {
//                     _update(new Action(Reducer.actions.LOGIN, response));
//                 }
//             )
//     }
//
//
//     const _route = function(path)
//     {
//         // TODO: handle race conditions from promises
//         const unload = function()
//             {
//                 return _update(new Action(Reducer.actions.UNLOAD_CURRENT_ROUTE));
//             },
//             getCache = function()
//             {
//                 return _update(new Action(Reducer.actions.LOAD_ROUTE_FROM_CACHE,
//                 {
//                     path: path
//                 }))
//             },
//             loadRemote = function()
//             {
//                 return _update(new Action(Reducer.actions.LOAD_ROUTE,
//                 {
//                     path: path
//                 }))
//             };
//
//         unload()
//             .then(getCache)
//             .then(loadRemote);
//     }
//
//     ViewEvents.login.addListener(this, _login);
//     ViewEvents.setRoute.addListener(this, _route);
//     window.onpopstate = function(event)
//     {
//         console.log('window.onpopstate');
//         console.log(event.state)
//         _update(new Action(Reducer.actions.RESTORE_STATE, event.state));
//     };
//
//     // load state from cache
//     _update(new Action(Reducer.actions.RESTORE_SESSION_FROM_LOCAL_STORAGE, LocalStorage.readState()));
//
//     // update history with state
//     Router.updateCurrentRoute(_state);
//
// }
//
// module.exports = new App();
//     const _route = function(path)
//     {
//         // TODO: handle race conditions from promises
//         const unload = function()
//             {
//                 return _update(new Action(Reducer.actions.UNLOAD_CURRENT_ROUTE));
//             },
//             getCache = function()
//             {
//                 return _update(new Action(Reducer.actions.LOAD_ROUTE_FROM_CACHE,
//                 {
//                     path: path
//                 }))
//             },
//             loadRemote = function()
//             {
//                 return _update(new Action(Reducer.actions.LOAD_ROUTE,
//                 {
//                     path: path
//                 }))
//             };
//
//         unload()
//             .then(getCache)
//             .then(loadRemote);
//     }
//
//     ViewEvents.login.addListener(this, _login);
//     ViewEvents.setRoute.addListener(this, _route);
//     window.onpopstate = function(event)
//     {
//         console.log('window.onpopstate');
//         console.log(event.state)
//         _update(new Action(Reducer.actions.RESTORE_STATE, event.state));
//     };
//
//     // load state from cache
//     _update(new Action(Reducer.actions.RESTORE_SESSION_FROM_LOCAL_STORAGE, LocalStorage.readState()));
//
//     // update history with state
//     Router.updateCurrentRoute(_state);
//
// }
//
// module.exports = new App();
