const
    clone = require('./utils/clone'),
    api = require('./api/api');



const Actions = function({ store, callback, routes }) {



    const
        _events = Object.freeze({
            createAction: new Broadcaster()
        })



    const _do = function(action, payload) {

        _events.createAction.broadcast({ action, payload });

    };



    this.init = function() {

        _do('INIT');

    };



    this.popState = function(event) {

        console.log('popState', this);
        const path = event.state.route.path;
        _that.route(path);

    };



    this.loadState = function(newState) {

        _do('LOAD_STATE', { newState });
        this.route(newState.route.path);

    };



    this.login = function(credentials) {

        const handleResponse = function(response) {
            response.error ?
                _do('LOGIN_FAIL', { error: response.error }) :
                _do('LOGIN', { session: response.session });
        }

        api.login(credentials).then(handleResponse);

    };



    this.logout = function() {

        _do('LOGOUT');

    };



    this.route = function(path) {

        const route = routes.get(path);
        console.log('Actions.route', path, route, route.init);
        _do('SET_ROUTE', { path, route });

        if (route.init) route.init();

    };



    this.routerLink = function(event) {

        event.preventDefault();
        const path = event.target.getAttribute('href');
        _that.route(path);

    };



    this.loadFavoriteArtists = function(state) {

        console.log('Actions.loadFavoriteArtists', state)
        const handleResponse = function(response) {
            response.error ?
                _do('DISPLAY_ERROR', { error: response.error }) :
                _do('FAVORITE_ARTISTS', { artists: response });
        }

        api.loadFavoriteArtists(state.session).then(handleResponse);

    };



    Object.defineProperties(this, {
        'events': {
            value: _events
        }
    });




};




module.exports = Actions;
