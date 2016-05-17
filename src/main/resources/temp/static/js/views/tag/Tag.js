define([
    'AppConfig',
    'Ajax',
    'react-dom',
    'react',
    'lib/stretchy/stretchy'
], function (AppConfig, Ajax, ReactDOM, React, Stretchy) {
    "use strict";

    return class Tag extends React.Component {

        constructor(props) {
            super(props);
            this.state = Object.assign({}, props.tag);
        }

        componentDidMount() {
            Stretchy.resizeAll(
                ReactDOM.findDOMNode(this).querySelectorAll("input")
            );
        }

        componentDidUpdate() {
            Stretchy.resizeAll(
                ReactDOM.findDOMNode(this).querySelectorAll("input")
            );
        }

        render() {
            return this.isEnableEdit() ? this._renderForEdit() : this._renderForView();
        }

        _renderForView() {
            return (
                <div className="w3-dropdown-hover w3-margin-4">
                    <button onClick={this._selectTagClick.bind(this)} className="w3-btn">{this.state.name}</button>
                    <div className="w3-dropdown-content w3-border">
                        {
                            [
                                {name: "TODO sub tags"}
                            ].map(function(subTag) {
                                    return <a href="#" key={subTag.name} onClick={this._selectSubTagClick.bind(this, subTag)}>{subTag.name}</a>
                                }.bind(this))
                        }
                    </div>
                </div>
            );
        }

        _renderForEdit() {
            return (
                <div className="w3-dropdown-hover w3-margin-4">
                    <span className="w3-btn">
                        <input name="name"
                               placeholder="Enter new tag name"
                               value={this.state.name}
                               onChange={this._onInputChange.bind(this)} style={{color: "black"}}/>

                        {!this.isShowUpdate() ? null :
                            <i onClick={this._tagSaveClick.bind(this)} className="material-icons w3-xlarge" style={{color: "green"}}>done</i>
                        }

                        {!this.isShowDelete() ? null :
                            <i onClick={this._tagDeleteClick.bind(this)} className="material-icons w3-xlarge" style={{color: "red"}}>close</i>
                        }
                    </span>
                    <div className="w3-dropdown-content w3-border">
                        {
                            [
                                {name: "TODO sub tags"}
                            ].map(function(subTag) {
                                    return <a href="#" key={subTag.name}>{subTag.name}</a>
                                }.bind(this))
                        }
                    </div>
                </div>
            );
        }

        isEnableEdit() {
            return this.props.enableEdit;
        }

        isNew() {
            return !(
                this.props.tag != null &&
                this.props.tag._links != null &&
                this.props.tag._links.self != null &&
                this.props.tag._links.self.href != null
            );
        }

        isShowDelete() {
            return this.isEnableEdit() && !this.isNew();
        }

        isShowUpdate() {
            return this.isEnableEdit() && (this.isNew() || this.state.name != this.props.tag.name);
        }

        _onInputChange(e) {
            var input = e.target;
            var state = {};
            state[input.name] = input.value;
            this.setState(state);
        }

        _tagSaveClick(e) {
            if (!e.isDefaultPrevented()) {
                e.preventDefault();
                if (this.isNew()) {
                    Ajax.post(AppConfig.baseUrl + "/api/tags", JSON.stringify(this.state))
                        .then(function(error, text) {
                            if (error) {
                                console.error(text);
                            } else {
                                this.setState({name: null});
                                this.props.dispatcher.dispatch("Tag:tagCreated", {newTag: JSON.parse(text)});
                            }
                        }.bind(this));
                } else {
                    Ajax.patch(this.props.tag._links.self.href, JSON.stringify(this.state))
                        .then(function(error, text) {
                            if (error) {
                                console.error(text);
                            } else {
                                this.props.dispatcher.dispatch("Tag:tagUpdated", {oldTag: this.props.tag, newTag: this.state});
                            }
                        }.bind(this));
                }
            }
        }

        _selectTagClick(e) {
            if (!e.isDefaultPrevented()) {
                e.preventDefault();
                this.props.dispatcher.dispatch("Tag:tagSelected", {name: this.props.tag.name});
            }
        }

        _tagDeleteClick(e) {
            if (!e.isDefaultPrevented()) {
                e.preventDefault();
                if (confirm("Delete item ?")) {
                    Ajax.del(this.props.tag._links.self.href)
                        .then(function (error, text) {
                            if (error) {
                                console.error(text);
                            } else {
                                this.props.dispatcher.dispatch("Tag:tagDeleted", {tag: this.props.tag});
                            }
                        }.bind(this));
                }
            }
        }

        _selectSubTagClick(subTag, e) {
            if (!e.isDefaultPrevented()) {
                e.preventDefault();
                this.props.dispatcher.dispatch("Tag:subTagSelected", {name: subTag.name});
            }
        }
    }
});