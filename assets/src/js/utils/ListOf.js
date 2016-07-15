const Broadcaster = require('../events/Broadcaster');

const ListOf = function(type) {

    this.type = type;

  	const _type = Object,
      		_instances = [],
        	_onAddInstance = new Broadcaster(),
        	_onRemoveInstance = new Broadcaster(),
        	_onEmpty = new Broadcaster();

  	const _add = function(instance) {
      if (_contains(instance)) {
        return false; // only contain an instance once
      }
  		if(instance instanceof _type) {
  			_instances.push(instance);
  			_onAddInstance.broadcast({instance: instance});
        return true;
  		} else {
        return false;
  			throw new Error('InstanceList.add: incorrect type');
  		}
  	}

  	const _remove = function(instance) {
      if (!_contains(instance)) {
        return false;
      }
			var i = _instances.length;
			while(i--) {
				if(_instances[i] === o) {
          _instances.splice(i,1);
      		_onRemoveInstance.broadcast({instance: instance});
      		return true;
        }
			}
  	}

    const _contains = function(instance) {
			var i = _instances.length;
			while(i--) {
				if(_instances[i] === o) {
          return true;
        }
			}
      return false;
    }

    const _empty = function() {
      _instances = [];
      _onEmpty.broadcast();
    }

    Object.defineProperty(this, 'type', {
      get: function() {
        return _type;
      }
    });

    Object.defineProperty(this, 'instances', {
      get: function() {
        return _instances.splice();
      },
      set: function(a) {
        var i = a.length;
        while(i--) {
          _add(a[i]);
        }
      }
    });

    Object.defineProperty(this, 'add', {
      get: function() {
        return _add;
      }
    });

    Object.defineProperty(this, 'remove', {
      get: function() {
        return _remove;
      }
    });

    Object.defineProperty(this, 'empty', {
      get: function() {
        return _remove;
      }
    });

    Object.defineProperty(this, 'onAddInstance', {
      get: function() {
        return _onAddInstance;
      }
    });

    Object.defineProperty(this, 'onRemoveInstance', {
      get: function() {
        return _onRemoveInstance;
      }
    });

    Object.defineProperty(this, 'onEmpty', {
      get: function() {
        return _onEmpty;
      }
    });
}

module.exports = ListOf;
