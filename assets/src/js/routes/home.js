const loginCheck = require('../components/loginCheck');



const home = function({ state, props, actions }) {

    const content = {
        tagName: 'div',
        textContent: 'Homepage',
        childNodes: [{
            tagName: 'p',
            childNodes: {
                tagName: 'a',
                textContent: 'Artists',
                attributes: {
                    href: '/favorites/artists'
                },
                eventHandlers: {
                    click: actions.routerLink
                }
            }
        }, {
            tagName: 'p',
            childNodes: {
                tagName: 'button',
                textContent: 'Log Out',
                eventHandlers: {
                    click: actions.logout
                }
            }
        }]
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
