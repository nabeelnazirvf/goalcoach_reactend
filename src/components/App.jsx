import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseApp } from '../firebase';
import AddGoal from './AddGoal';
import GoalList from './GoalList';
import CompleteGoalList from './CompleteGoalList';
import {setCurrentUser, setUserEmail} from "../actions/index";
import {Link} from 'react-router';
import { browserHistory } from 'react-router';

class App extends Component {
    componentDidMount() {
        console.log('componentDidMount in APP', JSON.parse(window.localStorage.getItem('currentUser')));
        this.props.setCurrentUser(JSON.parse(window.localStorage.getItem('currentUser')));
    }

    signOut() {
        window.localStorage.removeItem('currentUser');
        browserHistory.replace('/signin');
    }
    render(){
        let image_url = '';
        image_url = this.props.current_user.image_base ? this.props.current_user.image_base : 'http://itsworldcongress2017.org/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png'
        return (
            <div className={"container"}>
                <div className={"row"}>
                    <nav className="navbar navbar-default">
                        <div className="container">
                            <div className="navbar-header">
                                <span className="navbar-brand">Welcome {this.props.current_user.name} To Goal Coach</span>
                            </div>
                            <div className={"sign-out-margin-top pull-right"}>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => this.signOut()}>
                                    Sign Out.
                                </button>
                            </div>
                            <Link className="update-profile-link" to={"/update-profile"}>
                                <img src={image_url} className="img-circular"/>
                            </Link>
                        </div>
                    </nav>
                </div>
                <div className={"content"}>
                    <div style={{margin: '5px'}}>
                        <AddGoal />
                        <hr />
                        <GoalList emaill={this.props.email}/>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log('mapStateToProps in APP', state);
    const { user } = state;
    const { current_user } = state;
    return {
        current_user
    }
}

export default connect(mapStateToProps, { setCurrentUser })(App);
