const
    api = require('../api/api'),
    page = require('../components/page'),
    albumList = require('../components/albumList'),
    artistList = require('../components/artistList'),
    sectionHeader = require('../components/sectionHeader'),
    buttonMinimal = require('../components/buttonMinimal');



const load = ({ state, subpath }) => ({
    recommendedAlbums: api.loadRecommendedAlbums(state.session, 2, 1, 2),
    favoriteAlbums: api.loadFavoriteAlbums(state.session),
    recommendedArtists: api.loadRecommendedArtists(state.session, 1, 8),
    favoriteArtists: api.loadFavoriteArtists(state.session),
    latestAlbums: api.loadLatestAlbums(state.session)
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

                    state.route.data.favoriteAlbums ? sectionHeader({
                        props: {
                            title: 'Favorite Albums',
                            linkText: 'See All',
                            link: '/favorites/albums'
                        },
                        actions
                    }) : null,

                    state.route.data.favoriteAlbums ? albumList({
                        state: state,
                        props: { albums: state.route.data.favoriteAlbums.slice(0, 4) },
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

                    state.route.data.favoriteArtists ? sectionHeader({
                        props: {
                            title: 'Favorite Artists',
                            linkText: 'See All',
                            link: '/favorites/artists'
                        },
                        actions
                    }) : null,

                    state.route.data.favoriteArtists ? artistList({
                        state: state,
                        props: { artists: state.route.data.favoriteArtists.slice(0, 4) },
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
                    }) : null,

                    buttonMinimal({
                        props: {
                            label: 'Log Out',
                            on: { click: actions.logout }
                        }
                    }),

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
