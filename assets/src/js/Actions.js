const update = require('./update');



const actions = Object.freeze({

    login: function(credentials) {
        update({
            action: 'LOGIN',
            payload: credentials
        })
    },

    logout: function() {
        update({
            action: 'LOGOUT',
            payload: null
        })
    },

    route: function(path) {
        update({
            action: 'ROUTE',
            payload: { path }
        })
    },

    link: function(event) {
        event.preventDefault();
        update({
            action: 'ROUTE',
            payload: {
                path: event.target.closest('a[href]').getAttribute('href')
            }
        })
    }
});



module.exports = actions;
