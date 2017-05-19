const
    isNotEmptyString = require('./utils/isNotEmptyString'),
    clone = require('./utils/clone');



const Routes = function() {



    const _routes = {

        component: 'home',

        routes: {

            'default': {
                component: 'home'
            },

            'favorites': {
                component: 'favorites',

                routes: {

                    'artists': {
                        component: 'favoriteArtists',
                        action: 'loadFavoriteArtists'
                    }

                }
            },

            'recommended': {
                component: 'recommended'
            }

        }

    };



    const _get = function(path) {

        const clean = path.replace(/^.*\/\/[^\/]+/, ''),
            segments = clean.split('/').filter(isNotEmptyString);

        var
            route = _routes,
            data = {},
            i = 0;

        segments.map(function(segment) {

            if (route.routes) {
                route = route.routes[segment] ?
                    route.routes[segment] :
                    route.routes['default'];
            } else {
                route = route;
            }

            i++;

        });

        return clone(route);

    };



    return Object.freeze({
        get: _get
    });



}




module.exports = Routes;
