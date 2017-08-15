const
    router = require('./router'),
    update = require('./update');




const load = function(state) {

    console.log('load', state);

    if (state.route.fresh || !state.session.id) return;

    const route = router.get(state);

    console.log('route.load: ', route.load);

    if (!route.load) return;

    const requests = route.load({
        state: state,
        subpath: route.subpath
    });

    // PARALLEL:
    // Object.keys(requests).map(
    //     (key) => (
    //         requests[key].then(
    //             (response) => update({
    //                 action: 'APPEND_ROUTE_DATA',
    //                 payload: {
    //                     path: state.path.str,
    //                     key,
    //                     value: response
    //                 }
    //             })
    //         )
    //     )
    // );

    // SERIAL:
    const loadIncremental = function(keys) {
        if (keys.length) {
            requests[keys[0]].then(
                (response) => update({
                    action: 'APPEND_ROUTE_DATA',
                    payload: {
                        path: state.path.str,
                        key: keys[0],
                        value: response
                    }
                })
            ).then(
                loadIncremental(keys.slice(1))
            )
        }
    };

    loadIncremental(Object.keys(requests));


}



module.exports = load;
