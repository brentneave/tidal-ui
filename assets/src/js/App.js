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

    const _update = function(action, updateView)
    {
        console.log('App._update');
        _state = Reducer.reduce(_state, action);
        if(updateView != false) View.render(_state);
        LocalStorage.writeState(_state);
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
        Router.setRoute(_state, path).then
        (
            function(response)
            {
                _update(new Action(Reducer.actions.SET_ROUTE, { path: path, data: response }));
            }
        )
    }

    ViewEvents.login.addListener(this, _login);
    ViewEvents.setRoute.addListener(this, _route);

    _update
    (
        new Action(Reducer.actions.RESTORE_LOCAL_STATE, LocalStorage.readState())
    );

    // const _loadFavoriteArtists = function()
    // {
    //     return API.loadFavoriteArtists(_state.session)
    //     .then
    //     (
    //         function(response)
    //         {
    //             _update(new Action(Reducer.actions.FAVORITE_ARTISTS, response));
    //         }
    //     )
    // }
    //
    // const _loadRecommendedArtists = function()
    // {
    //     return API.loadMultipleSimilarArtists(_state.session, _state.favorites.artists, 1)
    //     .then
    //     (
    //         function(response)
    //         {
    //             _update(new Action(Reducer.actions.RECOMMENDED_ARTISTS, response));
    //         }
    //     )
    // }
    //
    // const _loadRecommendedAlbums = function()
    // {
    //     return _loadFavoriteArtists()
    //     .then(_loadRecommendedArtists)
    //     .then
    //     (
    //         function()
    //         {
    //             API.loadMultipleArtistAlbums(_state.session, _state.recommendations.artists, 1)
    //             .then
    //             (
    //                 function(response)
    //                 {
    //                     _update(new Action(Reducer.actions.RECOMMENDED_ALBUMS, response));
    //                 }
    //             )
    //         }
    //     );
    // }

    // if(_state.session.id)
    // {
    //     _loadRecommendedAlbums();
    // }
}

module.exports = new App();
