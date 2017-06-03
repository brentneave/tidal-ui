const nav = function({ state, actions }) {



    const { link } = actions;



    const _item = function(text, href) {

        return {
            tagName: 'a',
            textContent: text + ' ',
            attributes: { href },
            on: { click: link }
        }

    }



    return {
        tagName: 'div',
        childNodes: [
            _item('Home', '/'),
            _item('Favorite Artists', '/favorites/artists'),
            _item('Favorite Albums', '/favorites/albums')
        ]
    }



}



module.exports = nav;
