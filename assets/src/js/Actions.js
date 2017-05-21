const
    clone = require('./utils/clone'),
    api = require('./api/api');



const Actions = function({ store, callback, routes }) {



    const
        _store = store,
        _callback = callback,
        _routes = routes,
        _that = this;



    const _do = function(action, payload) {
        _callback({
            state: _store.apply({
                action,
                payload
            })
        });

    };



    this.init = function() {

        _do('INIT');

    };



    this.popState = function(event) {

        console.log('popState', this);
        const path = event.state.route.path;
        this.route(path);

    };



    this.loadState = function(newState) {

        _do('LOAD_STATE', { newState });
        _that.route(newState.route.path);

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

        const route = clone(routes.get(path));
        _do('SET_ROUTE', { path, route });
        console.log('Action:', _that[route.action]);
        if (route.action && _that[route.action]) _that[route.action](_store.getCurrentState());

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




};




module.exports = Actions;
