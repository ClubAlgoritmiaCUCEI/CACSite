import React, { useState, useContext, useEffect } from "react";

import {
  signInWithGoogle,
  signInWithGithub,
  signInWithFacebook,
  createUserDocumentWithEmailAndPassword
} from "../../firebase";

// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, useHistory } from "react-router-dom";

import { UserContext, AllUsersContext } from "../../Providers/userProvider";

import Button, { FormButton } from "../../Components/button";
import Alert from "../../Components/alert";

import { ReactComponent as Logo } from "../../assets/cac-logo.svg";
import { ReactComponent as GoogleLogo } from "../../assets/google-colored-logo.svg";
import { ReactComponent as GithubLogo } from "../../assets/github-logo.svg";
import { ReactComponent as FacebookLogo } from "../../assets/facebook-logo.svg";

import "./style.css";

const API = "https://codeforces.com/api/";
const DEFAULT_QUERY = "user.info?handles=";

const SignUp = () => {
  const history = useHistory();
  const user = useContext(UserContext);
  const dbUsers = useContext(AllUsersContext);

  const [form, setForm] = useState({
    username: "erickborquez",
    name: "erick",
    lastName: "borquez",
    email: "erickborquez@gmail.com",
    password: "123456",
    passwordConfirmation: "123456",
    vjUsername: "erickborquez",
    cfUsername: "erickborquez"
  });
  const [confirmations, setConfirmations] = useState({
    arePasswordsEqual: true,
    isCFUsernameConfirmed: true,
    isUsernameAvailable: true,
    isCFAccountAvailabe: true,
    confirmingData: false
  });

  useEffect(() => {
    if (user.logged) history.goBack();
  }, [user, history]);

  useEffect(() => {
    if (form.password !== "" && form.passwordConfirmation !== "") {
      setConfirmations(c => ({
        ...c,
        arePasswordsEqual: form.password === form.passwordConfirmation
      }));
    }
  }, [form.password, form.passwordConfirmation]);

  const onSubmit = async e => {
    e.preventDefault();
    console.log(dbUsers);
    if (dbUsers.isLoading) {
      console.error("slow connection, try again");
      return;
    }
    if (!confirmations.confirmingData) {
      setConfirmations(c => ({ ...c, confirmingData: true }));
      let ok = confirmations.arePasswordsEqual;
      if (
        dbUsers.users.findIndex(e => e.displayName === form.username) === -1
      ) {
        setConfirmations(c => ({ ...c, isUsernameAvailable: true }));
      } else {
        setConfirmations(c => ({ ...c, isUsernameAvailable: false }));
        ok = false;
      }
      if (
        dbUsers.users.findIndex(e => e.cfUsername === form.cfUsername) === -1
      ) {
        setConfirmations(c => ({
          ...c,
          isCFAccountAvailabe: true
        }));
        await fetch(API + DEFAULT_QUERY + form.cfUsername)
          .then(res => res.json())
          .then(() => {
            setConfirmations(c => ({
              ...c,
              isCFUsernameConfirmed: true,
              confirmingData: false
            }));
            if (ok) {
              try {
                createUserDocumentWithEmailAndPassword(form);
                console.log("everything ok!");
              } catch (e) {
                console.error("errrror");
              }
            }
          })
          .catch(e => {
            setConfirmations(c => ({
              ...c,
              isCFUsernameConfirmed: false,
              confirmingData: false
            }));
          });
      } else {
        setConfirmations(c => ({
          ...c,
          isCFAccountAvailabe: false,
          confirmingData: false
        }));
      }
    }
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
            {!confirmations.isUsernameAvailable && (
              <Alert
                className="cac_sign-up_alert"
                text="Username unavailable"
              />
            )}
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
              minLength={6}
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
            />
          </div>
          <div className="cac_sign-up_input-container">
            {!confirmations.arePasswordsEqual && (
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
              minLength={6}
              value={form.passwordConfirmation}
              onChange={e =>
                setForm({ ...form, passwordConfirmation: e.target.value })
              }
            />
          </div>
          <div className="cac_sign-up_input-container">
            {!confirmations.isCFUsernameConfirmed && (
              <Alert className="cac_sign-up_alert" text="Account not found" />
            )}
            {!confirmations.isCFAccountAvailabe && (
              <Alert
                className="cac_sign-up_alert"
                text="Code Forces account already registered"
              />
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
            <div
              className="cac_sign-up_button_double"
              style={{ top: confirmations.confirmingData ? "50%" : "-50%" }}
            >
              <span className="cac_sign-up_button_double--first">
                Verifying...
              </span>
              <span className="cac_sign-up_button_double--second">Sign up</span>
            </div>
          </FormButton>
        </form>
        <div className="cac_sign-up_line" />
        <div className="cac_sign-up_social">
          <h3 className="cac_sign-up_social_title">Or you can sign up with</h3>
          <Button
            className=" cac_sign-up_social_button cac_sign-up_social_button--google"
            onClick={() => signInWithGoogle()}
          >
            <GoogleLogo className="cac_sign-up_social-logo " />
            <span> Sign up with Google</span>
          </Button>
          <Button
            className=" cac_sign-up_social_button cac_sign-up_social_button--github"
            onClick={() => signInWithGithub()}
          >
            <GithubLogo className="cac_sign-up_social-logo" />
            <span> Sign up with Github</span>
          </Button>
          <Button
            className=" cac_sign-up_social_button cac_sign-up_social_button--facebook"
            onClick={() => signInWithFacebook()}
          >
            <FacebookLogo className="cac_sign-up_social-logo" />
            <span> Sign up with Facebook</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
