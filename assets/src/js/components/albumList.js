const albumThumb = require('./albumThumb');



const albumList = function({ props, actions }) {

    console.log('albumList', ...arguments);

    const { albums } = props;

    return albums && albums.length ? {
        tagName: 'div',
        className: 'flex flex-wrap flex-row ph3 ph4-l mw9 center',
        childNodes: albums.map(
            (album) => ({
                tagName: 'div',
                className: 'w-50 w-third-l ph3 ph4-l',
                childNodes: albumThumb({
                    props: { album },
                    actions
                })
            })
        )
    } : null;

};



module.exports = albumList;
