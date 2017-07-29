const
    nav = require('../components/nav'),
    loading = require('../components/loading'),
    albumList = require('../components/albumList'),
    loginCheck = require('../components/loginCheck');



const latestAlbums = function({ state, props, actions }) {

    const content = {

        tagName: 'div',
        childNodes: [

            nav({
                state: state,
                actions: actions
            }),

            {
                tagName: 'h1',
                textContent: 'Latest Albums'
            },

            state.route.data ? albumList({
                state: state,
                props: { albums: state.route.data },
                actions: actions
            }) : {
                tagName: 'div'
            }

        ]

    }

    return loginCheck({
        state,
        props: { content },
        actions
    });

}



module.exports = latestAlbums;
