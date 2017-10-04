import React, { Component } from 'react';
import { connect } from 'react-redux';
import { goalRef } from '../firebase';
import { setGoals } from "../actions/index";
import GoalItem from './GoalItem';
import { browserHistory } from 'react-router';
class GoalList extends Component {

    // componentWillReceiveProps(nextProps) {
    //     console.log('componentWillReceiveProps in listing ', this.props, nextProps);
    //     if(this.props.email !== nextProps.email){
    //         //goalRef.orderByChild('email').equalTo(nextProps.email).on('value', snap => {
    //         goalRef.on('value', snap => {
    //             let goals = [];
    //             snap.forEach(goal => {
    //                 let goalObject = goal.val();
    //                 const { email, title } = goal.val();
    //                 const serverKey = goal.key;
    //                 goals.push({ email, title, serverKey });
    //             })
    //             this.props.setGoals(goals);
    //         })
    //     }
    // }

    componentDidMount(){
        console.log('componentDidMount props', this.props);
        fetch("http://localhost:3001/goals.json", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': window.localStorage.getItem('access_token')
            },
            mode: 'cors',
            cache: 'default',
            body: undefined
        }).catch((error) => {
            console.log("Fail zone", error);
        }).then((res) => {
            if (res.ok) {
                res.json().then((json) => {
                    console.log('goals', json);
                    this.props.setGoals(json);
                });
                console.log('res', res);

            } else {
                console.log("error", res);
                browserHistory.replace('/signin');
            }
        });
    }

    render(){
        return(
            <div>
                {
                    this.props.goals.map((goal, index) => {
                        return (
                            <GoalItem key={index} goal={goal} user={this.props.user} />
                        )
                    })
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { goals } = state;
    const { user } = state;
    const { email } = user;
    return {
        user,
        email,
        goals
    }
}

export default connect(mapStateToProps, { setGoals })(GoalList);
