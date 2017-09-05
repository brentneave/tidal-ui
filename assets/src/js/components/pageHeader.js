const pageHeader = ({ props, actions }) => ({
    tagName: 'div',
    className: 'ph4 ph5-l mv5 mv6-l mw9 center',
    childNodes: {
        tagName: 'h1',
        className: 'f3 f2-ns f1-l mv0 lh-title antialiased legibility',
        textContent: props.title
    }
});



module.exports = pageHeader;
