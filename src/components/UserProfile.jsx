import React, { Component } from 'react';
import {Link} from 'react-router';
import { firebaseApp, userRef } from '../firebase';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { setCurrentUser } from "../actions/index";
class UserProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            displayName: this.props.current_user.name,
            photoURL: '',
            file: '',
            error: ''
            //displayName: this.props.user.displayName
        }
    }
    componentWillMount() {
        var that = this;
        name = '';
        var id = undefined;
        let photoURL = '';
        var email = window.localStorage.getItem('email');
        console.log('user fetch email', email, this.props);
        fetch("http://localhost:3001/users/"+id+"/?email="+window.localStorage.getItem('email'), {
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
            console.log("Fail zone");
        }).then((res) => {
            if (res.ok) {
                res.json().then((json) => {
                    name = json.name;
                    photoURL = json.image_base;
                    console.log('that.props.setCurrentUser(json)');
                    that.props.setCurrentUser(json);
                    //this.setState({ displayName: name ? name : '', photoURL: photoURL ? photoURL : 'https://www.cuba-platform.com/support/public/avatars/default-avatar.svg'})
                });
                console.log('res', res);

            } else {
                console.log("error", res);
                browserHistory.replace('/signin');
            }
        });
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
            console.log("Fail zone");
        }).then((res) => {
            if (res.ok) {
                res.json().then((json) => {
                    //that.setState({displayName: json.name});
                    that.props.setCurrentUser(json);
                });
                console.log('res', res);

            } else {
                console.log("error", res);
                browserHistory.replace('/signin');
            }
        });
    }


    uploadImage(event, id, email){
        var that = this;
        var uploader = document.getElementById('uploader');
        let file = event.target.files[0];
        let image_base = '';
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            image_base = reader.result;
            console.log('image_base', image_base);
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
        setTimeout(function() {
            console.log('image_base 1 ',image_base);
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
                    console.log("Fail zone");
                }).then((res) => {
                    if (res.ok) {
                        res.json().then((json) => {
                            //that.setState({photoURL: json.image_base});
                            that.props.setCurrentUser(json);

                        });
                        console.log('res', res);

                    } else {
                        console.log("error", res);
                        browserHistory.replace('/signin');
                    }
                });
            }
        }, 1000);
    }
    render() {
        console.log('this.props in user profile render', this.props)
        return (
            <div className="container">
                <div className="content">
                    <div className="form">
                        <h2>Update Profile</h2>
                        <div className="form-group">
                            <label>Your Current Display Name: {this.props.current_user.name}</label>
                        </div>
                        <div className="form-group">
                            <input className="form-control"
                                   type="text"
                                   placeholder="Name"
                                   value={this.state.displayName}
                                   onChange ={event => this.setState({displayName: event.target.value})}></input>
                        </div>
                        <div className="form-group">
                                <img className={"img-responsive user-img"} src={this.props.current_user.image_base} alt=""/>
                        </div>
                        <div>
                            <progress value={"0"} max={"100"} id={"uploader"}></progress>
                            <input type="file" name="fileToUpload" id="fileToUpload" onChange ={(event) => this.uploadImage(event)} />
                        </div>
                        <hr/>
                        <div className="form-group">
                            <button className="btn btn-primary" onClick = {() => this.updateUserProfile(this.state.displayName)} >Update</button>
                            <div>
                                <span> {this.state.error} </span>
                            </div>
                            <br/>
                            <div><Link to={'/app'}>Back to Main Page</Link></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

//export default UserProfile;
function mapStateToProps(state) {
    const { current_user } = state;
    console.log('mapStateToProps current_user', current_user, state)
    return {
        current_user
    }
}

export default connect(mapStateToProps, {setCurrentUser})(UserProfile);