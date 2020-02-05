import React, { useContext } from "react";

// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Link } from "react-router-dom";

import { UserContext } from "../../Providers/userProvider";

import Button from "../button";

import { ReactComponent as Logo } from "../../assets/cac-logo.svg";
import { ReactComponent as Message } from "../../assets/messages-icon.svg";
import { ReactComponent as Notification } from "../../assets/notification-icon.svg";
import { ReactComponent as Search } from "../../assets/search-icon.svg";

import "./style.css";

const Header = () => {
  const user = useContext(UserContext);

  return (
    <div className="cac_header">
      <Logo alt="Club de Algoritmia CUCEI logo" className="cac_header_logo" />
      <div className="cac_user-interface">
        <Search className="cac_header_icon search-icon" alt="search icon" />
        {!user.isLoading && user.logged ? (
          <>
            <Message
              className="cac_header_icon message-icon"
              alt="message icon"
            />
            <Notification
              className="cac_header_icon notification-icon"
              alt="notification icon"
            />

            <img
              src={user.photoURL}
              alt="user"
              className="cac_header_user-photo"
            />
          </>
        ) : (
          <>
            <Link to="/login">
              <Button className="cac_header_button cac_button--outline">
                {"Sign in "}
              </Button>
            </Link>
            <Link to="signup">
              <Button className="cac_header_button  cac_button--fill">
                {"Sign up"}
              </Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
export default Header;
