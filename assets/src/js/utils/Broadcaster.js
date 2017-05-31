const Broadcaster = function() {



    var _listeners = [];



    const _hasListener = function({ scope, handler }) {
        return _listeners.find(function(listener) {
            return listener.scope === scope && listener.handler === handler;
        }).length > 0;
    }



    const _removeListener = function({ scope, handler }) {
        _listeners = _listeners.filter(function(listener) {
            return listener.scope === scope && listener.handler === handler;
        });
    };



    const _addListener = function({ scope, handler }) {
        _removeListener({ scope, handler });
        _listeners.push({ scope, handler });
    };




    const _addListeners = function() {
        arguments.map(_addListener);
    };



    const _broadcast = function() {
        _listeners.map(function({ scope, handler }) {
            handler.apply(scope, arguments);
        });
    }



    Object.defineProperties(this, {
        'hasListener': { value: _hasListener },
        'addListener': { value: _addListener },
        'addListeners': { value: _addListeners },
        'removeListener': { value: _removeListener }
    })



}



module.exports = Broadcaster;
