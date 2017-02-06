const setRoute = require('../helpers/setRoute');

module.exports = function(state)
{
    return {
        tag: 'div',
        className: 'nav',
        children:
        [
            {
                tag: 'a',
                text: 'Favorites',
                attributes:
                {
                    href: '/favorites/artists/'
                },
                events:
                {
                    click: setRoute
                }
            },
            {
                tag: 'a',
                text: 'Recommended',
                attributes:
                {
                    href: '/recommended/'
                },
                events:
                {
                    click: setRoute
                }
            }
        ]
    }
}
