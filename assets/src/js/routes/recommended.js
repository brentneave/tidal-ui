const
    actions = require('../app/actions'),
    api = require('../api/api'),
    page = require('../components/page'),
    albumList = require('../components/albumList'),
    artistList = require('../components/artistList'),
    pageHeader = require('../components/pageHeader'),
    sectionHeader = require('../components/sectionHeader');



const load = function({ state, subpath }) {
    actions.loadRecommendedAlbums(state.session);
    actions.loadRecommendedArtists(state.session);
    actions.loadLatestAlbums(state.session);
};



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

                    state.data.recommended.albums ? sectionHeader({
                        props: {
                            title: 'Recommended Albums',
                            linkText: 'See All',
                            link: '/recommended/albums'
                        },
                        actions
                    }) : null,

                    state.data.recommended.albums ? albumList({
                        state: state,
                        props: { albums: state.data.recommended.albums.slice(0, 4) },
                        actions: actions
                    }) : null,

                    state.data.recommended.artists ? sectionHeader({
                        props: {
                            title: 'Recommended Artists',
                            linkText: 'See All',
                            link: '/recommended/artists'
                        },
                        actions
                    }) : null,

                    state.data.recommended.artists ? artistList({
                        state: state,
                        props: { artists: state.data.recommended.artists.slice(0, 4) },
                        actions: actions
                    }) : null,

                    state.data.latest.albums ? sectionHeader({
                        props: {
                            title: 'Recent Releases',
                            linkText: 'See All',
                            link: '/latest/albums'
                        },
                        actions
                    }) : null,

                    state.data.latest.albums ? albumList({
                        state: state,
                        props: { albums: state.data.latest.albums.slice(0, 4) },
                        actions: actions
                    }) : null

                ]

            }

        },

        actions

    })

)



module.exports = { load, component };
