const
    DOMDiff = require('skatejs-dom-diff').default,
    createHTMLElement = require('./utils/createHTMLElement'),
    routes = Object.freeze({
        home: require('./routes/home'),
        favorites: require('./routes/favorites'),
        recommended: require('./routes/recommended'),
        favoriteArtists: require('./routes/favoriteArtists')
    });



const View = function() {

    console.log('renderView', state, actions);

    var
        _component = routes.home,
        _state;


    const _render = function({ component, state }) {

        if (!(component && state)) throw new Error();

        const
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



    const _onStateChange = function(state) {
        _state = state;
        _render(_state, _component);
    }



    const _onRouteChange = function(route) {
        _component = route.component;
        _render(_state, _component);
    }

}



module.exports = renderView;
