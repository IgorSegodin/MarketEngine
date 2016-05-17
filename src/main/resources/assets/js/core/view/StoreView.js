import React from 'react'

import {createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

/**
 * State (Store) holder for all child components.
 * */
class StoreView extends React.Component {

    constructor(props) {
        super(props);

        // all subscribed child reducer functions, for all child action types
        this.internalReduceMap = {};

        // all subscribed child state listeners
        this.internalStateListeners = [];

        this.store = createStore(
            this.reduce.bind(this),
            {},
            applyMiddleware(thunkMiddleware)
        );
    }

    /**
     * Common context for all children
     * */
    getChildContext() {
        return {
            dispatch: this.dispatch.bind(this),
            registerReducerMap: this.registerReducerMap.bind(this),
            registerStateListener: this.registerStateListener.bind(this)
        }
    }

    componentDidMount() {
        if (!this.unsubscribe) {
            this.unsubscribe = this.store.subscribe(this.handleStateChange.bind(this));
        }
    }

    componentWillUnmount() {
        if (this.unsubscribe) {
            this.unsubscribe();
            this.unsubscribe = null
        }
    }

    dispatch(action) {
        if (process.env.NODE_ENV !== 'production') {
            if (this.reduceInProgress) {
                throw new Error("Method dispatch should not be invoked from reducer map function, because of cyclic state changing.");
            }
            if (this.stateChangeInProgress) {
                throw new Error("Method dispatch should not be invoked from 'handleStateChange' function, because of cyclic state changing.");
            }
        }
        this.store.dispatch(action);
    }

    // Add reducer handlers (functions) mapped to action types
    registerReducerMap(reduceMap) {
        Object.assign(this.internalReduceMap, reduceMap);
    }

    // Add state change listener
    registerStateListener(listener) {
        this.internalStateListeners.push(listener);
    }

    /**
     * Main store reducer function.
     * */
    reduce(state, action) {
        if (process.env.NODE_ENV !== 'production') {
            this.reduceInProgress = true;
        }

        var result = state;

        switch (action.type) {
            case "@@redux/INIT" :
                break;
            default :
            {
                const reducer = this.internalReduceMap[action.type];
                if (reducer) {
                    result = Object.assign({}, state, reducer(state, action));
                    break;
                } else {
                    console.warn("Unmapped action '" + action.type + "'.");
                }
            }
        }

        if (process.env.NODE_ENV !== 'production') {
            this.reduceInProgress = false;
        }

        return result;
    }

    /**
     * Subscribes to store state changes, notifies subscribed children.
     * */
    handleStateChange() {
        if (process.env.NODE_ENV !== 'production') {
            this.stateChangeInProgress = true;
        }

        this.internalStateListeners.forEach(function(listener) {
            listener(this.store.getState());
        }.bind(this));

        if (process.env.NODE_ENV !== 'production') {
            this.stateChangeInProgress = false;
        }
    }

    /**
     * Can have multiple children
     * */
    render() {
        if (this.props.children) {
            if (Array.isArray(this.props.children)) {
                return (
                    <span>
                        {this.props.children}
                    </span>
                )
            } else {
                return React.Children.only(this.props.children);
            }
        } else {
            throw new Error("Component " + this.props.children + " should have children.");
        }
    }
}

StoreView.childContextTypes = {
    dispatch: React.PropTypes.func.isRequired,
    registerReducerMap: React.PropTypes.func.isRequired,
    registerStateListener: React.PropTypes.func.isRequired
};

export default StoreView;