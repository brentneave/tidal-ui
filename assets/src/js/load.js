const routes = require('./routes');



const load = function(state) {

    console.log('load', state);

    const route = routes.get(state);

    // console.log('route:', route);

    return route.load ?
        route.load({
            state: state,
            subpath: route.subpath
        }) :
        state;

}



module.exports = load;
