const
    api = require('../api/api'),
    page = require('../components/page'),
    loading = require('../components/loading'),
    albumList = require('../components/albumList'),
    loginCheck = require('../components/loginCheck'),
    pageHeader = require('../components/pageHeader');



const load = ({ state, subpath }) => ({

    albums: api.loadFavoriteAlbums(state.session)

});



const component = function({ state, props, actions }) {

    const content = {

        tagName: 'div',
        childNodes: [

            pageHeader({
                props: {
                    title: 'Favorite Albums'
                },
                actions
            }),

            state.route.data.albums ? albumList({
                state: state,
                props: { albums: state.route.data.albums },
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
