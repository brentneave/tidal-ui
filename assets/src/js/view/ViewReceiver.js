const ModelDispatcher = require('../model/ModelDispatcher'),
      ModelActions = require('../model/ModelActions'),
      Action = require('../events/Action'),
      View = require('./View'),
      ViewDispatcher = require('./ViewDispatcher'),
      ViewActions = require('./ViewActions'),
      LoginForm = require('./types/LoginForm'),
      ArtistList = require('./types/ArtistList'),
      AlbumList = require('./types/AlbumList'),
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
                ViewDispatcher.broadcast
                (
                    new Action(ViewActions.GET_ARTISTS)
                );
                break;
            case ModelActions.ARTISTS_RESPONSE:
                // if(action.payload.state.artists.length)
                // {
                //     node.children.push(ArtistList.render(action.payload.state.artists));
                // }
                ViewDispatcher.broadcast
                (
                    new Action(ViewActions.GET_LATEST_RELEASES)
                );
            case ModelActions.LATEST_RELEASES_RESPONSE:
                console.log(action.type);
                console.log(action.payload.state.latestReleases);
                if(action.payload.state.latestReleases.length)
                {
                    node.children.push(AlbumList.render(action.payload.state.latestReleases));
                }
            default:
                break;
        }

        _updateDOM(View.createNode(node));
    }

    ModelDispatcher.actions.addListener(this, _handleModelActions);

}

module.exports = new ViewReceiver();
