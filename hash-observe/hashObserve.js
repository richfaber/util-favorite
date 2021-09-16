(function( global ) {

    function hashChangeAction() {

        let route = global['observeHash']['route'];

        if (route[location.hash]) {

            route[location.hash].action.forEach(function( callback ) {
                callback();
            });

        }

        if(global['observeHash'].currentHash != location.hash) {

            if(route[global['observeHash'].currentHash]) {

                let leave = route[global['observeHash'].currentHash].leave;
                if(leave.length) {
                    leave.forEach(function( callback ) {
                        callback();
                    });
                }

            }
        }

        global['observeHash'].currentHash = location.hash;
    }

    if( 'observeHash' in global ) return;

    global['observeHash'] = {
        route: {},
        currentHash: null,
        register(url, callback, reset) {

            if(this.route[url]) {
                this.route[url].action.push(callback);
            } else {
                this.route[url] = {};
                this.route[url].action = [callback];
            }

            if (reset) {
                if(this.route[url].leave) {
                    this.route[url].leave.push(reset);
                } else {
                    this.route[url].leave = [reset];
                }

            }

            return this;
        }
    };

    global.addEventListener('hashchange', hashChangeAction);
    global.addEventListener('load', hashChangeAction);

})(window);