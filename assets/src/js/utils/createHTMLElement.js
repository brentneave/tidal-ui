const createHTMLElement = function(o) {

    if (!o.tagName) throw new Error('Supply a value for tagName');

    var node = document.createElement(o.tagName);

    if (o.id) {
        node.setAttribute('id', o.id);
    }

    if (o.className) {
        node.setAttribute('class', o.className);
    }

    if (o.attributes) {
        for (var s in o.attributes) {
            node.setAttribute(s, o.attributes[s]);
        }
    }

    if (o.textContent) {
        node.textContent = o.textContent;
    }

    if (o.eventHandlers) {
        for (var s in o.eventHandlers) {
            node.addEventListener(s, o.eventHandlers[s], false);
        }
    }

    if (o.childNodes) {
        o.childNodes = o.childNodes instanceof Array ? o.childNodes : [o.childNodes];
        o.childNodes.map(createHTMLElement).map(function(element) {
            node.append(element);
        });
    }

    return node;

}




module.exports = createHTMLElement;
