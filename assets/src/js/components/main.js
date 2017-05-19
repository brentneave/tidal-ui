const navigation = require('./navigation'),
    content = require('./content');

module.exports = function(state) {
    const node = { tagName: 'div', id: 'app', childNodes: [] };

    node.children.push(navigation(state));
    node.children.push(content(state));

    return node;
}
