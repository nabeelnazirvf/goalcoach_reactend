import React, { Component } from 'react';
import {Link} from 'react-router';
import { firebaseApp, userRef } from '../firebase';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { setCurrentUser } from "../actions/index";
import $ from "jquery";
import '../user_profile.css'
import Header from './Header';
import Footer from './Footer';

class UserProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            displayName: this.props.current_user.name,
            photoURL: '',
            file: '',
            error: ''
        }
    }

    updateUserProfile(displayName){
        var that = this;
        fetch("http://localhost:3001/users/"+this.props.current_user.id+".json", {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': window.localStorage.getItem('access_token')
            },
            mode: 'cors',
            cache: 'default',
            body: JSON.stringify({email: window.localStorage.getItem('email'), name: displayName})
        }).catch((error) => {
            this.setState({error});
        }).then((res) => {
            if (res.ok) {
                res.json().then((json) => {
                    window.localStorage.removeItem('currentUser');
                    var currentUser = { 'id': json.id, 'name': json.name, 'email': json.email, 'image_base': json.image_base};
                    window.localStorage.setItem('currentUser', JSON.stringify(currentUser));
                    that.props.setCurrentUser(json);
                });

            } else {
                browserHistory.replace('/signin');
            }
        });
    }


    uploadImage(event, id, email){
        //this.parentNode.nextSibling.value = this.value;
        $('.loading').removeClass('hidden');
        var that = this;
        var uploader = document.getElementById('uploader');
        let file = event.target.files[0];
        let image_base = '';
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            image_base = reader.result;
        };
        reader.onerror = function (error) {
        };
        setTimeout(function() {
            if (typeof image_base != "undefined"){
                fetch("http://localhost:3001/users/"+that.props.current_user.id+".json", {
                    method: "PATCH",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': window.localStorage.getItem('access_token')
                    },
                    mode: 'cors',
                    cache: 'default',
                    body: JSON.stringify({email: window.localStorage.getItem('email'), image_base: image_base})
                }).catch((error) => {
                    this.setState({error});
                }).then((res) => {
                    if (res.ok) {
                        res.json().then((json) => {
                            window.localStorage.removeItem('currentUser');
                            var currentUser = { 'id': json.id, 'name': json.name, 'email': json.email, 'image_base': json.image_base};
                            window.localStorage.setItem('currentUser', JSON.stringify(currentUser));
                            that.props.setCurrentUser(json);
                            $('.loading').addClass('hidden');
                        });

                    } else {
                        browserHistory.replace('/signin');
                    }
                });
            }
        }, 1000);
    }
    render() {
        let image_url = '';
        image_url = this.props.current_user.image_base ? this.props.current_user.image_base : 'http://itsworldcongress2017.org/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png'
        return (
            // <!--=== Profile ===-->
            <div>
                <Header current_user={this.props.current_user}/>
            <div className={"wrapper"}>
            <div className="container content profile">
                <div className="row">
                    {/*<!--Left Sidebar-->*/}
                    <div className="col-md-3 md-margin-bottom-40">
                        <img className="img-responsive profile-img margin-bottom-20" src={image_url} alt="" />
                            <hr/>
                                {/*<!--Notification-->*/}
                                <div className="panel-heading-v2 overflow-h">
                                    <h2 className="heading-xs pull-left"><i className="fa fa-bell-o"></i> Notification</h2>
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
                            <li className="list-group-item">
                                <a href="page_profile_history.html"><i className="fa fa-history"></i> History</a>
                            </li>
                            <li className="list-group-item active">
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
                        <div className="profile-body margin-bottom-20">
                            <div className="tab-v1">
                                <ul className="nav nav-justified nav-tabs">
                                    <li className="active"><a data-toggle="tab" href="#profile">Edit Profile</a></li>
                                    <li><a data-toggle="tab" href="#passwordTab">Change Password</a></li>
                                    <li><a data-toggle="tab" href="#payment">Payment Options</a></li>
                                    <li><a data-toggle="tab" href="#settings">Notification Settings</a></li>
                                </ul>
                                <div className="tab-content">
                                    <div id="profile" className="profile-edit tab-pane fade active in">
                                        <h2 className="heading-md">Manage your Security Settings</h2>
                                        <p>Change your password.</p>
                                        <br/>
                                        <form className="sky-form" id="sky-form4" action="#">
                                            <dl className="dl-horizontal">
                                                <dt>Username</dt>
                                                <dd>
                                                    <section>
                                                        <label className="input">
                                                            <i className="icon-append fa fa-user"></i>
                                                            <input
                                                                type="text" placeholder="Username" name="username"
                                                                value={this.state.displayName}
                                                                onChange ={event => this.setState({displayName: event.target.value})}
                                                            />
                                                            <b className="tooltip tooltip-bottom-right">Needed to enter the website</b>
                                                        </label>
                                                    </section>
                                                </dd>
                                                <dt>Email address</dt>
                                                <dd>
                                                    <section>
                                                        <label className="input">
                                                            <i className="icon-append fa fa-envelope"></i>
                                                            <input type="email" placeholder="Email address" name="email"/>
                                                            <b className="tooltip tooltip-bottom-right">Needed to verify your account</b>
                                                        </label>
                                                    </section>
                                                </dd>
                                                <dt>Enter your password</dt>
                                                <dd>
                                                    <section>
                                                        <label className="input">
                                                            <i className="icon-append fa fa-lock"></i>
                                                            <input type="password" id="password" name="password" placeholder="Password"/>
                                                            <b className="tooltip tooltip-bottom-right">Don't forget your password</b>
                                                        </label>
                                                    </section>
                                                </dd>
                                                <dt>Confirm Password</dt>
                                                <dd>
                                                    <section>
                                                        <label className="input">
                                                            <i className="icon-append fa fa-lock"></i>
                                                            <input type="password" name="passwordConfirm" placeholder="Confirm password"/>
                                                            <b className="tooltip tooltip-bottom-right">Don't forget your password</b>
                                                        </label>
                                                    </section>
                                                </dd>
                                                <dd>
                                                    <section>
                                                        <label for="file" className="input input-file">
                                                            <div className="button">
                                                                Browse
                                                                <input type="file" name="file" id="fileToUpload" onChange={(event) => this.uploadImage(event)} />
                                                            </div>
                                                            <input type="text" placeholder="Include some file" readonly />
                                                        </label>
                                                    </section>
                                                </dd>
                                            </dl>
                                            <label className="toggle toggle-change"><input type="checkbox" checked="" name="checkbox-toggle-1"/><i className="no-rounded"></i>Remember password</label>
                                            <br/>
                                            <section>
                                                <label className="checkbox"><input type="checkbox" id="terms" name="terms"/><i></i><a href="#">I agree with the Terms and Conditions</a></label>
                                            </section>
                                            <button type="button" className="btn-u btn-u-default">Cancel</button>&nbsp;
                                            <a onClick = {() => this.updateUserProfile(this.state.displayName)} className="btn-u">Save Changes</a>&nbsp;&nbsp;
                                            <Link to={'/app'}>Back to Main Page</Link>
                                        </form>
                                    </div>
                                    <div id="passwordTab" className="profile-edit tab-pane fade in active">
                                    </div>
                                    <div id="payment" className="profile-edit tab-pane fade">
                                    </div>
                                    <div id="settings" className="profile-edit tab-pane fade">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*<!-- End Profile Content -->*/}
                </div>
                {/*<!--/end row-->*/}
            </div>
            </div>
                <Footer/>
            </div>
        // <!--=== End Profile ===-->
        )
    }
}

function mapStateToProps(state) {
    console.log('mapStateToProps in user profile', state);
    const { current_user } = state;
    return {
        current_user
    }
}

export default connect(mapStateToProps, {setCurrentUser})(UserProfile);