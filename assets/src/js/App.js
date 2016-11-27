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
                console.log('app got the api response')
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
        API.loadFavoriteArtists(_state.session)
        .then
        (
            function(response)
            {
                _update(new Action(Reducer.actions.FAVORITE_ARTISTS, response));
            }
        )
    }

    // const _favouriteArtists = function()
    // {
    //     console.log('App._favouriteArtists');
    //     const request = new API.FavoriteArtistsRequest(_state.session, _state.user);
    //     request.onResponse.addListener(_that, function(e)
    //     {
    //         _update(new Action(Reducer.actions.FAVORITE_ARTISTS, e), false);
    //         _recommendedArtists();
    //     });
    //     request.onError.addListener(_that, _handleAPIError);
    //     request.send();
    // }
    //
    // const _recommendedArtists = function()
    // {
    //     console.log('App._recommendedArtists');
    //     const request = new API.RecommendedArtistsRequest(_state.session, _state.favorites.artists);
    //     request.onResponse.addListener(_that, function(e)
    //     {
    //         _update(new Action(Reducer.actions.RECOMMENDED_ARTISTS, e), false);
    //         _recommendedAlbums();
    //     });
    //     request.onError.addListener(_that, _handleAPIError);
    //     request.send();
    // }
    //
    // const _recommendedAlbums = function()
    // {
    //     console.log('App._recommendedAlbums');
    //     const request = new API.LatestAlbumsRequest(_state.session, _state.favorites.artists.concat(_state.recommendations.artists));
    //     request.onResponse.addListener(_that, function(e)
    //     {
    //         _update(new Action(Reducer.actions.RECOMMENDED_ALBUMS, e), true);
    //     });
    //     request.onError.addListener(_that, _handleAPIError);
    //     request.send();
    // }

    ViewEvents.login.addListener(this, _login);

    // const _localState = LocalStorage.readState();
    // if(_localState)
    // {
    //     _update(new Action(Reducer.actions.RESTORE_LOCAL_STATE, { state: LocalStorage.readState() }));
    //     // _recommendedAlbums();
    // }
    // else
    // {
    //     _update();
    // }
    _update();
}

module.exports = new App();
