import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyDn6_bIEBNJfJJ9Euo9jZk202MvK4QWdE8",
    authDomain: "reciperecommender-a2348.firebaseapp.com",
    databaseURL: "https://reciperecommender-a2348.firebaseio.com",
    projectId: "reciperecommender-a2348",
    storageBucket: "reciperecommender-a2348.appspot.com",
    messagingSenderId: "260659777878"
  };

 const app = firebase.initializeApp(config);
 const facebookProvider = new firebase.auth.FacebookAuthProvider()
 
 export { app, facebookProvider }