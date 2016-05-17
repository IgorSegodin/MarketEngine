define([
    'AppConfig',
    "Ajax",
    'react',
    'static/js/views/tag/Tag'
], function (AppConfig, Ajax, React, Tag) {
    "use strict";

    class TagList extends React.Component {

        componentDidMount() {
            Ajax.get(AppConfig.baseUrl + "/api/tags", "page=0&size=20&sort=name,asc")
                .then(function (error, text) {
                    if (error) {
                        console.error(text);
                    } else {
                        let response = JSON.parse(text);
                        this.props.dispatcher.dispatch("TagList:tagsLoaded", response._embedded.tags);
                    }
                }.bind(this));
        }

        render() {

            let tags = this.props.list.map(function (tag) {
                return <Tag dispatcher={this.props.dispatcher} key={tag._links.self.href} tag={tag} enableEdit={this.props.enableEdit}/>;
            }.bind(this));

            if (this.props.enableEdit) {
                tags.push(<Tag dispatcher={this.props.dispatcher} key="empty" enableEdit={true}/>);
            }

            return (
                <div className="w3-center">
                    {tags.length > 0 ? tags : "Empty content."}
                </div>
            );
        }

    }
    TagList.defaultProps = {list: []};

    return TagList;
});