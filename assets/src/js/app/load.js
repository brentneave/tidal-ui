const
    router = require('./router'),
    update = require('./update');




const load = function(state) {

    const route = router.get(state);

    console.log('load', state.data.fresh, state.session.id, route.load);

    if (!state.data.fresh && state.session.id && route.load) {

        route.load({
            state: state,
            subpath: route.subpath
        });

    }

}



module.exports = load;