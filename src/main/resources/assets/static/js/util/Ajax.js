/**
 * Wrapper for promise.js
 * */
define(['lib/promise/promise'], function (promise) {

    var defaultHeaders = {
        "Content-Type": "application/json;charset=UTF-8"
    };

    var Ajax = Object.assign({}, promise);

    Object.assign(Ajax, {
        post: function(url, data, headers) {
            headers = Object.assign(headers || {}, defaultHeaders);
            return promise.post(url, data, headers);
        },

        patch: function(url, data, headers) {
            headers = Object.assign(headers || {}, defaultHeaders);
            return promise.ajax("PATCH", url, data, headers);
        }
    });

    return Ajax;
});