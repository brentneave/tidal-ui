const sectionHeader = ({ props, actions }) => ({

    tagName: 'div',
    className: 'pt5 pb4 ph4 ph5-l center mw9 flex justify-between items-center',
    childNodes: [

        {
            tagName: 'h2',
            className: 'f3 antialiased legibility',
            textContent: props.title || ''
        },

        props.linkText && props.link ? {
            tagName: 'a',
            className: 'db f6 no-underline near-white',
            textContent: props.linkText,
            attributes: { href: props.link },
            on: { click: actions.link }
        } : null

    ]

});



module.exports = sectionHeader;
