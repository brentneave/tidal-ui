const
    api = require('../api/api'),
    page = require('../components/page'),
    albumList = require('../components/albumList'),
    artistList = require('../components/artistList'),
    pageHeader = require('../components/pageHeader'),
    sectionHeader = require('../components/sectionHeader');



const load = ({ state, subpath }) => ({
    recommendedAlbums: api.loadRecommendedAlbums(state.session, 2, 1, 2),
    recommendedArtists: api.loadRecommendedArtists(state.session, 1, 8),
    latestAlbums: api.loadLatestAlbums(state.session)
});



const component = ({ state, props, actions }) => (

    page({

        state,

        props: {

            content: {

                tagName: 'div',
                childNodes: [

                    pageHeader({
                        props: { title: 'Recommended' }
                    }),

                    state.route.data.recommendedAlbums ? sectionHeader({
                        props: {
                            title: 'Recommended Albums',
                            linkText: 'See All',
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
                            linkText: 'See All',
                            link: '/recommended/artists'
                        },
                        actions
                    }) : null,

                    state.route.data.recommendedArtists ? artistList({
                        state: state,
                        props: { artists: state.route.data.recommendedArtists.slice(0, 4) },
                        actions: actions
                    }) : null,

                    state.route.data.latestAlbums ? sectionHeader({
                        props: {
                            title: 'Recent Releases',
                            linkText: 'See All',
                            link: '/latest/albums'
                        },
                        actions
                    }) : null,

                    state.route.data.latestAlbums ? albumList({
                        state: state,
                        props: { albums: state.route.data.latestAlbums.slice(0, 4) },
                        actions: actions
                    }) : null

                ]

            }

        },

        actions

    })

)



module.exports = { load, component };
