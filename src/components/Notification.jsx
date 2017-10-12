import React, { Component } from 'react';
import {Link} from 'react-router';

class Notification extends Component {
    render(){
        return (
            this.props.notification?
                <li className="notification">
                    <i className="icon-custom icon-sm rounded-x icon-bg-red icon-line icon-envelope"></i>
                    <div className="overflow-h">
                        <span><strong>{this.props.notification.username}</strong> add a goal: {this.props.notification.title}.</span>
                        <small>{this.props.notification.created_at}</small>
                    </div>
                </li>
            : null
        )
    }
}

export default Notification;
