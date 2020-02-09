import React, { Component } from "react";
import Toast from 'react-bootstrap/Toast';

// Notification
class Message extends Component {
    constructor(props) {
        super(props);
        this.state = { show: 'true' };
    }

    render() {
        return (
            <div>
                <Toast show={this.props.message && this.state.show}>
                    <Toast.Header closeButton={false}>
                        <strong className="mr-auto">Notification</strong>
                    </Toast.Header>
                    <Toast.Body>{this.props.message}</Toast.Body>
                </Toast>
            </div>
        );
    }
}

export default Message;
