const nav = ({ props, actions }) => ({

    tagName: 'div',
    className: 'fixed bottom-0 left-0 right-0 bg-near-black near-white f7 fw6 tc pa3',
    childNodes: [
        { title: 'Home', href: '/' },
        { title: 'Favorite Artists', href: '/favorites/artists' },
        { title: 'Favorite Albums', href: '/favorites/albums' },
        { title: 'Recommended Artists', href: '/recommended/artists' },
        { title: 'Recommended Albums', href: '/recommended/albums' },
        { title: 'Latest Albums', href: '/latest/albums' }
    ].map(
        (item) => ({
            tagName: 'a',
            className: 'dib mr3',
            textContent: item.title,
            attributes: { href: item.href },
            on: { click: actions.link }
        })
    )

})



module.exports = nav;
