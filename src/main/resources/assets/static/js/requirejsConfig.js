var require = {
    baseUrl: "#{#request.contextPath}/",
    //urlArgs: "v=${build.timestamp}",
    paths: {
        react: "lib/react/react-0.14.7",
        "react-dom": "lib/react/react-dom-0.14.7",
        redux: "lib/react/redux",
        underscore: "lib/underscore/underscore-1.8.3",

        AppConfig: "static/js/AppConfig",
        Ajax: "static/js/util/Ajax"
    },
    shim: {
        'lib/stretchy/stretchy': {
            exports: 'Stretchy'
        }
    }
};