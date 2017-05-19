function Broadcaster() {
    // private vars
    var _listeners = [];

    // privileged methods

    this.addListener = function(listener, handler) {
        if (listener == undefined) {
            throw new Error('Please provide a listener');
        } else if (!(handler instanceof Function)) {
            throw new Error('Handler must be a function');
            throw new Error();
        }
        this.removeListener(listener, handler);
        _listeners.push({
            listener: listener,
            handler: handler
        });
        return this;
    }

    this.removeListener = function(listener, handler) {
        var a = _listeners,
            i = _listeners.length;
        while (i--) {
            o = a[i];
            if (o.listener == listener && o.handler == handler) {
                a.splice(i, 1);
            }
        }
        return this;
    }

    this.hasListener = function(listener, handler) {
        var i = _listeners.length;
        while (i--) {
            o = _listeners[i];
            if (o.listener == listener && o.handler == handler) {
                return true;
            }
        }
        return false;
    }

    this.broadcast = function() {

        var i = _listeners.length;
        var o;
        while (i--) {
            o = _listeners[i];
            o.handler.apply(o.listener, arguments);
        }

        return this;
    }

    Object.defineProperty(this, 'listeners', {
        get: function() {
            return _listeners.splice(0);
        }
    })
}


module.exports = Broadcaster;
