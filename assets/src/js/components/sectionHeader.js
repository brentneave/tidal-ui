const sectionHeader = ({ props, actions }) => ({
    tagName: 'div',
    className: 'pt5 pb4 ph4 ph5-l center mw9',
    childNodes: {
        tagName: 'h2',
        className: 'f3 antialiased legibility',
        textContent: props.title || ''
    }
});



module.exports = sectionHeader;
