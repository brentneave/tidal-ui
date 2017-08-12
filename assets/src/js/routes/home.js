const
    api = require('../api/api'),
    nav = require('../components/nav'),
    page = require('../components/page'),
    loginCheck = require('../components/loginCheck');



const component = function({ state, props, actions }) {

    const content = {

        tagName: 'div',
        textContent: 'Homepage',
        childNodes: [

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

    };



    const login = loginCheck({
        state,
        props: { content },
        actions
    });



    return page({
        state,
        props: {
            content: login
        },
        actions
    })


}



module.exports = { component };
