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

    var _update = function(action)
    {
        console.log('App.update');
        _state = Reducer.reduce(_state, action);
        View.render(_state);
    }

    // generic api error
    const _handleAPIError = function(e)
    {
        console.log('App._handleAPIError');
        console.log(e);
    }

    const _login = function(e)
    {
        console.log('App._login');
        const request = new API.LoginRequest(e.username, e.password);
        request.onResponse.addListener(this, function(e)
        {
            // _update(new Action(Reducer.actions.LOGIN, e));
            _state = Reducer.reduce(_state, new Action(Reducer.actions.LOGIN, e));
            _favouriteArtists();
        });
        request.onError.addListener(this, function(e)
        {
            _update(new Action(Reducer.actions.LOGIN_ERROR));
        });
        request.send();
    }

    const _favouriteArtists = function()
    {
        console.log('App._favouriteArtists');
        const request = new API.FavoriteArtistsRequest(_state.session, _state.user);
        request.onResponse.addListener(_that, function(e)
        {
            // _update(new Action(Reducer.actions.FAVORITE_ARTISTS, e));
            _state = Reducer.reduce(_state, new Action(Reducer.actions.FAVORITE_ARTISTS, e));
            _recommendedArtists();
        });
        request.onError.addListener(_that, _handleAPIError);
        request.send();
    }

    const _recommendedArtists = function()
    {
        console.log('App._recommendedArtists');
        const request = new API.RecommendedArtistsRequest(_state.session, _state.favorites.artists);
        request.onResponse.addListener(_that, function(e)
        {
            // _update(new Action(Reducer.actions.RECOMMENDED_ARTISTS, e));
            _state = Reducer.reduce(_state, new Action(Reducer.actions.RECOMMENDED_ARTISTS, e));
            _recommendedAlbums();
        });
        request.onError.addListener(_that, _handleAPIError);
        request.send();
    }

    const _recommendedAlbums = function()
    {
        console.log('App._recommendedAlbums');
        const request = new API.LatestAlbumsRequest(_state.session, _state.favorites.artists.concat(_state.recommendations.artists));
        request.onResponse.addListener(_that, function(e)
        {
            _update(new Action(Reducer.actions.RECOMMENDED_ALBUMS, e));
        });
        request.onError.addListener(_that, _handleAPIError);
        request.send();    
    }

    ViewEvents.login.addListener(this, _login);

    _update();
}

module.exports = new App();