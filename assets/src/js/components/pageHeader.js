const pageHeader = ({ props, actions }) => ({
    tagName: 'div',
    className: 'pa4 pa5-l pb6-l mw9 center',
    childNodes: {
        tagName: 'h1',
        className: 'f2 f1-ns w-third-l lh-title antialiased legibility',
        textContent: props.title
    }
});



module.exports = pageHeader;
