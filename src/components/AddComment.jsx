import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { setComment } from "../actions/index";
import { connect } from 'react-redux';
import $ from "jquery";
import {SERVER_URL} from '../constants';

class AddComment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            commentTitle: ''
        }
    }

    addComment(unique_goal_id){
        const { commentTitle } = this.state;
        let user_id = this.props.current_user? this.props.current_user.id : JSON.parse(window.localStorage.getItem('currentUser')).id;
        fetch(SERVER_URL+"/comments.json", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': window.localStorage.getItem('access_token')
            },
            mode: 'cors',
            cache: 'default',
            body: JSON.stringify( {comment: {user_id: user_id, goal_id: unique_goal_id, text:commentTitle} })
        }).catch((error) => {
            this.setState({error});
        }).then((res) => {
            if (res.ok) {
                res.json().then((json) => {
                    this.props.setComment(json);
                    $('#add-comment-modal-close-'+unique_goal_id).click();
                });

            } else {
                browserHistory.replace('/signin');
            }
        });
    }

    render(){
        const {unique_goal_id} = this.props;
        return (
            <div>
                <div key={this.props.unique_goal_id} className="modal fade" id={"add-comment-modal-"+this.props.unique_goal_id} role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                <h4 className="modal-title" id="myModalLabel4">Add Comment</h4>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <h4>Add Comment</h4>
                                        <p>
                                            <input
                                                type="text"
                                                placeholder="Add a comment"
                                                className="form-control"
                                                style={{marginRight: '5px'}}
                                                onChange={event => this.setState({commentTitle: event.target.value})}
                                            />
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button id={"add-comment-modal-close-"+this.props.unique_goal_id} type="button" className="btn-u btn-u-default" data-dismiss="modal">Close</button>
                                <button type="button" className="btn-u btn-u-primary" onClick={() => this.addComment(this.props.unique_goal_id)}> Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null, {setComment})(AddComment);
