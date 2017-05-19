const
    DOMDiff = require('skatejs-dom-diff').default,
    createHTMLElement = require('./utils/createHTMLElement'),
    routes = Object.freeze({
        home: require('./routes/home'),
        favorites: require('./routes/favorites'),
        recommended: require('./routes/recommended'),
        favoriteArtists: require('./routes/favoriteArtists')
    });



const renderView = function({ state, actions }) {

    console.log('renderView', state, actions);

    const
        props = null,
        route = routes[state.route.component],
        then = document.querySelector('#app'),
        now = createHTMLElement({
            tagName: 'div',
            id: 'app',
            childNodes: [route({ state, props, actions })]
        });

    DOMDiff.merge({
        source: then,
        destination: now
    });

}



module.exports = renderView;
