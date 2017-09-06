const
    api = require('../api/API'),
    update = require('./update');



const actions = Object.freeze({

    login: function(credentials) {

        api.login(credentials)
            .then(
                (response) => (
                    response.error ?
                    update({
                        action: 'ERROR',
                        payload: { errors: 'Please check your login details and try again.' }
                    }) :
                    update({
                        action: 'LOGIN',
                        payload: { session: response.session }
                    })
                )
            )

    },

    logout: function() {
        update({
            action: 'LOGOUT',
            payload: null
        })
    },

    route: function(path) {
        update({
            action: 'ROUTE',
            payload: { path }
        })
    },

    link: function(event) {
        event.preventDefault();
        update({
            action: 'ROUTE',
            payload: {
                path: event.target.closest('a[href]').getAttribute('href')
            }
        })
    },

    loadFavoriteAlbums: function(session) {
        api.loadFavoriteAlbums(session).then(
            (albums) => {
                update({
                    action: 'SET_FAVORITE_ALBUMS',
                    payload: { albums }
                });
                update({
                    action: 'ADD_ALBUM_DETAILS',
                    payload: { albums }
                });
            }
        )
    },

    loadRecommendedAlbums: function(session) {
        api.loadRecommendedAlbums(session).then(
            (albums) => {
                update({
                    action: 'SET_RECOMMENDED_ALBUMS',
                    payload: { albums }
                });
                update({
                    action: 'ADD_ALBUM_DETAILS',
                    payload: { albums }
                });
            }
        )
    },

    loadLatestAlbums: function(session) {
        api.loadLatestAlbums(session).then(
            (albums) => {
                update({
                    action: 'SET_LATEST_ALBUMS',
                    payload: { albums }
                });
                update({
                    action: 'ADD_ALBUM_DETAILS',
                    payload: { albums }
                });
            }
        )
    },

    loadFavoriteArtists: function(session) {
        api.loadFavoriteArtists(session).then(
            (artists) => {
                update({
                    action: 'SET_FAVORITE_ARTISTS',
                    payload: { artists }
                });
                update({
                    action: 'ADD_ARTIST_DETAILS',
                    payload: { artists }
                });
            }
        )
    },

    loadRecommendedArtists: function(session) {
        api.loadRecommendedArtists(session, 1, 36).then(
            (artists) => {
                update({
                    action: 'SET_RECOMMENDED_ARTISTS',
                    payload: { artists }
                });
                update({
                    action: 'ADD_ARTIST_DETAILS',
                    payload: { artists }
                });
            }
        )
    },

    loadAlbumDetails: function(session, album) {
        console.log('Actions.loadAlbumDetails', session, album);
        api.loadAlbumDetails(session, album).then(
            (album) => update({
                action: 'ADD_ALBUM_DETAILS',
                payload: { albums: [album] }
            })
        )
    },

    loadAlbumTracks: function(session, album) {
        console.log('Actions.loadAlbumTracks', session, album);
        api.loadAlbumTracks(session, album).then(
            (tracks) => update({
                action: 'ADD_ALBUM_TRACKS',
                payload: { album, tracks }
            })
        )
    },

    loadSimilarAlbums: function(session, album) {
        api.loadSimilarAlbums(session, album).then(
            (similarAlbums) => update({
                action: 'ADD_SIMILAR_ALBUMS',
                payload: { album, similarAlbums }
            })
        )
    },

    loadArtistDetails: function(session, artist) {
        api.loadArtistDetails(session, artist).then(
            (artist) => update({
                action: 'ADD_ARTIST_DETAILS',
                payload: { artist }
            })
        )
    },

    loadArtistAlbums: function(session, artist) {
        api.loadArtistAlbums(session, artist).then(
            (albums) => update({
                action: 'ADD_ARTIST_ALBUMS',
                payload: { artist, albums }
            })
        )
    },

    loadSimilarArtists: function(session, artist) {
        api.loadSimilarArtists(session, artist).then(
            (similar) => update({
                action: 'ADD_SIMILAR_ARTISTS',
                payload: { artist, similar }
            })
        )
    },

    playTrack: function({ session, track, quality }) {
        console.log('actions.playTrack', ...arguments);
        api.getStreamingURL(
            session,
            track,
            quality
        ).then(
            (response) => update({
                action: 'PLAY_TRACK',
                payload: { streamingDetails: response }
            })
        )
    }

});



module.exports = actions;