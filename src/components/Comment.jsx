import React, { Component } from 'react';
class Comment extends Component {

    render(){
        const {text, created_at} = this.props.comment;
        const {name, image_base} = this.props.comment.user;
        return (
            <div className="media media-v2">
                <a className="pull-left" href="#">
                    <img className="media-object rounded-x" src={image_base} alt="" />
                </a>
                <div className="media-body">
                    <h4 className="media-heading">
                        <strong><a href="#">{name}</a></strong> {'@'+name}
                        <small>{created_at}</small>
                    </h4>
                    <p>{text}</p>
                    <ul className="list-inline results-list pull-left">
                        <li><a href="#">0 Likes</a></li>
                        <li><a href="#">0 Share</a></li>
                    </ul>
                    <ul className="list-inline pull-right">
                        <li><a href="#"><i className="expand-list rounded-x fa fa-reply"></i></a></li>
                        <li><a href="#"><i className="expand-list rounded-x fa fa-heart"></i></a></li>
                        <li><a href="#"><i className="expand-list rounded-x fa fa-retweet"></i></a></li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default Comment;
