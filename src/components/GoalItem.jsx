import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteGoal } from "../actions/index";
import { completeGoalRef, goalRef } from '../firebase';
import EditGoal from "./EditGoal";
import { updateGoal } from "../actions/index";
import { browserHistory } from 'react-router';

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

    completeGoal() {
        const { email } = this.props.user;
        const { title, serverKey } = this.props.goal;
        goalRef.child(serverKey).remove();
        completeGoalRef.push({email, title});
    }

    editTitle(text) {
        this.setState({title: text});
    }

    deleteGoal(id){
        fetch("http://localhost:3001/goals/"+id+".json", {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': window.localStorage.getItem('access_token')
            },
            mode: 'cors',
            cache: 'default',
            body: JSON.stringify({goal_id: id})
        }).catch((error) => {
            this.setState({error});
            console.log("Fail zone");
        }).then((res) => {
            console.log('res', res);
            if (res.ok) {
                this.props.deleteGoal(id);

            } else {
                console.log("error", res);
                browserHistory.replace('/signin');
            }
        });
    }

    updateGoal(id,email, title){

        fetch("http://localhost:3001/goals/"+id+".json", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': window.localStorage.getItem('access_token')
            },
            mode: 'cors',
            cache: 'default',
            body: JSON.stringify({title: title, goal_id: id})
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

    render() {
        console.log('Goal item goals', this.props, this.props.goal.title);
        const {title, id, serverKey, created_at } = this.props.goal;
        const { email } = this.props.user;
        var myDate = new Date(created_at);
        return (
            <li>
                <time className="cbp_tmtime" datetime=""><span>{myDate.getDate() + "-" + (myDate.getMonth() + 1) + "-" +  myDate.getFullYear()}</span> <span>{myDate.getFullYear()}</span></time>
                <i className="cbp_tmicon rounded-x hidden-xs"></i>
                <div className="cbp_tmlabel">
                    <h2>{title}</h2>
                    <div className="row">
                        <div className="col-md-4">
                            <img className="img-responsive" src="assets/img/main/img18.jpg" alt="" />
                            <div className="md-margin-bottom-20"></div>
                        </div>
                        <div className="col-md-8">
                            <p>Winter purslane courgette pumpkin quandong komatsuna fennel green bean cucumber watercress. Pea sprouts wattle seed rutabaga okra yarrow cress avocado grape.</p>
                            <p>Cabbage lentil cucumber chickpea sorrel gram garbanzo plantain lotus root bok choy squash cress potato.</p>
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className="col-md-4">
                            <a className="btn btn-default" onClick={() => this.setState({ isEditVisible: true}) }>
                                <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                            </a>
                            &nbsp;
                            <a className="btn btn-danger" onClick={() => this.deleteGoal(id) }>
                                <span className="glyphicon glyphicon-trash" aria-hidden="true"></span>
                            </a>
                        </div>
                        <div className="col-md-8">
                            { this.state.isEditVisible ? <EditGoal goal={this.props.goal} title_value={this.state.title} updateGoal={this.updateGoal} editTitle={this.editTitle} /> : null }
                        </div>
                    </div>
                </div>
            </li>
        )
    }
}

export default connect(null, { deleteGoal, updateGoal })(GoalItem);
