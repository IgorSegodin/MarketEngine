/**
 * Redux Store Wrapper.
 * Hide Store from underlying react views
 * */
define(function () {
    "use strict";

    return function(store) {
        this.dispatch = function(type, data) {
            store.dispatch({type: type, data: data});
        };
    }

});