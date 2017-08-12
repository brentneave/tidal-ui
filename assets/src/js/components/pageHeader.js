const pageHeader = ({ props, actions }) => ({
    tagName: 'div',
    className: 'pa4 pa5-l mw9 center',
    childNodes: {
        tagName: 'h1',
        className: 'f2 f1-ns lh-title antialiased legibility',
        textContent: props.title
    }
});



module.exports = pageHeader;
