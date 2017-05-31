const
    Broadcaster = require('./utils/Broadcaster'),
    isNotEmptyString = require('./utils/isNotEmptyString'),
    components = require('./routes/all'),
    clone = require('./utils/clone');



const Router = function() {



    const _events = {
        onSetRoute: new Broadcaster()
    }



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
                        component: components.favoriteArtists,
                        action: Actions.loadFavoriteArtists
                    },

                    'albums': {
                        component: components.favoriteAlbums,
                        action: Actions.loadFavoriteAlbums
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



    const _setRoute = function(path) {
        const route = _get(path);
        _events.onSetRoute.broadcast(route);
        history.pushState(null, null, route.path);
    }



    window.onpopstate = function(event) {
        _setRoute(location.pathname);
    }



    const _onRouterLinkClick = function(event) {
        event.preventDefault();
        const path = event.target.getAttribute('href');
        _setRoute(path);
    }



    Object.defineProperties(this, {
        'events': { value: _events }
    });



}




module.exports = Router;
