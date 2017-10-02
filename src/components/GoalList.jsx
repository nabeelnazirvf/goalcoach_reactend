import React, { Component } from 'react';
import { connect } from 'react-redux';
import { goalRef } from '../firebase';
import { setGoals } from "../actions/index";
import GoalItem from './GoalItem';

class GoalList extends Component {

    componentWillReceiveProps(nextProps) {
        console.log('nextProps',nextProps);
        if(this.props.email !== nextProps.email) this.forceUpdate();
    }


    componentDidMount() {
        console.log('email in CMDP', this.props, this.state);
        goalRef.orderByChild('email').equalTo("harry1@yahoo.com").on('value', snap => {
        //goalRef.on('value', snap => {
            let goals = [];
            snap.forEach(goal => {
                let goalObject = goal.val();
                const { email, title } = goal.val();
                const serverKey = goal.key;
                goals.push({ email, title, serverKey });
            })
            console.log('firebase goals 1',goals )
            this.props.setGoals(goals);
        })
    }
    render(){
        console.log('this.props.goals in goal list', this.props.goals);
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

    console.log('gload list : state',state)


    const { goals } = state;
    const { user } = state;
    const { email } = user;
    //const userGoals = goals;
    // const userGoals = [];
    // if (goals.length > 0 ){
    //     userGoals.push(goals.find(item => item.email === email));
    // }
    // return {
    //     email,
    //     userGoals
    // }

    return {
        user,
        email,
        goals
    }
}

export default connect(mapStateToProps, { setGoals })(GoalList);
