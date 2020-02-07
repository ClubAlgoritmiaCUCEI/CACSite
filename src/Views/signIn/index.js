import React, { useState, useContext, useEffect } from "react";

// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, useHistory } from "react-router-dom";

import { UserContext } from "../../Providers/userProvider";
import { signInWithGoogle } from "../../firebase";

import Button, { FormButton } from "../../Components/button";

import { ReactComponent as Logo } from "../../assets/cac-logo.svg";
import { ReactComponent as GoogleLogo } from "../../assets/google-colored-logo.svg";

import "./style.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useContext(UserContext);

  const history = useHistory();

  const onSubmit = e => {
    e.preventDefault();
    console.log("eee");
  };

  useEffect(() => {
    if (user.logged) history.goBack();
  }, [user, history]);
  return (
    <div className="cac_sign-in">
      <Logo alt="Club de Algoritmia CUCEI logo" className="cac_sign-in_logo" />

      <form className="cac_sign-in_container" onSubmit={onSubmit}>
        <div className="cac_sign-in_input-container">
          <span className="cac_sign-in_label">Email address</span>
          <input
            className="cac_sign-in_input"
            type="email"
            id="email"
            name="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="cac_sign-in_input-container">
          <span className="cac_sign-in_label">Password</span>
          <span className="cac_sign-in_add">Forgot password?</span>
          <input
            className="cac_sign-in_input"
            type="password"
            id="password"
            name="password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <input type="submit" hidden />
        <FormButton className="cac_button--fill cac_sign-in_button">Sign in</FormButton>
        <span className="cac_sign-in_span">or</span>
        <Button
          className="cac_sign-in_google"
          onClick={() => signInWithGoogle()}
        >
          <GoogleLogo className="cac_sign-in_google-logo" />
          <span> Sign in with Google</span>
        </Button>
      </form>
    </div>
  );
};

export default SignIn;
