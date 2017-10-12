import React, { Component } from 'react';
import {Link} from 'react-router';
import { firebaseApp, userRef } from '../firebase';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { setCurrentUser } from "../actions/index";
import $ from "jquery";
import '../user_profile.css'

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
            <div className="container">
                <br/>
                    <br/>
                        <div className="row" id="main">
                            <div className="col-md-4 well" id="leftPanel">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div>
                                            <img src={image_url} className="img-circle img-thumbnail"/>
                                                <h2>{this.props.current_user.name}</h2>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                                    tempor incididunt ut labore et dolore magna aliqua.</p>
                                                <div className="btn-group">
                                                    <button type="button" className="btn btn-warning">
                                                        Social</button>
                                                    <button type="button" className="btn btn-warning dropdown-toggle" data-toggle="dropdown">
                                                        <span className="caret"></span><span className="sr-only">Social</span>
                                                    </button>
                                                    <ul className="dropdown-menu" role="menu">
                                                        <li><a href="#">Twitter</a></li>
                                                        <li><a href="https://plus.google.com/+Jquery2dotnet/posts">Google +</a></li>
                                                        <li><a href="https://www.facebook.com/jquery2dotnet">Facebook</a></li>
                                                        <li className="divider"></li>
                                                        <li><a href="#">Github</a></li>
                                                    </ul>
                                                </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-8 well" id="rightPanel">
                                <div className="row">
                                    <div className="col-md-12">
                                        <form role="form">
                                            <h2>Edit your profile.<small>It's always easy</small></h2>
                                            <hr className="colorgraph" />
                                                <div className="row">
                                                    <div className="col-xs-12 col-sm-6 col-md-6">
                                                        <div className="form-group">
                                                            <input
                                                                type="text" name="first_name" id="first_name" className="form-control input-lg" placeholder="First Name" tabindex="1"
                                                                value={this.state.displayName}
                                                                onChange ={event => this.setState({displayName: event.target.value})}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-xs-12 col-sm-6 col-md-6">
                                                        <div className="form-group">
                                                            <input type="text" name="last_name" id="last_name" className="form-control input-lg" placeholder="Last Name" tabindex="2" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <input type="email" name="email" id="email" className="form-control input-lg" placeholder="Email Address" tabindex="4" />
                                                </div>
                                                <div className="row">
                                                    <div className="col-xs-12 col-sm-6 col-md-6">
                                                        <div className="form-group">
                                                            <input type="password" name="password" id="password" className="form-control input-lg" placeholder="Password" tabindex="5" />
                                                        </div>
                                                    </div>
                                                    <div className="col-xs-12 col-sm-6 col-md-6">
                                                        <div className="form-group">
                                                            <input type="password" name="password_confirmation" id="password_confirmation" className="form-control input-lg" placeholder="Confirm Password" tabindex="6" />
                                                        </div>
                                                    </div>
                                                    <div className="col-xs-12 col-sm-6 col-md-6">
                                                        <label className="btn btn-primary">
                                                            Upload Image&hellip; <input type="file" name="fileToUpload" id="fileToUpload" onChange ={(event) => this.uploadImage(event)} className={"hidden"} />
                                                        </label>
                                                    </div>
                                                </div>
                                                <hr className="colorgraph"/>
                                                <div className="row">
                                                    <div className="col-xs-12 col-md-6">
                                                        <Link to={'/app'}>Back to Main Page</Link>
                                                    </div>
                                                    <div className="col-xs-12 col-md-6"><a onClick = {() => this.updateUserProfile(this.state.displayName)} className="btn btn-success btn-block btn-lg">Save</a></div>
                                                    <div className="col-xs-12 col-md-6">
                                                        <span> {this.state.error} </span>
                                                    </div>
                                                </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="modal fade" id="t_and_c_m" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                                    <div className="modal-dialog modal-lg">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                                                <h4 className="modal-title" id="myModalLabel">Terms & Conditions</h4>
                                            </div>
                                            <div className="modal-body">
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, itaque, modi, aliquam nostrum at sapiente consequuntur natus odio reiciendis perferendis rem nisi tempore possimus ipsa porro delectus quidem dolorem ad.</p>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, itaque, modi, aliquam nostrum at sapiente consequuntur natus odio reiciendis perferendis rem nisi tempore possimus ipsa porro delectus quidem dolorem ad.</p>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, itaque, modi, aliquam nostrum at sapiente consequuntur natus odio reiciendis perferendis rem nisi tempore possimus ipsa porro delectus quidem dolorem ad.</p>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, itaque, modi, aliquam nostrum at sapiente consequuntur natus odio reiciendis perferendis rem nisi tempore possimus ipsa porro delectus quidem dolorem ad.</p>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, itaque, modi, aliquam nostrum at sapiente consequuntur natus odio reiciendis perferendis rem nisi tempore possimus ipsa porro delectus quidem dolorem ad.</p>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, itaque, modi, aliquam nostrum at sapiente consequuntur natus odio reiciendis perferendis rem nisi tempore possimus ipsa porro delectus quidem dolorem ad.</p>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, itaque, modi, aliquam nostrum at sapiente consequuntur natus odio reiciendis perferendis rem nisi tempore possimus ipsa porro delectus quidem dolorem ad.</p>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-primary" data-dismiss="modal">I Agree</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
            </div>
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