const
    nav = require('./nav'),
    pageHeader = require('./pageHeader'),
    loginCheck = require('./loginCheck');



const page = ({ state, props, actions }) => ({

    tagName: 'div',
    className: 'overflow-x-hidden min-vh-100 pv5 ma0 near-black bg-near-white f5 lh-copy sans-serif',
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
