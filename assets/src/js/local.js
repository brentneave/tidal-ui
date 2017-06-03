const local = Object.freeze({



    read: function() {
        const state = JSON.parse(localStorage.getItem('state'));
        return state;
    },



    write: function(state) {
        console.log('write', state);
        localStorage.setItem('state', JSON.stringify(state));
        return state;
    }



});


module.exports = local;
