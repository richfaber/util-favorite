
# Hash Observe

페이지의 `#` 해시를 이용해서 URL 패턴 구현

## 사용법

```javascript
const sideNavHandler = {
    open() {
        console.log('open');
    },

    close() {
        console.log('close');        
    }    
}

// Action : 해당 URL 진입시 동작
// Leave : 해당 URL 이탈시 동작
window['observeHash'].register({string: hashURL},{function: Action}, {function: Leave});

// sample
window['observeHash'].register('#openSideMenu', sideNavHandler.open, sideNavHandler.close);
```

## 구현코드

```javascrript
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
```