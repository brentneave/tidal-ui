const
    nav = require('../components/nav'),
    loginCheck = require('../components/loginCheck'),
    artistProfile = require('../components/artistProfile');



const artist = function({ state, props, actions }) {

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
                    artist: state.current.artist
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



module.exports = artist;
