const
    nav = require('../components/nav'),
    loading = require('../components/loading'),
    artistList = require('../components/artistList'),
    loginCheck = require('../components/loginCheck');



const recommendedArtists = function({ state, props, actions }) {

    const content = {

        tagName: 'div',
        childNodes: [

            nav({
                state: state,
                actions: actions
            }),

            {
                tagName: 'h1',
                textContent: 'Recommended Artists'
            },

            artistList({
                state: state,
                props: { artists: state.route.data || [] },
                actions: actions
            })

        ]
    }

    return loginCheck({
        state,
        props: {
            content: content
        },
        actions
    });

}



module.exports = recommendedArtists;
