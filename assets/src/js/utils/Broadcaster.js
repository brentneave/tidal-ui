const Broadcaster = function() {



    var _listeners = [];



    const _removeListener = function({ scope, handler }) {
        _listeners = _listeners.filter(function(listener) {
            return listener.scope === scope && listener.handler === handler;
        });
    };



    const _addListener = function({ scope, handler }) {
        _removeListener({ scope, handler });
        _listeners.push({ scope, handler });
    };



    const _broadcast = function() {
        _listeners.map(function(listener)) {

        }
    };



}
