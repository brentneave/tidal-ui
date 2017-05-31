const update = require('./update');



const actions = function(state) {

    return {

        login: function(credentials) {
            update({
                state: state,
                action: 'LOGIN',
                payload: credentials
            })
        },

        logout: function(credentials) {
            update({
                state: state,
                action: 'LOGOUT',
                payload: null
            })
        },

        route: function(path) {
            update({
                state: state,
                action: 'ROUTE',
                payload: { path }
            })
        },

        link: function(event) {
            event.preventDefault();
            const path = event.target.getAttribute('href');
            update({
                state: state,
                action: 'ROUTE',
                payload: { path }
            })
        }
    }

}



module.exports = actions;
