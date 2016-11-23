const LocalStorage = function()
{
    const _readState = function()
    {
        return JSON.parse(localStorage.getItem("state"))
    }

    const _writeState = function(state)
    {
        localStorage.setItem("state", JSON.stringify(state));
        return _readLocalState();
    }

    Object.defineProperty(this, 'writeState', { value: _writeState });
    Object.defineProperty(this, 'readState', { value: _readState });
}

module.exports = new LocalStorage();
