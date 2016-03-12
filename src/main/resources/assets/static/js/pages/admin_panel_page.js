require([
    'react-dom',
    'react',
    'static/js/views/core/ControllerView',
    'static/js/views/tag/TagList'
], function (ReactDOM, React, ControllerView, TagList) {
    "use strict";

    class AdminPanelControllerView extends ControllerView {

        render() {
            return (

            <div className="w3-row">
                <div className="w3-col">
                    <div className="w3-center">
                        <a href="#{#request.contextPath}/">Index</a>
                    </div>
                    <div className="w3-container">
                        <TagList list={this.state.tagList} enableEdit={true} dispatcher={this.dispatcher}/>
                    </div>
                </div>
            </div>
            );
        }

        getActionProcessors() {
            return {
                "TagList:tagsLoaded": function(data) {
                    return {tagList : data};
                },

                "Tag:tagDeleted": function(data) {
                    let tagList = this.state.tagList.slice();
                    tagList.splice(tagList.indexOf(data.tag), 1);
                    return {tagList : tagList};
                },

                "Tag:tagUpdated": function(data) {
                    let oldTag = data.oldTag;
                    let newTag = data.newTag;
                    let tagList = this.state.tagList.slice();
                    tagList.splice(tagList.indexOf(oldTag), 1, newTag);
                    return {tagList : tagList};
                },

                "Tag:tagCreated": function(data) {
                    let newTag = data.newTag;
                    let tagList = this.state.tagList.slice();
                    tagList.push(newTag);
                    return {tagList : tagList};
                }
            };
        }
    }

    ReactDOM.render(<AdminPanelControllerView/>, document.getElementById("bodyContainer"));
});