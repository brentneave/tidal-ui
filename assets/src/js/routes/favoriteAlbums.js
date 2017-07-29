const
    api = require('../api/api'),
    nav = require('../components/nav'),
    loading = require('../components/loading'),
    albumList = require('../components/albumList'),
    loginCheck = require('../components/loginCheck');



const load = ({ state, subpath }) => ({

    albums: api.loadFavoriteAlbums(state.session)

});



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
                textContent: 'Favorite Albums'
            },

            state.route.data.albums ? albumList({
                state: state,
                props: { albums: state.route.data.albums },
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
