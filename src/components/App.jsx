import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseApp } from '../firebase';
import AddGoal from './AddGoal';
import GoalList from './GoalList';
import CompleteGoalList from './CompleteGoalList';
import {setCurrentUser, setUserEmail} from "../actions/index";
import {Link} from 'react-router';
import { browserHistory } from 'react-router';
import Header from './Header'
import Footer from './Footer'
class App extends Component {
    componentDidMount() {
        console.log('componentDidMount in APP', JSON.parse(window.localStorage.getItem('currentUser')));
        this.props.setCurrentUser(JSON.parse(window.localStorage.getItem('currentUser')));
    }

    render(){
        let image_url = '';
        image_url = this.props.current_user.image_base ? this.props.current_user.image_base : 'assets/img/team/img32-md.jpg'
        return (
            <div>
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
                        <ul className="list-unstyled mCustomScrollbar margin-bottom-20" data-mcs-theme="minimal-dark">
                            <li className="notification">
                                <i className="icon-custom icon-sm rounded-x icon-bg-red icon-line icon-envelope"></i>
                                <div className="overflow-h">
                                    <span><strong>Albert Heller</strong> has sent you email.</span>
                                    <small>Two minutes ago</small>
                                </div>
                            </li>
                            <li className="notification">
                                <img className="rounded-x" src="assets/img/testimonials/img6.jpg" alt="" />
                                <div className="overflow-h">
                                    <span><strong>Taylor Lee</strong> started following you.</span>
                                    <small>Today 18:25 pm</small>
                                </div>
                            </li>
                            <li className="notification">
                                <i className="icon-custom icon-sm rounded-x icon-bg-yellow icon-line fa fa-bolt"></i>
                                <div className="overflow-h">
                                    <span><strong>Natasha Kolnikova</strong> accepted your invitation.</span>
                                    <small>Yesterday 1:07 pm</small>
                                </div>
                            </li>
                            <li className="notification">
                                <img className="rounded-x" src="assets/img/testimonials/img1.jpg" alt="" />
                                <div className="overflow-h">
                                    <span><strong>Mikel Andrews</strong> commented on your Timeline.</span>
                                    <small>23/12 11:01 am</small>
                                </div>
                            </li>
                            <li className="notification">
                                <i className="icon-custom icon-sm rounded-x icon-bg-blue icon-line fa fa-comments"></i>
                                <div className="overflow-h">
                                    <span><strong>Bruno Js.</strong> added you to group chating.</span>
                                    <small>Yesterday 1:07 pm</small>
                                </div>
                            </li>
                            <li className="notification">
                                <img className="rounded-x" src="assets/img/testimonials/img6.jpg" alt="" />
                                <div className="overflow-h">
                                    <span><strong>Taylor Lee</strong> changed profile picture.</span>
                                    <small>23/12 15:15 pm</small>
                                </div>
                            </li>
                        </ul>
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
                            <AddGoal />
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
    return {
        current_user
    }
}

export default connect(mapStateToProps, { setCurrentUser })(App);
