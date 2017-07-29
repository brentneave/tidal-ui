const
    diff = require('skatejs-dom-diff').default,
    element = require('../utils/element'),
    actions = require('./actions'),
    router = require('./router');



const render = function(state) {

    console.log('render', state);

    diff.merge({
        source: document.querySelector('#app'),
        destination: element({
            tagName: 'div',
            id: 'app',
            childNodes: router.get(state).component({
                state: state,
                props: {},
                actions: actions
            })
        })
    });

    return state;

}



module.exports = render;
