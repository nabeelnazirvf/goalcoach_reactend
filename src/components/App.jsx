import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseApp } from '../firebase';
import AddGoal from './AddGoal';
import GoalList from './GoalList';
import Notification from './Notification';
import CompleteGoalList from './CompleteGoalList';
import {setCurrentUser, setUserEmail, setNotifications, setNotification} from "../actions/index";
import {Link} from 'react-router';
import { browserHistory } from 'react-router';
import Header from './Header';
import Footer from './Footer';
import $ from "jquery";

var faye = require('faye');
var client = new faye.Client('http://localhost:9292/faye');
//var mCustomScrollbar = require('malihu-custom-scrollbar-plugin');
import { Scrollbars } from 'react-custom-scrollbars';

class App extends Component {
    componentWillMount() {
        console.log('componentWillMount in APP', JSON.parse(window.localStorage.getItem('currentUser')));
        this.props.setCurrentUser(JSON.parse(window.localStorage.getItem('currentUser')));
        fetch("http://localhost:3001/goals_notifications.json", {
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
                    this.props.setNotifications(json);
                });

            } else {
                browserHistory.replace('/signin');
            }
        });
    }


    componentDidMount(){
        console.log('componentDidMount in APP');
        var that = this;
        $(function() {
            console.log('request AIIII componentDidMount');
            client.subscribe("/goal_notification", function(data) {
                that.appendGoalNotification(data);
            });
        });
    }

    componentWillUnmount() {
        client.unsubscribe("/goal_notification");
    }

    appendGoalNotification(data) {
        this.props.setNotification(data);
    }

    render(){
        let image_url = '';
        image_url = this.props.current_user.image_base ? this.props.current_user.image_base : 'assets/img/team/img32-md.jpg'
        return (
            <div className={"wrapper"}>
                <Header current_user={this.props.current_user}/>
                <div className="container content profile">
                <div className="row">
                    {/*<!--Left Sidebar-->*/}
                    <div className="col-md-3 md-margin-bottom-40">
                        <img className="img-responsive profile-img margin-bottom-20" src={image_url} alt="" />
                        <ul className="list-group sidebar-nav-v1 margin-bottom-40" id="sidebar-nav-1">
                            <li className="list-group-item">
                                <a href="#" data-toggle="modal" data-target="#add-goal-modal">
                                    <span className={"glyphicon glyphicon-plus"} aria-hidden="true">
                                    </span> Add Goal
                                </a>
                            </li>
                        </ul>
                        {/*<!--Notification-->*/}
                        <div className="panel-heading-v2 overflow-h">
                            <h2 className="heading-xs pull-left"><i className="fa fa-bell-o"></i> Notifications</h2>
                            <a href="#"><i className="fa fa-cog pull-right"></i></a>
                        </div>
                        <Scrollbars style={{ height: 300 }}>
                            <ul className="list-unstyled margin-bottom-20" >
                                {
                                    this.props.all_notifications.length > 0 ?
                                        this.props.all_notifications.map((notification, index) => {
                                            return (
                                                <Notification notification={notification}/>
                                            )
                                        })
                                        :   console.log('length')
                                }
                                <Notification/>
                            </ul>
                        </Scrollbars>
                        <button type="button" className="btn-u btn-u-default btn-u-sm btn-block">Load More</button>
                            <div className="panel-heading-v2 overflow-h">
                                <br/>
                                <h2 className="heading-xs pull-left"><i className="fa fa-bar-chart-o"></i> Task Progress</h2>
                                <a href="#"><i className="fa fa-cog pull-right"></i></a>
                            </div>
                            <h3 className="heading-xs">Web Design <span className="pull-right">92%</span></h3>
                            <div className="progress progress-u progress-xxs">
                                <div aria-valuemax="100" aria-valuemin="0" aria-valuenow="92" role="progressbar" className="progress-bar progress-bar-u">
                                </div>
                            </div>
                            <h3 className="heading-xs">Unify Project <span className="pull-right">85%</span></h3>
                            <div className="progress progress-u progress-xxs">
                                <div  aria-valuemax="100" aria-valuemin="0" aria-valuenow="85" role="progressbar" className="progress-bar progress-bar-blue">
                                </div>
                            </div>
                            <h3 className="heading-xs">Sony Corporation <span className="pull-right">64%</span></h3>
                            <div className="progress progress-u progress-xxs margin-bottom-40">
                                <div aria-valuemax="100" aria-valuemin="0" aria-valuenow="64" role="progressbar" className="progress-bar progress-bar-dark">
                                </div>
                            </div>

                            <hr/>
                                {/*<!--End Notification-->*/}
                                <ul className="list-group sidebar-nav-v1 margin-bottom-40" id="sidebar-nav-1">
                                    <li className="list-group-item">
                                        <a href="page_profile.html"><i className="fa fa-bar-chart-o"></i> Overall</a>
                                    </li>
                                    <li className="list-group-item">
                                        <a href="page_profile_me.html"><i className="fa fa-user"></i> Profile</a>
                                    </li>
                                    <li className="list-group-item">
                                        <a href="page_profile_users.html"><i className="fa fa-group"></i> Users</a>
                                    </li>
                                    <li className="list-group-item">
                                        <a href="page_profile_projects.html"><i className="fa fa-cubes"></i> My Projects</a>
                                    </li>
                                    <li className="list-group-item">
                                        <a href="page_profile_comments.html"><i className="fa fa-comments"></i> Comments</a>
                                    </li>
                                    <li className="list-group-item active">
                                        <a href="page_profile_history.html"><i className="fa fa-history"></i> History</a>
                                    </li>
                                    <li className="list-group-item">
                                        <a href="page_profile_settings.html"><i className="fa fa-cog"></i> Settings</a>
                                    </li>
                                </ul>

                                <div className="margin-bottom-50"></div>

                                {/*<!--Datepicker-->*/}
                                <form action="#" id="sky-form2" className="sky-form">
                                    <div id="inline-start"></div>
                                </form>
                        {/*<!--End Datepicker-->*/}
                    </div>
                    {/*<!--End Left Sidebar-->*/}

                    {/*<!-- Profile Content -->*/}
                    <div className="col-md-9">
                        <div className="profile-body">
                            {/*<!--Timeline-->*/}
                            <AddGoal user_id={this.props.current_user.user_id}/>
                            <GoalList emaill={this.props.email}/>
                            {/*<!--End Timeline-->*/}
                        </div>
                    </div>
                    {/*<!-- End Profile Content -->*/}
                </div>
            </div>
                <Footer/>
            </div>
        //     <!--/container-->
        // <!--=== End Profile ===-->
        )
    }
}

function mapStateToProps(state) {
    console.log('mapStateToProps in APP', state);
    const { user } = state;
    const { current_user } = state;
    const { all_notifications } = state;
    return {
        current_user,
        all_notifications
    }
}

export default connect(mapStateToProps, { setCurrentUser, setNotifications, setNotification})(App);
