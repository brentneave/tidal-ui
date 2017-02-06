const Utils = {};

Utils.isNotEmptyString = function(s)
{
    return s != "";
};

Utils.pathToArray = function(path)
{
    return path.split('/').filter(Utils.isNotEmptyString)
}

module.exports = Object.freeze(Utils);
