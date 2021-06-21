import firebase from "firebase/app";
import "firebase/auth";
import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom";
import { UserContext } from "../../App";
import Header from "../Header/Header";
import firebaseConfig from "./firebase.config";
import "./Login.css";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const Login = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  const googleProvider = new firebase.auth.GoogleAuthProvider();
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const handleGoogleSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        const user = result.user;
        const { displayName, email } = user;
        const newUserInfo = { ...loggedInUser };
        newUserInfo.name = displayName;
        newUserInfo.email = email;
        newUserInfo.isSignedIn = true;
        setLoggedInUser(newUserInfo);
        history.replace(from);
        console.log(newUserInfo);
      })
      .catch((error) => {
        var errorMessage = error.message;
        console.error(errorMessage);
      });
  };

  return (
    <>
      <Header></Header>
      <div className="google-signin App">
        {
          loggedInUser.isSignedIn? <h1>You Are Already Signed In Buddy!</h1> : <Button className="google-signin-btn" onClick={handleGoogleSignIn}>
          Sign In With Google
        </Button>
        }
      </div>
    </>
  );
};

export default Login;
