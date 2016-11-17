const ModelDispatcher = require('../model/ModelDispatcher'),
      ModelActions = require('../model/ModelActions'),
      Action = require('../events/Action'),
      View = require('./View'),
      LoginForm = require('./types/LoginForm'),
      DOMDiff = require('skatejs-dom-diff');

const ViewReceiver = function()
{

    const _updateDOM = function(node)
    {
        DOMDiff.merge
        (
            {
                source: View.root,
                destination: node
            }
        );
    }

    const _handleModelActions = function(action)
    {
        const node = { tag: 'div', id: 'app', children: [] }

        switch(action.type)
        {
            case ModelActions.INITIALISE:
                node.children.push
                (
                    LoginForm.render({ title: 'Please to be logging in!' })
                );
                break;
            case ModelActions.LOGIN_ERROR:
                node.children.push
                (
                    LoginForm.render({ title: 'Whoops! Try a different username or password.' })
                );
                break;
            case ModelActions.LOGIN_RESPONSE:
                node.children.push
                (
                    {
                        tag: 'div',
                        text: 'Great success! You have logged in'
                    }
                );
                break;
            default:
                break;
        }

        _updateDOM(View.createNode(node));
    }

    ModelDispatcher.actions.addListener(this, _handleModelActions);

}

module.exports = new ViewReceiver();
