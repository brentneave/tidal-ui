const nav = ({ props, actions }) => ({

    tagName: 'div',
    className: 'fixed top-0 left-0 right-0 bg-near-white',
    childNodes: [

        {
            tagName: 'div',
            className: 'pv3 ph4 ph5-l mw9 center tl f7 f6-ns near-black flex justify-start items-center',
            childNodes: [

                {
                    tagName: 'a',
                    className: 'db near-black no-underline',
                    attributes: { href: '/' },
                    on: { click: actions.link },
                    childNodes: {
                        tagName: 'img',
                        className: 'db',
                        attributes: {
                            src: '/assets/dist/svg/tidal-mark.svg',
                            width: 36,
                            height: 24
                        }
                    }
                },

                ...[
                    { title: 'Albums', href: '/favorites/albums' },
                    { title: 'Artists', href: '/favorites/artists' }
                ].map(
                    (item) => ({
                        tagName: 'a',
                        className: 'db ml4 near-black no-underline',
                        textContent: item.title,
                        attributes: { href: item.href },
                        on: { click: actions.link }
                    })
                )

            ]

        }

    ]

})



module.exports = nav;
