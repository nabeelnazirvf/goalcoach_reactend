import React, { Component } from 'react';
import { connect } from 'react-redux';
import { goalRef } from '../firebase';

class EditGoal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title_value
        }
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
                            value={this.props.title_value}
                            onChange={event => this.props.editTitle(event.target.value)}
                        />
                    </div>
                    <button onClick={() => this.props.updateGoal(id,email, this.props.title)} type={"button"} className={"btn btn-success"}>Update</button>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        goals: state.goals
    }
}


export default connect(mapStateToProps, {})(EditGoal);