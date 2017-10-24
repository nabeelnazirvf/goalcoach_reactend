import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteGoal } from "../actions/index";
import EditGoal from "./EditGoal";
import AddComment from "./AddComment";
import { updateGoal, setComments, getAllComments} from "../actions/index";
import { browserHistory } from 'react-router';
import Comment from "./Comment";

class GoalItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: this.props.goal.title,
            isEditVisible: false
        }
        this.updateGoal = this.updateGoal.bind(this);
        this.editTitle = this.editTitle.bind(this);
    }

    componentWillMount() {
        this.props.getAllComments();
    }

    editTitle(text) {
        this.setState({title: text});
    }

    deleteGoal(id, user_id){
        fetch("http://localhost:3001/goals/"+id+".json", {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': window.localStorage.getItem('access_token')
            },
            mode: 'cors',
            cache: 'default',
            body: JSON.stringify({goal_id: id, user_id: user_id})
        }).catch((error) => {
            this.setState({error});
        }).then((res) => {
            if (res.ok) {
                this.props.deleteGoal(id);

            } else {
                browserHistory.replace('/signin');
            }
        });
    }

    updateGoal(id,email, title, user_id){

        fetch("http://localhost:3001/goals/"+id+".json", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': window.localStorage.getItem('access_token')
            },
            mode: 'cors',
            cache: 'default',
            body: JSON.stringify({title: title, goal_id: id, user_id: user_id})
        }).catch((error) => {
            this.setState({error});
        }).then((res) => {
            if (res.ok) {
                this.props.updateGoal(email, title, id);
                this.setState({isEditVisible: false});

            } else {
                browserHistory.replace('/signin');
            }
        });
    }

    desiredComments(goal_id){
        let comments = [];
        this.props.goal_comments.forEach((comment) => {
            if(comment.goal_id === goal_id) {
                comments.push(comment);
            }
        });
        return comments;
    }

    render() {
        const {title, id, serverKey, created_at } = this.props.goal;
        const { email } = this.props.user;
        var myDate = new Date(created_at);
        let desired_comments = this.desiredComments(this.props.goal.id);
        return (
            <div className="media media-v2">
                <a className="pull-left" href="#">
                    <img className="media-object rounded-x" src={this.props.desired_user.image_base} alt="" />
                </a>
                <div className="media-body">
                    <h4 className="media-heading">
                        <strong><a href="#">{this.props.desired_user.name}</a></strong> {'@' + this.props.desired_user.name}
                        <small>{created_at}</small>
                    </h4>
                    <p>{title}</p>
                    <ul className="list-inline results-list pull-left">
                        <li><a href="#">25 Likes</a></li>
                        <li><a href="#">10 Share</a></li>
                    </ul>
                    <ul className="list-inline pull-right">
                        {
                            this.props.current_user.id === this.props.desired_user.id ?
                                <li>
                                    <a className="" onClick={() => this.setState({ isEditVisible: true}) }>
                                        <i className="expand-list rounded-x fa fa-pencil" aria-hidden="true"></i>
                                    </a>
                                </li>
                            : null
                        }
                        {
                            this.props.current_user.id === this.props.desired_user.id ?
                                <li>
                                    <a className="" onClick={() => this.deleteGoal(id, this.props.user_id) }>
                                        <i className="expand-list rounded-x fa fa-trash-o" aria-hidden="true"></i>
                                    </a>
                                </li>
                                : null
                        }
                        <li><a href="#" data-toggle="modal" data-goal-id={id} data-target={"#add-comment-modal-"+id}><i className="expand-list rounded-x fa fa-comments "></i></a></li>
                        <li><a href="#"><i className="expand-list rounded-x fa fa-reply"></i></a></li>
                        <li><a href="#"><i className="expand-list rounded-x fa fa-heart"></i></a></li>
                        <li><a href="#"><i className="expand-list rounded-x fa fa-retweet"></i></a></li>
                    </ul>
                    <div className="col-md-8">
                        { (this.state.isEditVisible && this.props.current_user.id === this.props.desired_user.id) ? <EditGoal goal={this.props.goal} title_value={this.state.title} updateGoal={this.updateGoal} editTitle={this.editTitle}  desired_user={this.props.desired_user} /> : null }
                    </div>
                    <div className="clearfix"></div>
                    {
                        desired_comments.map((comment, index) => {
                            return (
                                <Comment comment={comment} />
                            )
                        })
                    }
                </div>
                <AddComment addComment={this.addComment} unique_goal_id={this.props.goal.id} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { current_user } = state;
    const { goal_comments } = state;
    return {
        current_user,
        goal_comments
    }
}

export default connect(mapStateToProps, { deleteGoal, updateGoal, setComments, getAllComments})(GoalItem);
