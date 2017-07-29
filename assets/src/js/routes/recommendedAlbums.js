const
    api = require('../api/api'),
    nav = require('../components/nav'),
    loading = require('../components/loading'),
    albumList = require('../components/albumList'),
    loginCheck = require('../components/loginCheck');



const load = ({ state, subpath }) => ({
    albums: api.loadRecommendedAlbums(state.session, 1, 1)
})



const component = function({ state, props, actions }) {

    const content = {

        tagName: 'div',
        childNodes: [

            nav({
                state: state,
                actions: actions
            }),

            {
                tagName: 'h1',
                textContent: 'Recommended Albums'
            },

            state.route.data ? albumList({
                state: state,
                props: state.route.data,
                actions: actions
            }) : null

        ]

    }

    return loginCheck({
        state,
        props: { content },
        actions
    });

}



module.exports = { load, component };
