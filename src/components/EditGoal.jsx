import React, { Component } from 'react';
import { connect } from 'react-redux';
import { goalRef } from '../firebase';

class EditGoal extends Component {

    constructor(props) {
        super(props);
        this.title = this.props.goal.title;
    }


    render() {
        console.log('this.props.goal in edit', this.props.goal);
        const { email, title, serverKey, id } = this.props.goal;
        return (
            <div>
                <form className="form-inline">
                    <div className="form-group">
                        <label>Title</label>
                        <input
                            type="text"
                            className="form-control"
                            defaultValue={this.title}
                            onChange={event => this.title = event.target.value}
                        />
                    </div>
                    <button onClick={() => this.props.updateGoal(id,email, this.title, this.props.current_user.id)} type={"button"} className={"btn btn-success"}>Update</button>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        goals: state.goals,
        current_user: state.current_user
    }
}


export default connect(mapStateToProps, {})(EditGoal);