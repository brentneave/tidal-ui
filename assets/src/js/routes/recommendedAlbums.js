const
    api = require('../api/api'),
    loading = require('../components/loading'),
    albumList = require('../components/albumList'),
    loginCheck = require('../components/loginCheck'),
    pageHeader = require('../components/pageHeader'),
    page = require('../components/page');



const load = ({ state, subpath }) => ({
    albums: api.loadRecommendedAlbums(state.session, 2, 1, 12)
})



const component = function({ state, props, actions }) {

    const content = {

        tagName: 'div',
        childNodes: [

            pageHeader({
                props: {
                    title: 'Recommended Albums'
                },
                actions
            }),

            state.route.data ? albumList({
                state: state,
                props: state.route.data,
                actions: actions
            }) : null

        ]

    }



    const login = loginCheck({
        state,
        props: { content },
        actions
    });



    return page({
        state,
        props: {
            content: login
        },
        actions
    })

}



module.exports = { load, component };
