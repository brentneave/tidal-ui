const
    actions = require('../app/actions'),
    page = require('../components/page'),
    albumList = require('../components/albumList'),
    artistList = require('../components/artistList'),
    sectionHeader = require('../components/sectionHeader'),
    buttonMinimal = require('../components/buttonMinimal');



const load = function({ state, subpath }) {
    actions.loadRecommendedAlbums(state.session);
    actions.loadRecommendedArtists(state.session);
    actions.loadLatestAlbums(state.session);
};



const component = ({ state, props, actions }) => (

    page({

        state,

        props: {

            title: 'Hi.',
            content: {

                tagName: 'div',
                childNodes: [


                    state.data.recommended.albums.length ?
                    sectionHeader({
                        props: {
                            title: 'Recommended Albums',
                            linkText: 'See All',
                            link: '/recommended/albums'
                        },
                        actions
                    }) : null,

                    state.data.recommended.albums.length ?
                    albumList({
                        state: state,
                        props: { albums: state.data.recommended.albums.slice(0, 4) },
                        actions: actions
                    }) : null,

                    state.data.recommended.artists.length ? sectionHeader({
                        props: {
                            title: 'Recommended Artists',
                            linkText: 'See All',
                            link: '/recommended/artists'
                        },
                        actions
                    }) : null,

                    state.data.recommended.artists.length ? artistList({
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
                    }) : null,

                    {
                        tagName: 'div',
                        className: 'mw9 center pa5 tc',
                        childNodes: buttonMinimal({
                            props: {
                                label: 'Log Out',
                                attributes: {
                                    type: 'submit'
                                },
                                on: {
                                    click: actions.logout
                                }
                            }
                        })
                    }

                ]

            }

        },

        actions

    })
)



module.exports = { load, component };