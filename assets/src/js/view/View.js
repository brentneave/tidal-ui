const Broadcaster = require('../events/Broadcaster'),
      LoginForm = require('./types/LoginForm'),
      ArtistList = require('./types/ArtistList'),
      AlbumList = require('./types/AlbumList'),
      DOMDiff = require('skatejs-dom-diff/').default,
      setRoute = require('./helpers/setRoute');


console.log('setRoute:')
console.log(setRoute);

const View = function()
{

    const _createNode = function(o, parentNode)
    {
        if(!o.tag) throw new Error();

        var node = document.createElement(o.tag);

        if(o.id)
        {
            node.setAttribute('id', o.id);
        }

        if(o.className)
        {
            node.setAttribute('class', o.className);
        }

        if(o.attributes)
        {
            for(var s in o.attributes)
            {
                node.setAttribute(s, o.attributes[s]);
            }
        }

        if(o.text)
        {
            node.textContent = o.text;
        }

        if(o.events)
        {
            for(var s in o.events)
            {
                node.addEventListener(s, o.events[s], false);
            }
        }

        if(parentNode)
        {
            parentNode.appendChild(node);
        }

        if(o.children)
        {
            var a = o.children,
            n = a.length,
            child;
            for (var i=0; i<n; i++)
            {
                child = a[i];
                _createNode(child, node);
            }
        }

        return node;
    }

    const _updateDOM = function(node)
    {
        console.log('View._updateDOM');
        console.log(node);
        DOMDiff.merge
        (
            {
                source: document.getElementById('app'),
                destination: _createNode(node)
            }
        );
    }

    const _render = function(state)
    {
        console.log('View._render');
        console.log(state);

        const node = { tag: 'div', id:'app', children: [] }

        if(!state.session.id)
        {
            node.children.push
            (
                LoginForm.render
                (
                    {
                        title: state.session.loginError ? state.session.loginError : 'Log in'
                    }
                )
            );
        }
        // else if(state.recommendations.artists)
        // {
        //     node.children.push(ArtistList.render(state.recommendations.artists));
        // }
        else if(state.recommendations.albums)
        {
            node.children.push
            (
                {
                    tag: 'a',
                    text: 'Favorites',
                    attributes:
                    {
                        href: '/favorites/'
                    },
                    events:
                    {
                        click: setRoute
                    }
                }
            );
            node.children.push
            (
                {
                    tag: 'a',
                    text: 'Recommended',
                    attributes:
                    {
                        href: '/recommended/'
                    },
                    events:
                    {
                        click: setRoute
                    }
                }
            );
            node.children.push(AlbumList.render(state.recommendations.albums));
        }

        _updateDOM(node);
    }


    Object.defineProperty(this, 'render', { value: _render });

}

module.exports = new View();
