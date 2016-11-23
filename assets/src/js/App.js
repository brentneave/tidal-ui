const Action = require('./events/Action.js'),
      API = require('./api/API.js'),
      View = require('./view/View.js'),
      ViewEvents = require('./view/ViewEvents.js'),
      Reducer = require('./reducer/Reducer.js'),
      LocalStorage = require('./localstorage/LocalStorage.js');


const App = function()
{
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
        const request = new API.LoginRequest(e.username, e.password);
        request.onResponse.addListener(this, function(e)
        {
            _update(new Action(Reducer.actions.LOGIN, e));
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
        const request = new API.FavoriteArtistsRequest(_state.session, _state.user);
        request.onResponse.addListener(this, function(e)
        {
            _update(new Action(Reducer.actions.FAVORITE_ARTISTS, e));
        });
        request.onError.addListener(this, _handleAPIError);
        request.send();
    }

    ViewEvents.login.addListener(this, _login);

    _update();
}

module.exports = new App();
