const artistThumb = require('./artistThumb');



const artistList = ({ props, actions }) => (
    props.artists ? {
        tagName: 'div',
        className: 'flex flex-wrap flex-row ph3 ph4-l mw9 center',
        childNodes: props.artists.map(
            (artist) => ({
                tagName: 'div',
                className: 'w-50 w-third-ns w-25-l ph3 ph4-l',
                childNodes: artistThumb({
                    props: { artist },
                    actions
                })
            })
        )
    } : null
)



module.exports = artistList;
