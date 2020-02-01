import React, { useState } from 'react'
import { signInWithGoogle } from "../../firebase";

import Button from '../../Components/button'

import { ReactComponent as Logo } from "../../assets/cac-logo.svg";
import { ReactComponent as GoogleLogo } from '../../assets/google-colored-logo.svg';

import './style.css'

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  return (
    <div className="cac_sign-in">
      <Logo alt="Club de Algoritmia CUCEI logo" className="cac_sign-in_logo" />
      <div className="cac_sign-in_container">
        <div className="cac_sign-in_input-container">
          <span className="cac_sign-in_label">Email address</span>
          <input className="cac_sign-in_input" type="email" id="email" name="email" required value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div className="cac_sign-in_input-container">
          <span className="cac_sign-in_label">Password</span>
          <span className="cac_sign-in_add">Forgot password?</span>
          <input className="cac_sign-in_input" type="password" id="password" name="password" required value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <Button className="cac_button--fill cac_sign-in_button">Sign in</Button>
        <span className="cac_sign-in_span">or</span>
        <Button className="cac_sign-in_google" onClick={() => signInWithGoogle()}>
          <GoogleLogo className="cac_sign-in_google-logo" />
          <span> Sign in with Google</span>
        </Button>
      </div>

    </div>
  )
}

export default SignIn;