const nav = ({ props, actions }) => ({

    tagName: 'div',
    className: 'fixed bottom-0 left-0 right-0 bg-near-black near-white f6 tc pa3 shadow-1',
    childNodes: [
        { title: 'Home', href: '/' },
        { title: 'Albums', href: '/favorites/albums' },
        { title: 'Artists', href: '/favorites/artists' },
        { title: 'Recommended', href: '/recommended' }
    ].map(
        (item) => ({
            tagName: 'a',
            className: 'dib mr4 near-white no-underline',
            textContent: item.title,
            attributes: { href: item.href },
            on: { click: actions.link }
        })
    )

})



module.exports = nav;
