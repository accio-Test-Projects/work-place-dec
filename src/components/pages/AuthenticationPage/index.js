import React from "react";
import { auth } from "../../../firebasConfig";
import "./AuthenticationPage.css";
import googleIcon from "../../../acessts/google.icon.png";
import { GoogleAuthProvider,signInWithPopup } from "firebase/auth";
import {useNavigate} from 'react-router-dom'
function AuthenticationPage({ type }) {
const navigate=useNavigate()
const signIn = () => {
  const provider = new GoogleAuthProvider();

  signInWithPopup(auth,provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    if(type==='candidate'){

      //user exist
      //?user exist as candidate 
      //!user exist as employer
  
      //user not exist--> redirect to candidate onboarding page
      navigate('/candidate/onboarding')
    }

    else{
      //user exist
      //?user exist as employer 
      //!user exist as candidate

      //user not exist--> redirect to employer onboarding page`
      navigate('/employer/onboarding')

    }
    console.log(result,'result');
  })
  .catch((error) => {})

}

  return (
    <div className="auth-container">
      <h1>Welcome {type}</h1>
      <h2>SignIn</h2>
      <button onClick={signIn} >
        <img alt="icon" src={googleIcon} /> <div>Sign In With Google</div>
      </button>
    </div>
  );
}

export default AuthenticationPage;

// if user is candidate and exist redirect to candidate profile page
// if user is candidate and not exist redirect to candidate onboarding page
// if user is employer and exist redirect to employer profile page
// if user is employer and not exist redirect to employer onboarding page

//if user is candidate and exist and he is tring to signIn as employer show him error message
//if user is employer and exist and he is tring to signIn as candidate show him error message