
const View = function()
{

    var _root = undefined;

    Object.defineProperty(this, 'root',
    {
        set: function(node)
        {
            _root = node;
        },
        get: function()
        {
            if (_root === undefined) throw new Error("No root defined");
            return _root;
        }
    });

    Object.defineProperty(this, 'createNode',
    {
        value: function(o, parentNode)
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
                    console.log(s);
                    console.log(o.events[s]);
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
                    this.createNode(child, node);
                }
            }

            return node;
        }
    });

}

module.exports = new View();
