import React, { useState, useContext, useEffect } from "react";

// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, useHistory } from "react-router-dom";

import { UserContext, AllUsersContext } from "../../Providers/userProvider";
import { signInWithGoogle } from "../../firebase";

import Button, { FormButton } from "../../Components/button";
import Alert from "../../Components/alert";

import { ReactComponent as Logo } from "../../assets/cac-logo.svg";
import { ReactComponent as GoogleLogo } from "../../assets/google-colored-logo.svg";

import "./style.css";

const API = "https://codeforces.com/api/";
const DEFAULT_QUERY = "user.info?handles=";

const SignUp = () => {
  const history = useHistory();
  const user = useContext(UserContext);
  const dbUsers = useContext(AllUsersContext);
  // const [cfData, setcfData] = useState({ isLoading: true, users: [] });

  const [form, setForm] = useState({
    username: "erickborquez",
    name: "erick",
    lastName: "borquez",
    email: "erickborquez@gmail.com",
    password: "erick",
    passwordConfirmation: "erick",
    vjUsername: "erickborquez",
    cfUsername: "erickborquez"
  });
  const [confirmations, setConfirmations] = useState({
    passwordsEqual: true,
    cfUsernameConfirmed: true,
    vjUsernameConfirmed: true,
    isUsernameAvailable: true,
    isCFAccountAvailabe: true
  });

  //Fetch data from code forces to verify account existance
  // useEffect(() => {
  //   fetch(API + DEFAULT_QUERY)
  //     .then(res => res.json())
  //     .then(data => {
  //       setcfData({ isLoading: false, users: data.result });
  //     });
  // }, []);
  // console.log(cfData);

  useEffect(() => {
    if (user.logged) history.goBack();
  }, [user, history]);

  useEffect(() => {
    if (form.password !== "" && form.passwordConfirmation !== "") {
      setConfirmations(c => ({
        ...c,
        passwordsEqual: form.password === form.passwordConfirmation
      }));
    }
  }, [form.password, form.passwordConfirmation]);

  const onSubmit = e => {
    e.preventDefault();
    if (dbUsers.users.findIndex(e => e.displayName === form.username) !== -1) {
      setConfirmations(c => ({ ...c, isUsernameAvailable: false }));
    }
    try{

      fetch(API + DEFAULT_QUERY + form.cfUsername)
      .then(res => res.json())
      .then(data => {
        console.log(data);
      }).catch(e =>{
        console.log(e);
      })
    }catch(e){
      console.log(e);
    }
    console.log();
  };

  return (
    <div className="cac_sign-up">
      <Logo alt="Club de Algoritmia CUCEI logo" className="cac_sign-up_logo" />
      <div className="cac_sign-up_container">
        <form className="cac_sign-up_mail-container" onSubmit={onSubmit}>
          <div className="cac_sign-up_input-container--double">
            <div className="cac_sign-up_input-container cac_sign-up_input-container--small">
              <span className="cac_sign-up_label">First name</span>
              <input
                className="cac_sign-up_input"
                type="text"
                id="name"
                name="name"
                required
                minLength={3}
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div className="cac_sign-up_input-container cac_sign-up_input-container--small">
              <span className="cac_sign-up_label">Last name</span>
              <input
                className="cac_sign-up_input"
                type="text"
                id="lastName"
                name="lastName"
                required
                minLength={5}
                value={form.lastName}
                onChange={e => setForm({ ...form, lastName: e.target.value })}
              />
            </div>
          </div>
          <div className="cac_sign-up_input-container">
            <span className="cac_sign-up_label">Username</span>
            <input
              className="cac_sign-up_input"
              type="text"
              id="username"
              name="username"
              required
              minLength={5}
              value={form.username}
              onChange={e => setForm({ ...form, username: e.target.value })}
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
              minLength={5}
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
            />
          </div>
          <div className="cac_sign-up_input-container">
            {!confirmations.passwordsEqual && (
              <Alert
                className="cac_sign-up_alert"
                text="The passwords aren't the same"
              />
            )}
            <span className="cac_sign-up_label">Confirm password</span>
            <input
              className="cac_sign-up_input"
              type="password"
              id="passwordConfirmation"
              name="passwordConfirmation"
              required
              minLength={5}
              value={form.passwordConfirmation}
              onChange={e =>
                setForm({ ...form, passwordConfirmation: e.target.value })
              }
            />
          </div>
          <div className="cac_sign-up_input-container">
            {!confirmations.cfUsernameConfirmed && (
              <Alert className="cac_sign-up_alert" text="Account not found" />
            )}
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
            {!confirmations.vjUsernameConfirmed && (
              <Alert className="cac_sign-up_alert" text="Account not found" />
            )}
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
