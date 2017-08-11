const
    api = require('../api/API'),
    update = require('./update');



const actions = Object.freeze({

    login: function(credentials) {

        api.login(credentials)
            .then(
                (response) => (
                    response.error ?
                    update({
                        action: 'ERROR',
                        payload: { message: 'Please check your login details and try again.' }
                    }) :
                    update({
                        action: 'LOGIN',
                        payload: { session: response.session }
                    })
                )
            )

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
