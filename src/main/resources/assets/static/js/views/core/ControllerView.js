define([
    'react',
    'redux',
    'static/js/util/ActionDispatcher'
], function (React, Redux, ActionDispatcher) {
    "use strict";

    return class ControllerView extends React.Component {

        constructor(props) {
            super(props);
            this.state = {};
        }

        componentWillMount() {
            let store = Redux.createStore(this._doDispatch.bind(this));
            this.dispatcher = new ActionDispatcher(store);

            this.unsubscribe = store.subscribe(function () {
                this.setState(store.getState() || {});
            }.bind(this))
        }

        componentWillUnmount() {
            this.unsubscribe();
        }

        render() {
            throw new Error("You should override 'render' method for " + this.constructor.name);
        }

        getActionProcessors() {
            throw new Error("You should override 'getActionProcessors' method for " + this.constructor.name + ". It should return map, where key is action type, and value is a function which receives data from action.");
        }

        _doDispatch(state, action) {
            switch (action.type) {
                case "@@redux/INIT" : break;
                default : {
                    let processor = this.getActionProcessors()[action.type];
                    if (processor) {
                        return processor.call(this, action.data);
                    } else {
                        console.warn("Unmapped action '" + action.type + "' in controller " + this.constructor.name);
                    }
                }
            }
        }
    };
});