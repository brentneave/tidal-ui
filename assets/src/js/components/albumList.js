const albumThumb = require('./albumThumb');



const albumList = function({ state, props, actions }) {

    const { albums } = props;

    return {
        tagName: 'div',
        className: 'l-thumbnail-grid',
        childNodes: albums.map((album) =>
            albumThumb({
                state: state,
                props: { album },
                actions
            })
        )
    }

};



module.exports = albumList;
