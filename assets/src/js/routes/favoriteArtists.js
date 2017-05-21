const
    artistList = require('../components/artistList'),
    loginCheck = require('../components/loginCheck');



const favoriteArtists = function({ state, props, actions }) {



    const content = {
        tagName: 'div',
        childNodes: [{

                tagName: 'h1',
                textContent: 'Favorite Artists'

            },

            artistList({
                state: state,
                props: {
                    artists: state.favorites.artists
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



module.exports = favoriteArtists;
