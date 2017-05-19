const Broadcaster = require('../events/Broadcaster'),
    DOMDiff = require('skatejs-dom-diff/').default,
    setRoute = require('./helpers/setRoute'),
    main = require('./components/main');


console.log('setRoute:')
console.log(setRoute);

const View = function() {

    const _convertToHTML = function(o, parentNode) {
        console.log('_convertToHTML');

        if (!o.tag) throw new Error();

        var node = document.createElement(o.tag);

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

        if (o.text) {
            node.textContent = o.text;
        }

        if (o.events) {
            for (var s in o.events) {
                node.addEventListener(s, o.events[s], false);
            }
        }

        if (parentNode) {
            parentNode.appendChild(node);
        }

        if (o.children) {
            var a = o.children,
                n = a.length,
                child;
            for (var i = 0; i < n; i++) {
                child = a[i];
                _createNode(child, node);
            }
        }

        return node;
    }

    const _updateDOM = function(node) {
        console.log('View._updateDOM');
        console.log(node);
        DOMDiff.merge({
            source: document.getElementById('app'),
            destination: _createNode(node)
        });
    }

    const _render = function(state) {
        console.log('View._render');
        console.log(state);
        return Promise.resolve(main(state));
    }


    Object.defineProperty(this, 'deriveUIState', {
        value: _render
    });
    Object.defineProperty(this, 'convertToHTML', {
        value: _convertToHTML
    });
    Object.defineProperty(this, 'updateDOM', {
        value: _updateDOM
    });

}

module.exports = new View();
