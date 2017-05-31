const element = function(o) {

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

    if (o.on) {
        for (var s in o.on) {
            node.addEventListener(s, o.on[s], false);
        }
    }

    if (o.childNodes) {

        const
            children = o.childNodes instanceof Array ?
            o.childNodes : [o.childNodes],
            append = function(element) {
                node.append(element);
            };

        children
            .map(element)
            .map(append);

    }

    return node;

}



module.exports = element;
