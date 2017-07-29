const
    api = require('../api/api'),
    reduce = require('./reduce'),
    clone = require('../utils/clone'),
    routes = require('../routes/_map');



const get = function(state) {

    const path = state.path.arr;

    var
        route = routes,
        subpath = path,
        data = {},
        i = 0;

    path.map((segment) => {

        if (route.routes) {
            subpath = path.slice(i);
            route = route.routes[segment] ||
                route.routes['default'] ||
                route;
        }

        i++;

    });

    return {
        load: route.load,
        component: route.component,
        subpath: subpath
    };

}



module.exports = { get }
