import React, { useContext } from "react";
import Button from "../button";

import { signInWithGoogle, signOut } from "../../firebase";

import { UserContext } from "../../Providers/userProvider";

import "./style.css";

const Login = ({className}) => {
  const user = useContext(UserContext);
  console.log(user);
  return (
    <>
      {!user.isLoading ? (
        <div className="cac_login">
          {user.logged ? (
            <div className="cac_logged">
              <Button onClick={() => signOut()}>Sign Out</Button>
            </div>
          ) : (
            <div className={"cac_login_buttons"}>
              <Button
                onClick={() => signInWithGoogle()}
                className="login_button button button_outline"
              >
                <span>Log in</span>
              </Button>
            </div>
          )}
        </div>
      ) : null}
    </>
  );
};

export default Login;
