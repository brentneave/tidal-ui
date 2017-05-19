const setRoute = require('../helpers/setRoute');

module.exports = function(state) {
    return {
        tagName: 'div',
        className: 'nav',
        childNodes: [{
                tagName: 'a',
                text: 'Favorite Artists ',
                attributes: {
                    href: '/favorites/artists/'
                },
                events: {
                    click: setRoute
                }
            },
            {
                tagName: 'a',
                text: 'Recommended Artists ',
                attributes: {
                    href: '/recommended/artists/'
                },
                events: {
                    click: setRoute
                }
            },
            {
                tagName: 'a',
                text: 'Recommended Albums ',
                attributes: {
                    href: '/recommended/albums/'
                },
                events: {
                    click: setRoute
                }
            }
        ]
    }
}
