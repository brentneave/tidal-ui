const mirrorArray = function(a) {

    var o = {};

    a.map(function(s) {
        o[s] = s;
    });

    return o;

}



module.exports = mirrorArray;
