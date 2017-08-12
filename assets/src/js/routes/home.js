const
    api = require('../api/api'),
    page = require('../components/page'),
    albumList = require('../components/albumList'),
    artistList = require('../components/artistList'),
    sectionHeader = require('../components/sectionHeader');



const load = ({ state, subpath }) => ({
    recommendedAlbums: api.loadRecommendedAlbums(state.session, 2, 1, 2),
    recommendedArtists: api.loadRecommendedArtists(state.session, 1, 8)
});



const component = ({ state, props, actions }) => (

    page({

        state,

        props: {

            title: 'Hi.',
            content: {

                tagName: 'div',
                childNodes: [

                    state.route.data.recommendedAlbums ? sectionHeader({
                        props: {
                            title: 'Recommended Albums',
                            linkText: 'See More',
                            link: '/recommended/albums'
                        },
                        actions
                    }) : null,

                    state.route.data.recommendedAlbums ? albumList({
                        state: state,
                        props: { albums: state.route.data.recommendedAlbums.slice(0, 4) },
                        actions: actions
                    }) : null,

                    state.route.data.recommendedArtists ? sectionHeader({
                        props: {
                            title: 'Recommended Artists',
                            linkText: 'See More',
                            link: '/recommended/artists'
                        },
                        actions
                    }) : null,

                    state.route.data.recommendedArtists ? artistList({
                        state: state,
                        props: { artists: state.route.data.recommendedArtists.slice(0, 4) },
                        actions: actions
                    }) : null,

                    {
                        tagName: 'button',
                        textContent: 'Log Out',
                        on: {
                            click: actions.logout
                        }
                    }

                ]

            }

        },

        actions

    })

)



module.exports = { load, component };
