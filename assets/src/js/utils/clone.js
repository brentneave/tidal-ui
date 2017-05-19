const clone = function(obj) {
    return obj ? JSON.parse(JSON.stringify(obj)) : obj;
}

module.exports = clone;
