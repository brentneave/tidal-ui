const albumThumb = require('./albumThumb');



const albumList = function({ state, props, actions }) {

    console.log('albumList', ...arguments);

    const { albums } = props;

    return albums && albums.length ? {
        tagName: 'div',
        className: 'l-thumbnail-grid',
        childNodes: albums.map((album) =>
            albumThumb({
                state: state,
                props: { album },
                actions
            })
        )
    } : null;

};



module.exports = albumList;
