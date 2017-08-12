const pageHeader = ({ props, actions }) => ({
    tagName: 'div',
    className: 'pa4 pa5-l',
    childNodes: {
        tagName: 'h1',
        className: 'f2 f1-ns lh-title antialiased',
        textContent: props.title
    }
});



module.exports = pageHeader;
