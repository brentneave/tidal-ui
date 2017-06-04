const
    nav = require('../components/nav'),
    loginCheck = require('../components/loginCheck'),
    albumDetails = require('../components/albumDetails');



const album = function({ state, props, actions }) {

    return loginCheck({
        state,
        props: {
            content: {
                tagName: 'div',
                childNodes: [

                    nav({
                        state: state,
                        actions: actions
                    }),

                    state.route.data ? albumDetails({
                        state: state,
                        props: {
                            album: state.route.data.album,
                            tracks: state.route.data.tracks
                        },
                        actions: actions
                    }) : {
                        tagName: 'div'
                    }
                ]
            }
        },
        actions
    });

}



module.exports = album;
