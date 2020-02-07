import React, { useState, useContext, useEffect } from "react";

// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, useHistory } from "react-router-dom";

import { UserContext } from "../../Providers/userProvider";
import { signInWithGoogle } from "../../firebase";

import Button, { FormButton } from "../../Components/button";
import Alert from '../../Components/alert';

import { ReactComponent as Logo } from "../../assets/cac-logo.svg";
import { ReactComponent as GoogleLogo } from "../../assets/google-colored-logo.svg";

import "./style.css";


const API = "https://codeforces.com/api/";
const DEFAULT_QUERY = "user.ratedList?activeOnly=true";

const SignUp = () => {
  const [form, setForm] = useState(
    {
      username: "",
      name: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      vjUsername: "",
      cfUsername: ""
    });
  const user = useContext(UserContext);
  const [confirmations, setConfirmations] = useState({
    passwordsEqual: true,
    cfUsernameConfirmed: true,
    vjUsernameConfirmed: true,
  })
  const [cfData, setcfData] = useState({ isLoading: true, users: [] });

  const history = useHistory();

  const onSubmit = e => {
    e.preventDefault();
  };

  useEffect(() => {
    if (user.logged) history.goBack();
  }, [user, history]);

  useEffect(() => {
    if (form.password !== '' && form.passwordConfirmation !== '') {
      setConfirmations({ ...confirmations, passwordsEqual: form.password === form.passwordConfirmation })
    }

  }, [form.password, form.passwordConfirmation])

  useEffect(() => {
    fetch(API + DEFAULT_QUERY)
      .then(res => res.json())
      .then(data => { setcfData({ isLoading: false, users: data.result }) });
  }, []);
  console.log(cfData);

  return (
    <div className="cac_sign-up">
      <Logo alt="Club de Algoritmia CUCEI logo" className="cac_sign-up_logo" />
      <div className="cac_sign-up_container">
        <form className="cac_sign-up_mail-container" onSubmit={onSubmit}>
          <div className="cac_sign-up_input-container">
            <span className="cac_sign-up_label">Username</span>
            <input
              className="cac_sign-up_input"
              type="text"
              id="username"
              name="username"
              required
              value={form.username}
              onChange={e => setForm({ ...form, username: e.target.value })}
            />
          </div>
          <div className="cac_sign-up_input-container">
            <span className="cac_sign-up_label">Name</span>
            <input
              className="cac_sign-up_input"
              type="text"
              id="name"
              name="name"
              required
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
            />
          </div> <div className="cac_sign-up_input-container">
            <span className="cac_sign-up_label">Last name</span>
            <input
              className="cac_sign-up_input"
              type="text"
              id="lastName"
              name="lastName"
              required
              value={form.lastName}
              onChange={e => setForm({ ...form, lastName: e.target.value })}
            />
          </div>
          <div className="cac_sign-up_input-container">
            <span className="cac_sign-up_label">Email address</span>
            <input
              className="cac_sign-up_input"
              type="email"
              id="email"
              name="email"
              required
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className="cac_sign-up_input-container">
            <span className="cac_sign-up_label">Password</span>
            <input
              className="cac_sign-up_input"
              type="password"
              id="password"
              name="password"
              required
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
            />
          </div>
          <div className="cac_sign-up_input-container">
            {!confirmations.passwordsEqual && <Alert className="cac_sign-up_alert" text="The passwords aren't the same" />}
            <span className="cac_sign-up_label">Confirm password</span>
            <input
              className="cac_sign-up_input"
              type="password"
              id="passwordConfirmation"
              name="passwordConfirmation"
              required
              value={form.passwordConfirmation}
              onChange={e => setForm({ ...form, passwordConfirmation: e.target.value })}
            />

          </div>
          <div className="cac_sign-up_input-container">
            {!confirmations.cfUsernameConfirmed && <Alert className="cac_sign-up_alert" text="Account not found" />}
            <span className="cac_sign-up_label">Codeforces username</span>
            <input
              className="cac_sign-up_input"
              type="text"
              id="cfUsername"
              name="cfUsername"
              required
              value={form.cfUsername}
              onChange={e => setForm({ ...form, cfUsername: e.target.value })}
            />
          </div>
          <div className="cac_sign-up_input-container">
            {!confirmations.vjUsernameConfirmed && <Alert className="cac_sign-up_alert" text="Account not found" />}
            <span className="cac_sign-up_label">Vjudge username</span>
            <input
              className="cac_sign-up_input"
              type="text"
              id="vjUsername"
              name="vjUsername"
              required
              value={form.vjUsername}
              onChange={e => setForm({ ...form, vjUsername: e.target.value })}
            />
          </div>
          <input type="submit" hidden />
          <FormButton className="cac_button--fill cac_sign-up_button">
            Sign up
        </FormButton>
        </form>
        <div className="cac_sign-up_line" />
        <div className="cac_sign-up_social">
          <h3 className="cac_sign-up_social_title">Or you can sign up with</h3>
          <Button
            className="cac_sign-up_button_social cac_sign-up_google"
            onClick={() => signInWithGoogle()}
          >
            <GoogleLogo className="cac_sign-up_google-logo" />
            <span> Sign up with Google</span>
          </Button>
          <Button
            className="cac_sign-up_button_social cac_sign-up_google"
            onClick={() => signInWithGoogle()}
          >
            <GoogleLogo className="cac_sign-up_google-logo" />
            <span> Sign up with Google</span>
          </Button>
          <Button
            className="cac_sign-up_button_social cac_sign-up_google"
            onClick={() => signInWithGoogle()}
          >
            <GoogleLogo className="cac_sign-up_google-logo" />
            <span> Sign up with Google</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
