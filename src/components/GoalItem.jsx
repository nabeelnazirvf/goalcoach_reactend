import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteGoal } from "../actions/index";
import EditGoal from "./EditGoal";
import { updateGoal, setComments } from "../actions/index";
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
            console.log("Fail zone");
        }).then((res) => {
            console.log('res', res);
            if (res.ok) {
                this.props.updateGoal(email, title, id);
                this.setState({isEditVisible: false});

            } else {
                console.log("error", res);
                browserHistory.replace('/signin');
            }
        });
    }

    componentWillMount() {
        fetch("http://localhost:3001/comments.json?goal_id="+this.props.goal.id, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': window.localStorage.getItem('access_token')
            },
            mode: 'cors',
            cache: 'default',
            body: undefined
        }).catch((error) => {
        }).then((res) => {
            if (res.ok) {
                res.json().then((json) => {
                    this.props.setComments(json);
                });

            } else {
                browserHistory.replace('/signin');
            }
        });
    }


    render() {
        const {title, id, serverKey, created_at } = this.props.goal;
        const { email } = this.props.user;
        var myDate = new Date(created_at);
        return (
            <div className="media media-v2">
                <a className="pull-left" href="#">
                    <img className="media-object rounded-x" src={this.props.current_user.image_base} alt="" />
                </a>
                <div className="media-body">
                    <h4 className="media-heading">
                        <strong><a href="#">{this.props.current_user.name}</a></strong> {'@' + this.props.current_user.name}
                        <small>{created_at}</small>
                    </h4>
                    <p>{title}</p>
                    <ul className="list-inline results-list pull-left">
                        <li><a href="#">25 Likes</a></li>
                        <li><a href="#">10 Share</a></li>
                    </ul>
                    <ul className="list-inline pull-right">
                        <li>
                            <a className="" onClick={() => this.setState({ isEditVisible: true}) }>
                                <i className="expand-list rounded-x fa fa-pencil" aria-hidden="true"></i>
                            </a>
                        </li>
                        <li>
                            <a className="" onClick={() => this.deleteGoal(id, this.props.user_id) }>
                                <i className="expand-list rounded-x fa fa-trash-o" aria-hidden="true"></i>
                            </a>
                        </li>
                        <li><a href="#"><i className="expand-list rounded-x fa fa-reply"></i></a></li>
                        <li><a href="#"><i className="expand-list rounded-x fa fa-heart"></i></a></li>
                        <li><a href="#"><i className="expand-list rounded-x fa fa-retweet"></i></a></li>
                    </ul>
                    <div className="col-md-8">
                        { this.state.isEditVisible ? <EditGoal goal={this.props.goal} title_value={this.state.title} updateGoal={this.updateGoal} editTitle={this.editTitle} /> : null }
                    </div>
                    <div className="clearfix"></div>
                    {
                        this.props.goal_comments.length > 0 ?
                            this.props.goal_comments.map((comment, index) => {
                                return (
                                    <Comment key={index} comment={comment} />
                                )
                            })
                            :   null
                    }
                </div>
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

export default connect(mapStateToProps, { deleteGoal, updateGoal, setComments})(GoalItem);
