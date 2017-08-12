const
    nav = require('./nav'),
    pageHeader = require('./pageHeader'),
    loginCheck = require('./loginCheck');



const page = ({ state, props, actions }) => ({
    tagName: 'div',
    className: 'min-vh-100 ma0 white bg-near-black f5 lh-copy avenir pb5',
    childNodes: loginCheck({
        state,
        props: {
            content: {
                tagName: 'div',
                childNodes: [
                    props.title ? pageHeader({
                        props: {
                            title: props.title
                        },
                        actions
                    }) : null,
                    {
                        tagName: 'div',
                        childNodes: props.content
                    },
                    nav({ state, props: {}, actions })
                ]
            }
        },
        actions
    })
});



module.exports = page;
