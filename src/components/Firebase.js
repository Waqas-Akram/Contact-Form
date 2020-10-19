import * as  firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyBR8SAQyM92RTg03jhAmDVzTU6IlvafKMs",
    authDomain: "contact-form-5b6ca.firebaseapp.com",
    databaseURL: "https://contact-form-5b6ca.firebaseio.com",
    projectId: "contact-form-5b6ca",
    storageBucket: "contact-form-5b6ca.appspot.com",
    messagingSenderId: "459195501116",
    appId: "1:459195501116:web:e3ed726ac2dfa9379d5139",
    measurementId: "G-N3440758YG"
  };
  // Initialize Firebase
  let fireDb =  firebase.initializeApp(firebaseConfig);
  fireDb.analytics();
  export default fireDb.database().ref();