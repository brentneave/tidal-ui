const page = ({ state, props, actions }) => ({
    tagName: 'div',
    className: 'min-vh-100 ma0 white bg-near-black f5 lh-copy avenir',
    childNodes: props.content
});



module.exports = page;
