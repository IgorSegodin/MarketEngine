require([
    'react-dom',
    'react',
    'static/js/views/core/ControllerView',
    'static/js/views/tag/TagList'
], function (ReactDOM, React, ControllerView, TagList) {
    "use strict";

    class IndexControllerView extends ControllerView {

        render() {
            return (

                <div className="w3-row">
                    <div className="w3-col">
                        <div className="w3-center">
                            <a href="#{#request.contextPath}/admin">AdminPanel</a>
                        </div>
                        <div className="w3-container">
                            <TagList list={this.state.tagList} enableEdit={false} dispatcher={this.dispatcher}/>
                        </div>
                    </div>
                </div>


            );
        }

        getActionProcessors() {
            return {
                "TagList:tagsLoaded": function(data) {
                    return {tagList : data};
                }
            };
        }
    }

    ReactDOM.render(<IndexControllerView/>, document.getElementById("bodyContainer"));
});