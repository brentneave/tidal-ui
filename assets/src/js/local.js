const Local = Object.freeze({



    read: function() {
        const state = JSON.parse(localStorage.getItem("state"));
        console.log('Local.read', state);
        return state;
    },



    write: function(state) {
        console.log('Local.write', state);
        localStorage.setItem("state", JSON.stringify(state));
        return this.read();
    }



});


module.exports = Local;
