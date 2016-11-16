const ModelDispatcher = require('../model/ModelDispatcher'),
      ModelActions = require('../model/ModelActions'),
      Action = require('../events/Action'),
      View = require('./View'),
      DOMDiff = require('skatejs-dom-diff');

const ViewReceiver = function() {

    const _updateDOM = function(node) {
        const wrapper = document.createElement('div');
        wrapper.setAttribute('id', 'app')
        wrapper.appendChild(node);
        DOMDiff.merge({
            source: View.root,
            destination: wrapper
        });
    }

    const _handleModelActions = function(action) {
        switch(action.type) {
            case ModelActions.INITIALISE:
                const node = View.createNode({
                    tag: 'div',
                    text: 'hello!',
                    className: 'test',
                    children: [{
                        tag: 'span',
                        text: 'hello to you!'
                    }]
                });
                _updateDOM(node);
                break;
            default:
            break;
        }
    }

    ModelDispatcher.actions.addListener(this, _handleModelActions);

}

module.exports = new ViewReceiver();
