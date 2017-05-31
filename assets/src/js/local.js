const local = Object.freeze({



    read: function() {
        const state = JSON.parse(localStorage.getItem("state"));
        console.log('local.read', state);
        return state;
    },



    write: function(state) {
        console.log('local.write', state);
        localStorage.setItem("state", JSON.stringify(state));
        return state;
    }



});


module.exports = local;
