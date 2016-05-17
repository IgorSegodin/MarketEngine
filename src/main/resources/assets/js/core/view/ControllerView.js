import React from 'react';

import generateId from 'js/common/util/generateId';

/**
 * Frame for controller view, which manages presentational layers.
 * Should dispatch and reduce actions.
 * */
class ControllerView extends React.Component {

    constructor(props, context) {
        super(props, context);
        // Each controller should have unique Identifier
        // Can be useful, when have multiple Controllers of the same type, with same actions, which use same Store
        this.cid = generateId();
        // saving link to store dispatch function
        this.dispatch = context.dispatch;

        // TODO maybe we should also unregister, if it is possible that within same page controllers can change.
        context.registerReducerMap(this.getReducerMap());
        context.registerStateListener(this.onStateChange.bind(this));
    }

    /**
     * Each Controller should know how to render it's presentational layer.
     * */
    render() {
        throw new Error("Component " + this.constructor.name + " should override function 'render'.");
    }

    /**
     * Every time, when global State (Store) changes, this method is being invoked.
     * Each controller should compare it's local state with new global state, and update itself if needed.
     * */
    onStateChange(newState) {
        throw new Error("Component " + this.constructor.name + " should override function 'onStateChange'.");
    }

    /**
     * Links action type to it's handler function (reducer).
     * Each reducer should know how to put data from action to global State (Store).
     * @return {Object} where key is action type, and value is a function(state, action)
     * */
    getReducerMap() {
        throw new Error("Component " + this.constructor.name + " should override function 'getReducerMap'.");
    }

    /**
     * Can help to avoid action name clash within single Store.
     * @param type {String} constant action type.
     * @return action type with unique controller identifier.
     * */
    actionType(type) {
        return this.cid + "_" + type;
    }
}

ControllerView.contextTypes = {
    dispatch: React.PropTypes.func.isRequired,
    registerReducerMap: React.PropTypes.func.isRequired,
    registerStateListener: React.PropTypes.func.isRequired
};

export default ControllerView;