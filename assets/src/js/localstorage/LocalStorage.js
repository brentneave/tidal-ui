const LocalStorage = function()
{
    const _readState = function()
    {
        return JSON.parse(localStorage.getItem("state"))
    }

    const _writeState = function(state)
    {
        localStorage.setItem("state", JSON.stringify(state));
        return _readState();
    }

    const _readSession = function()
    {
        return JSON.parse(localStorage.getItem("session"))
    }

    const _writeSession = function(session)
    {
        localStorage.setItem("session", JSON.stringify(session));
        return _readState();
    }

    Object.defineProperty(this, 'writeState', { value: _writeState });
    Object.defineProperty(this, 'readState', { value: _readState });

    Object.defineProperty(this, 'writeSession', { value: _writeSession });
    Object.defineProperty(this, 'readSession', { value: _readSession });
}

module.exports = new LocalStorage();
