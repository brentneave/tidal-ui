const navigation = require('./navigation'),
      content = require('./content');

module.exports = function(state)
{
    const node = { tag: 'div', id:'app', children: [] };

    node.children.push(navigation(state));
    node.children.push(content(state));

    return node;
}
