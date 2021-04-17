import React from "react";

export default class Player extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            urlSrc: "",
        };
    };
    time = 0;

    receiveData = (data) => {
        this.setState({
            urlSrc: data.url,
        });
        this.time = data.status.time;
    };

    changeUrl = (url) => {
        this.setState({urlSrc: url});
    };

    sendMyStatus = (title, time) => {
        this.props.io.sendStatusMessage({title, time});
    };

    onChangeStatus = (status) => {
        console.log(status);

        switch (status.title) {
            case "play":
                document.getElementById("videoFrame").contentWindow.postMessage({"api":"seek", "set": status.time}, "*");
                document.getElementById("videoFrame").contentWindow.postMessage({"api":"play"}, "*");
                break;
            case "pause":
                document.getElementById("videoFrame").contentWindow.postMessage({"api":"seek", "set": status.time}, "*");
                document.getElementById("videoFrame").contentWindow.postMessage({"api":"pause"}, "*");
                break;
            case "seek":
                this.time = status.time;
                document.getElementById("videoFrame").contentWindow.postMessage({"api":"seek", "set": status.time}, "*");
                break;
            default:
                break;
        };
    };

    componentDidMount() {

        this.props.io.receiveDataMessage(this.receiveData);
        this.props.io.changeUrlMessage(this.changeUrl);
        this.props.io.changeStatusMessage(this.onChangeStatus);

        window.addEventListener("message", function (event) {

            switch (event.data.event) {
                case "time":
                    this.time = event.data.time;
                    break;
                case "play":
                    this.sendMyStatus("play", this.time);
                    break;
                case "pause":
                    this.sendMyStatus("pause", this.time);
                    break;
                case "seek":
                    this.sendMyStatus("seek", this.time);
                    break;
                default:
                    break;
            }
        }.bind(this));
    }

    render() {

        return (
            <iframe key='videoFrame' id='videoFrame' title="videoFrame" src={this.state.urlSrc}
                    frameBorder='0' allowFullScreen referrerPolicy="origin" style={{width: '100%', height: "100%"}}>
            </iframe>
        )
    }


}