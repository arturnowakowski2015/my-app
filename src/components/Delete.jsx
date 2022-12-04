import React from "react";

class Delete extends React.Component {
    componentDidMount() {
        window.location.href = window.location.href.slice(0, window.location.href.lastIndexOf("/") - 1) + "pagination/0"

    };
    render() {
        return <div> deleted!! </div>
    }
}

export default Delete;