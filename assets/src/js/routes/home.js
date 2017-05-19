const loginCheck = require('../components/loginCheck');



const home = function({ state, props, actions }) {

    const content = {
        tagName: 'div',
        textContent: 'Homepage',
        childNodes: {
            tagName: 'button',
            textContent: 'Log Out',
            eventHandlers: {
                click: actions.logout
            }
        }
    }

    return loginCheck({
        state,
        props: {
            content: content
        },
        actions
    });


}



module.exports = home;
