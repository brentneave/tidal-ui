const
    api = require('../api/api'),
    nav = require('../components/nav'),
    loginCheck = require('../components/loginCheck'),
    artistProfile = require('../components/artistProfile');



const load = ({ state, subpath }) =>
    api.loadArtistProfile(state.session, { id: subpath[0] })



const component = function({ state, props, actions }) {

    const content = {
        tagName: 'div',
        childNodes: [

            nav({
                state: state,
                actions: actions
            }),

            artistProfile({
                state: state,
                props: {
                    artist: state.route.data
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
