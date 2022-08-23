import React, { useState } from "react";
import "./SignInScreen.css";
import { auth } from "../FireBase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const register = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        alert(error.message);
        // ..
      });
  };

  const signIn = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        
        // ...
      })
      .catch((error) => {
        alert(error.message)
      });
  };
  return (
    <div className="signUpScreen">
      <form>
        <h1>Sign In</h1>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="email"
          required
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          name="password"
          required
        />
        <button type="submit" onClick={signIn}>
          Sign In
        </button>

        <h4>
          <span className="signUpscreen_grey">New to netflix? </span>
          <span className="signUpscreen_link" onClick={register} type="submit">
            Sign Up now.
          </span>
        </h4>
      </form>
    </div>
  );
}

export default SignInScreen;
