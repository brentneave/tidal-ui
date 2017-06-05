const
    diff = require('skatejs-dom-diff').default,
    element = require('../utils/element'),
    actions = require('./actions'),
    routes = require('./routes');



const render = function(state) {

    console.log('render', state);

    diff.merge({
        source: document.querySelector('#app'),
        destination: element({
            tagName: 'div',
            id: 'app',
            childNodes: routes.get(state).component({
                state: state,
                props: {},
                actions: actions
            })
        })
    });

    return state;

}



module.exports = render;
