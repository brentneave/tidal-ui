const ModelDispatcher = require('../model/ModelDispatcher'),
      ModelActions = require('../model/ModelActions'),
      Action = require('../events/Action'),
      View = require('./View'),
      ViewDispatcher = require('./ViewDispatcher'),
      ViewActions = require('./ViewActions'),
      LoginForm = require('./types/LoginForm'),
      ArtistList = require('./types/ArtistList'),
      AlbumList = require('./types/AlbumList'),
      DOMDiff = require('skatejs-dom-diff'),
      FLAC = require('flac.js'),
      AV = require('av');

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

    const _handleModelNotifications = function(action)
    {
        console.log('ViewReceiver._handleModelNotifications: ' + action.type);

        const node = { tag: 'div', id: 'app', children: [] }
        var doUpdate = true;

        switch(action.type)
        {
            case ModelActions.notifications.INITIALISE:
                node.children.push
                (
                    LoginForm.render({ title: 'Please to be logging in!' })
                );
                break;

            case ModelActions.notifications.LOGIN_ERROR:
                node.children.push
                (
                    LoginForm.render({ title: 'Whoops! Try a different username or password.' })
                );
                break;

            case ModelActions.notifications.LOGIN_RESPONSE:
                node.children.push
                (
                    {
                        tag: 'div',
                        text: 'Great success! You have logged in'
                    }
                );
                ViewDispatcher.requests.broadcast
                (
                    new Action(ViewActions.GET_ARTISTS)
                );
                break;

            case ModelActions.notifications.ARTISTS_RESPONSE:
                ViewDispatcher.requests.broadcast
                (
                    new Action(ViewActions.GET_LATEST_RELEASES)
                );
                doUpdate = false;
                break;

            case ModelActions.notifications.LATEST_RELEASES_RESPONSE:
                if(action.payload.state.latestReleases.length)
                {
                    node.children.push(AlbumList.render(action.payload.state.latestReleases));
                }
                break;

            default:
                doUpdate = false;
                break;
        }

        if(doUpdate)
        {
            _updateDOM(View.createNode(node));
        }
    }

    ModelDispatcher.notifications.addListener(this, _handleModelNotifications);

}

module.exports = new ViewReceiver();
