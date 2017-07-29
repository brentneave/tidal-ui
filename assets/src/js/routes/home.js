const
    nav = require('../components/nav'),
    loginCheck = require('../components/loginCheck');



const home = function({ state, props, actions }) {

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



module.exports = home;
