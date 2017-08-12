/*
details: {
    id: 4315444,
    name: "A$AP Rocky",
    picture: "71c765d6-c429-4ed8-9355-c033615214ee",
    popularity: 91,
    url: "http://www.tidal.com/artist/4315444"
}
*/


const
    artistImage = require('./artistImage'),
    albumList = require('./albumList'),
    artistList = require('./artistList'),
    pageHeader = require('./pageHeader');



const artistProfile = function({ state, props, actions }) {

    console.log('artistProfile', props);

    const { details, albums, similar } = props;

    return {
        tagName: 'div',
        className: 'mw9 center',
        childNodes: [{
                tagName: 'div',
                className: 'flex flex-wrap flex-row pv4 pv5-l ph3 ph4-l',
                childNodes: [{
                        /* album image */
                        tagName: 'div',
                        className: 'w-100 w-50-l ph3 ph4-l',
                        childNodes: artistImage({
                            props: { artist: details },
                            actions
                        })
                    },
                    {
                        tagName: 'div',
                        className: 'w-100 w-50-l ph3 ph4-l',
                        childNodes: {
                            /* album title */
                            tagName: 'h1',
                            className: 'f2 f1-m lh-title antialiased legibility',
                            textContent: details && details.name ? details.name : '—'
                        }
                    }
                ]
            },
            albums && albums.length ? {
                tagName: 'div',
                className: 'pt0 pb4 ph4 ph5-l',
                childNodes: {
                    tagName: 'h2',
                    className: 'f3 antialiased legibility',
                    textContent: 'Albums'
                }
            } : null,
            albums && albums.length ? albumList({
                state: state,
                props: { albums },
                actions: actions
            }) : null,
            similar && similar.length ? {
                tagName: 'div',
                className: 'pt5 pb4 ph4 ph5-l',
                childNodes: {
                    tagName: 'h2',
                    className: 'f3 antialiased legibility',
                    textContent: 'Similar Artists'
                }
            } : null,
            similar && similar.length ? artistList({
                state: state,
                props: { artists: similar },
                actions: actions
            }) : null
        ]
    }

}


module.exports = artistProfile;
