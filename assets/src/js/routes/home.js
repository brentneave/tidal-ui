const
    api = require('../api/api'),
    nav = require('../components/nav'),
    page = require('../components/page'),
    loginCheck = require('../components/loginCheck');



const component = ({ state, props, actions }) => (

    page({
        state,
        props: {
            title: 'HI',
            content: {
                tagName: 'p',
                childNodes: {
                    tagName: 'button',
                    textContent: 'Log Out',
                    on: {
                        click: actions.logout
                    }
                }
            }
        },
        actions
    })

)



module.exports = { component };
