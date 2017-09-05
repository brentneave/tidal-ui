const sectionHeader = ({ props, actions }) => ({

    tagName: 'div',
    className: 'ph4 ph5-l mb4 mb5-l center mw9 flex justify-between items-center',
    childNodes: [

        {
            tagName: 'a',
            className: 'f5 f4-ns f3-l mv0 antialiased legibility b near-black no-underline',
            textContent: props.title || '',
            attributes: props.link ? {
                href: props.link
            } : null
        },

        props.linkText && props.link ? {
            tagName: 'a',
            className: 'db f6 f5-ns tr no-underline light-silver',
            textContent: props.linkText,
            attributes: { href: props.link },
            on: { click: actions.link }
        } : null

    ]

});



module.exports = sectionHeader;
