import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateGoal } from "../actions/index";
//import { completeGoalRef, goalRef } from '../firebase';

class EditGoal extends Component {
    updateGoal(serverKey,email){
        console.log('updateGoal this.state.goal and serverKey', this.state.title, serverKey);
        this.props.updateGoal(this.state.title, serverKey, email);
    }

    render() {
        const { email, title, serverKey } = this.props.goal;
        console.log('edit title serverKey:', email, title, serverKey, this.props.goal);
        return (
            <div>
                <form className="form-inline">
                    <div className="form-group">
                        <label>Title</label>
                        <input
                            type="text"
                            className="form-control"
                            // value={title}
                            onChange={event => this.setState({title: event.target.value})}
                        />
                    </div>
                    <button onClick={() => this.updateGoal(serverKey,email)} type={"button"} className={"btn btn-success"}>Update</button>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log('mapStateToProps', state);
    return {
        goals: state
    }
}


export default connect(mapStateToProps, {updateGoal})(EditGoal);