const
    diff = require('skatejs-dom-diff').default,
    element = require('./utils/element'),
    actions = require('./actions'),
    routes = require('./routes');



const render = function(state) {

    console.log('render', state);

    const
        act = actions(state),
        component = routes.get(state).component,
        then = document.querySelector('#app'),
        props = {},
        now = element({
            tagName: 'div',
            id: 'app',
            childNodes: component({ state: state, props: props, actions: act })
        });

    diff.merge({
        source: then,
        destination: now
    });

    return state;

}



module.exports = render;
