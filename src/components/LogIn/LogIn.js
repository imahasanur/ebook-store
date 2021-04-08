import React, { useContext } from 'react';
import { useState } from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import './LogIn.css';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}else {
  firebase.app(); 
}

const LogIn = () => {
  // const[user, setUser] = useState({
  //   displayName:'',
  //   email:''
  // })
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  let googleProvider = new firebase.auth.GoogleAuthProvider();
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const signInWithGoogle = ()=>{
    firebase.auth()
    .signInWithPopup(googleProvider)
    .then((result) => {
      let credential = result.credential;
      let token = credential.accessToken;
      let newUser = result.user;
      const {displayName, email} = newUser;
      setLoggedInUser({displayName, email});
      history.replace(from);
      console.log("userInfo" ,newUser);
    }).catch((error) => {
      let errorCode = error.code;
      let errorMessage = error.message;
      let email = error.email;
      let credential = error.credential;
      console.log("error", errorMessage);
    });
  }

  
  const googleSignOut = ()=>{
    firebase.auth().signOut()
    .then(() => {
      
      console.log("sign out");
    })
    .catch((error) => {
    });

  }

  return (
    <div className="login">
      <h2 className="">Book Store</h2>
      <div className="text-center m-5">
        <h5>Log In </h5>
        <button className="m-2 w-50 rounded-pill btn btn-success btn-lg w-5"
            onClick = {signInWithGoogle}>
            <FontAwesomeIcon icon={faGoogle} />
            <span className="ml-3">Google Sign In</span>
        </button>
        {/* <button className="m-2 w-50 rounded-pill btn btn-success btn-lg w-5"
            onClick = {googleSignOut}>
            <FontAwesomeIcon icon={faGoogle} />
            <span className="ml-3">Google Sign Out</span>
        </button> */}
      </div>


    </div>
  );
};

export default LogIn;