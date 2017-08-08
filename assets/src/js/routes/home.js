const
    api = require('../api/api'),
    nav = require('../components/nav'),
    loginCheck = require('../components/loginCheck');



const component = function({ state, props, actions }) {

    const content = {

        tagName: 'div',
        textContent: 'Homepage',
        childNodes: [

            nav({
                state: state,
                actions: actions
            }),

            {
                tagName: 'p',
                childNodes: {

                    tagName: 'button',
                    textContent: 'Log Out',
                    on: {
                        click: actions.logout
                    }
                }
            }
        ]

    }



    return loginCheck({
        state,
        props: {
            content: content
        },
        actions
    });



}



module.exports = { component };
