module.exports = View;

function View()
{
  // private vars -----------------------------------------------//

	var _node;

  // private methods --------------------------------------------//

	const _build = function(parentNode) {
		this.removeNode();
		if(parentNode == undefined) parentNode = document.body;
		_node = View.buildNode(parentNode, this.structure);
		this.init();
	}

  // privileged getter/setters ----------------------------------//

  Object.defineProperty(this, 'node', {
    get: function() {
      return _node;
    }
  });

  Object.defineProperty(this, 'build', {
    get: function() {
      return _build;
    }
  });
}

// getter/setters -----------------------------------------------//

Object.defineProperty(View.prototype, 'structure', {
  get: function() {
    return {
  		tag : 'div',
  		className : 'view'
    }
  }
});

// public methods -----------------------------------------------//

View.prototype.removeNode = function() {
	if(this.node) {
		this.node.parentNode.removeChild(this.node);
	}
}

View.prototype.init = function() { /* placeholder */ }

// static methods

View.buildNode = function(parentNode, o){
  /* dom structure, e.g.:
  -------------------------------------
  [{
  	tag : 'div',
  	className : 'view',
  	children : [
  		{
  			tag : 'span',
  			className : 'child',
  			children : [
  				{
  					tag : 'p',
  					className : 'subChild'
  				},
  				{
  					tag : 'p',
  					className : 'subChild'
  				}
  			]
  		},
  		{
  			tag : 'span',
  			className : 'child',
  			children : [
  				{
  					tag : 'p',
  					className : 'subChild'
  				},
  				{
  					tag : 'p',
  					className : 'subChild'
  				}
  			]
  		}
  	]
  }];
  -------------------------------------  */

	if(parentNode == undefined) parentNode = document.body;
	if(o == undefined) o = this.structure;

	if(o.tag) {
		var node = document.createElement(o.tag);

		if(o.className) node.setAttribute('class', o.className);

		if(o.attributes) {
			for(var s in o.attributes) {
				node.setAttribute(s, o.attributes[s]);
			}
		}

		if(o.text) {
			node.textContent = o.text;
		}

		parentNode.appendChild(node);
	}

	if(o.children) {
		var a = o.children,
				n = a.length,
				child;

		for (var i=0; i<n; i++)
		{
			child = a[i];
			View.buildNode(node, child);
		}
	}

	return node;
}
