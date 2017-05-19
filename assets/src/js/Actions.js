const api = require('./api/api');



const Actions = function({ store, callback }) {



    const _do = function(action, payload) {

        const state = store.apply({ action, payload });
        callback(state);

    }



    return Object.freeze({



        init: function() {
            _do('INIT');
        },



        popState: function(event) {
            const path = event.state.route.path;
            _do('SET_ROUTE', { path });
        },



        loadState: function(newState) {
            _do('LOAD_STATE', { newState });
        },



        login: function(credentials) {

            const handleResponse = function(response) {
                response.error ?
                    _do('LOGIN_FAIL', { error: response.error }) :
                    _do('LOGIN', { session: response.session });
            }

            api.login(credentials).then(handleResponse);

        },



        logout: function() {

            _do('LOGOUT');

        }

    });



}



module.exports = Actions;
