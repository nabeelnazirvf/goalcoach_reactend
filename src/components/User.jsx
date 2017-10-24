import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import GoalList from './GoalList';
import {Link} from 'react-router';

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            dataLoaded: false
        }
    }

    getQueryStringValue(key) {
        return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
    }

    componentWillMount() {
        let current_user_id = this.props.current_user.id? this.props.current_user.id : JSON.parse(window.localStorage.getItem('currentUser')).id;
        fetch("http://localhost:3001/users/"+this.getQueryStringValue("user_id"), {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': window.localStorage.getItem('access_token')
            },
            mode: 'cors',
            cache: 'default',
            body: undefined
        }).catch((error) => {
            this.setState({error});
        }).then((res) => {
            if (res.ok) {
                res.json().then((json) => {
                    this.setState({dataLoaded: true, user: json});
                });

            } else {
                browserHistory.replace('/signin');
            }
        });
    }

    followUnfollow(is_following){
        fetch("http://localhost:3001/users/follow_unfollow", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': window.localStorage.getItem('access_token')
            },
            mode: 'cors',
            cache: 'default',
            body: JSON.stringify({user_id: this.state.user.id})
        }).catch((error) => {
            this.setState({error});
        }).then((res) => {
            if (res.ok) {
                res.json().then((json) => {
                    let obj = this.state.user;
                    this.state.user.is_following ? (obj.is_following = false) : (obj.is_following = true);
                    this.setState({user: obj});
                });

            } else {
                browserHistory.replace('/signin');
            }
        });
    }

    render(){
        return (
            <div>
                {
                    this.state.dataLoaded ?
                        <div className={"wrapper"}>
                            <Header current_user={this.props.current_user}/>
                            <div className="container content profile">
                                <div className="row">
                                    <div className="col-md-3 md-margin-bottom-40">
                                        <img className="img-responsive profile-img margin-bottom-20" src={this.state.user.image_base} alt="" />
                                        <button onClick={() => this.followUnfollow(this.state.user.is_following)} className="btn btn-block btn-gmail">{this.state.user.is_following ? "Unfollow" : "Follow"}</button>
                                        <br/>
                                        <ul className="list-group sidebar-nav-v1 margin-bottom-40" id="sidebar-nav-1">
                                            <li className="list-group-item">
                                                <Link to={'/app'}><i className="fa fa-arrow-left" aria-hidden="true"></i>Back to Main Page</Link>
                                            </li>
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
                                            <li className="list-group-item active">
                                                <a href="page_profile_comments.html"><i className="fa fa-comments"></i> Comments</a>
                                            </li>
                                            <li className="list-group-item">
                                                <a href="page_profile_history.html"><i className="fa fa-history"></i> History</a>
                                            </li>
                                            <li className="list-group-item">
                                                <a href="page_profile_settings.html"><i className="fa fa-cog"></i> Settings</a>
                                            </li>
                                        </ul>

                                        <div className="panel-heading-v2 overflow-h">
                                            <h2 className="heading-xs pull-left"><i className="fa fa-bar-chart-o"></i> Task Progress</h2>
                                            <a href="#"><i className="fa fa-cog pull-right"></i></a>
                                        </div>
                                        <h3 className="heading-xs">Web Design <span className="pull-right">92%</span></h3>
                                        <div className="progress progress-u progress-xxs">
                                            <div  aria-valuemax="100" aria-valuemin="0" aria-valuenow="92" role="progressbar" className="progress-bar progress-bar-u">
                                            </div>
                                        </div>
                                        <h3 className="heading-xs">Unify Project <span className="pull-right">85%</span></h3>
                                        <div className="progress progress-u progress-xxs">
                                            <div  aria-valuemax="100" aria-valuemin="0" aria-valuenow="85" role="progressbar" className="progress-bar progress-bar-blue">
                                            </div>
                                        </div>
                                        <h3 className="heading-xs">Sony Corporation <span className="pull-right">64%</span></h3>
                                        <div className="progress progress-u progress-xxs margin-bottom-40">
                                            <div  aria-valuemax="100" aria-valuemin="0" aria-valuenow="64" role="progressbar" className="progress-bar progress-bar-dark">
                                            </div>
                                        </div>
                                        <hr/>
                                        <div className="margin-bottom-50"></div>
                                        <form action="#" id="sky-form2" className="sky-form">
                                            <div id="inline-start"></div>
                                        </form>
                                    </div>
                                    <div className="col-md-9">
                                        <div className="profile-body">
                                            <div className="panel panel-profile">
                                                <div className="panel-heading overflow-h">
                                                    <h2 className="panel-title heading-sm pull-left"><i className="fa fa-comments"></i>Goals</h2>
                                                    <a href="#"><i className="fa fa-cog pull-right"></i></a>
                                                </div>
                                                <div className="panel-body margin-bottom-50">
                                                    <GoalList emaill={null} desired_user={this.state.user}/>
                                                    <button type="button" className="btn-u btn-u-default btn-block">Load More</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Footer/>
                        </div>
                        : null
                }
            </div>
        )
    }
}
function mapStateToProps(state) {
    const { current_user } = state;
    return {
        current_user
    }
}
export default connect(mapStateToProps, null)(User);