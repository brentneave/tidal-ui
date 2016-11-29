const Action = require('./events/Action.js'),
      API = require('./api/API.js'),
      View = require('./view/View.js'),
      ViewEvents = require('./view/ViewEvents.js'),
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

    const _handleAPIError = function(e)
    {
        console.log('App._handleAPIError');
        console.log(e);
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
        .then
        (
            _loadFavoriteArtists
        )
    }

    const _loadFavoriteArtists = function()
    {
        return API.loadFavoriteArtists(_state.session)
        .then
        (
            function(response)
            {
                _update(new Action(Reducer.actions.FAVORITE_ARTISTS, response));
                _loadRecommendedArtists();
            }
        )
    }

    const _loadRecommendedArtists = function()
    {
        return API.loadMultipleSimilarArtists(_state.session, _state.favorites.artists, 1)
        .then
        (
            function(response)
            {
                _update(new Action(Reducer.actions.RECOMMENDED_ARTISTS, response));
                _loadRecommendedAlbums();
            }
        )
    }

    const _loadRecommendedAlbums = function()
    {
        return API.loadMultipleArtistAlbums(_state.session, _state.recommendations.artists, 1)
        .then
        (
            function(response)
            {
                _update(new Action(Reducer.actions.RECOMMENDED_ALBUMS, response));
            }
        )
    }


    ViewEvents.login.addListener(this, _login);


    _update();
}

module.exports = new App();
