const
    api = require('../api/api'),
    nav = require('../components/nav'),
    loading = require('../components/loading'),
    artistList = require('../components/artistList'),
    loginCheck = require('../components/loginCheck');



const load = ({ state, subpath }) =>
    api.loadFavoriteArtists(state.session);



const component = function({ state, props, actions }) {



    const artists = state.route.data || [];



    const content = {

        tagName: 'div',
        childNodes: [

            nav({
                state: state,
                actions: actions
            }),

            {
                tagName: 'h1',
                textContent: 'Favorite Artists'
            },

            artistList({
                state: state,
                props: {
                    artists: artists
                },
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



module.exports = { load, component };
