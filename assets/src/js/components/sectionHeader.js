const sectionHeader = ({ props, actions }) => ({

    tagName: 'div',
    className: 'pa4 ph5-l center mw9 flex justify-between items-center',
    childNodes: [

        {
            tagName: 'h2',
            className: 'f4 f3-ns mv0 antialiased legibility',
            textContent: props.title || ''
        },

        props.linkText && props.link ? {
            tagName: 'a',
            className: 'db f6 f5-ns no-underline light-silver',
            textContent: props.linkText,
            attributes: { href: props.link },
            on: { click: actions.link }
        } : null

    ]

});



module.exports = sectionHeader;
