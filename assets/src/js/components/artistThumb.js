const artistImage = require('./artistImage');



const artistThumb = function({ props, actions }) {

    const { artist } = props;

    return {

        tagName: 'a',
        className: 'db no-underline',
        attributes: { href: '/artist/' + artist.id },
        on: { click: actions.link },

        childNodes: [

            {
                tagName: 'div',
                className: 'grow',
                childNodes: artistImage({
                    props: {
                        artist
                    }
                })
            },

            {
                tagName: 'p',
                className: 'ma0 pt4 pb5 f6 bg-near-black',
                childNodes: [{
                    tagName: 'span',
                    className: 'db white',
                    textContent: artist.name
                }]
            }

        ]

    };

};



module.exports = artistThumb;
