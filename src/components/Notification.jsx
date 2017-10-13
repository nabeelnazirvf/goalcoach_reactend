import React, { Component } from 'react';
import {Link} from 'react-router';

class Notification extends Component {
    render(){
        console.log('notification', this.props.notification);
        let myDate = '';
        this.props.notification? myDate = new Date(this.props.notification.created_at) : ""
        return (
            this.props.notification?
                <li className="notification">
                    <img className="rounded-x mCS_img_loaded" src={this.props.notification.image_base} alt=""/>
                    <div className="overflow-h">
                        <span><strong>{this.props.notification.user_name}</strong> added a goal: {this.props.notification.title}.</span>
                        <small>{myDate.getDate() + "-" + (myDate.getMonth() + 1) + "-" +  myDate.getFullYear()}</small>
                    </div>
                </li>
            : null
        )
    }
}

export default Notification;
