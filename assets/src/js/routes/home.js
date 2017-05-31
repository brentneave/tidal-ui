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
                on: {
                    click: actions.link
                }

            }

        }, {

            tagName: 'p',
            childNodes: {

                tagName: 'button',
                textContent: 'Log Out',
                on: {
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
