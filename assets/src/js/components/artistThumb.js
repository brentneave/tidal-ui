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
                className: 'ma0 pt3 pt4-ns pb4 pb5-ns f6 f5-ns',
                childNodes: [{
                    tagName: 'span',
                    className: 'db near-black',
                    textContent: artist.name
                }]
            }

        ]

    };

};



module.exports = artistThumb;
