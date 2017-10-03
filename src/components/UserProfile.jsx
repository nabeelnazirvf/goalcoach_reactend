import React, { Component } from 'react';
import {Link} from 'react-router';
import { firebaseApp, userRef } from '../firebase';

class UserProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            displayName: '',
            photoURL: '',
            file: '',
            error: ''
            //displayName: this.props.user.displayName
        }
    }
    componentWillMount() {
        var user = firebaseApp.auth().currentUser;
        name = user.displayName;
        let photoURL = user.photoURL;
        console.log('photoURL', photoURL, user);
        this.setState({ displayName: name ? name : '', photoURL: photoURL ? photoURL : 'https://www.cuba-platform.com/support/public/avatars/default-avatar.svg'})
    }

    updateUserProfile(displayName){
        var user = firebaseApp.auth().currentUser;
        console.log('updateUserProfile user', displayName, user, user.uid);
        user.updateProfile({
            displayName: displayName,
            photoURL: user.photoURL
        }).then(function() {
            console.log('user Update successful');
        }).catch(function(error) {
            console.log('user Update failed');
        });
        console.log('updateUserProfile user', user);

    }
    uploadImage(event){
        var user = firebaseApp.auth().currentUser;
        //this.setState({file: event.target.files[0]});
        console.log('event and file', event, event.target)
        var uploader = document.getElementById('uploader');
        let file = event.target.files[0];
        var storageRef = firebaseApp.storage().ref('user/'+user.uid+'/' + file.name);
        var task = storageRef.put(file);
        task.on('state_changed',
            function progress(snapshot) {
                var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                uploader.value = percentage;
            },
            function error(err) {
                console.log('errors', err);
            },
            function complete() {

            }
        );
    }
    render() {
        return (
            <div className="container">
                <div className="content">
                    <div className="form">
                        <h2>Update Profile</h2>
                        <div className="form-group">
                            <label>Your Current Display Name: {this.state.displayName}</label>
                        </div>
                        <div className="form-group">
                            <input className="form-control"
                                   type="text"
                                   placeholder="Name"
                                   value={this.state.displayName}
                                   onChange ={event => this.setState({displayName: event.target.value})}></input>
                        </div>
                        <div className="form-group">
                            <img src={this.state.photoURL} alt=""/>
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

export default UserProfile;
