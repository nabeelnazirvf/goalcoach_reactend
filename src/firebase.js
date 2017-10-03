import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDcy0fLzaDr2IN-77Lo5aC6ixl0N4NU63U",
    authDomain: "goalcoach-5975d.firebaseapp.com",
    databaseURL: "https://goalcoach-5975d.firebaseio.com",
    projectId: "goalcoach-5975d",
    storageBucket: "gs://goalcoach-5975d.appspot.com/",
    messagingSenderId: "981458073350"

};

export const firebaseApp = firebase.initializeApp(config);
export const goalRef = firebase.database().ref('goals');
export const completeGoalRef = firebase.database().ref('completeGoals');
export const userRef = firebase.database().ref('users');
//var storage = firebaseApp.storage();