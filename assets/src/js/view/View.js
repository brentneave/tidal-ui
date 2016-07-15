const View = function(parentNode) {

  // private vars -----------------------------------------------//

	var _parentNode = parentNode instanceof HTMLElement ? parentNode : document.body,
			_node;

  // private methods --------------------------------------------//

	const _render = function() {
		this.removeNode();
		_node = View.buildNode(_parentNode, this.structure);
		if(this.onRender) { this.onRender(); }
	}

  // privileged getter/setters ----------------------------------//

  Object.defineProperty(this, 'node', {
    get: function() {
      return _node;
    }
  });

  Object.defineProperty(this, 'render', {
    get: function() {
      return _render;
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

Object.defineProperty(View.prototype, 'removeNode', {
	value: function() {
		if(this.node) {
			this.node.parentNode.removeChild(this.node);
		}
	}
});

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

	// View classes
	if(o.viewClass && o.viewClass.prototype instanceof View) {
		var view = new o.viewClass(parentNode);
		if(o.properties) {
			for(var s in o.properties) {
				view[s] = o.properties[s];
			}
		}
		view.render();
	}

	// basic DOM nodes
	else if(o.tag) {
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
	// recurse through child nodes
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

module.exports = View;
