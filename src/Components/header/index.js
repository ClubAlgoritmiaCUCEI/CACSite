import React, { useContext, useRef, useState, useEffect } from "react";

// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Link } from "react-router-dom";
import { signOut } from "../../firebase";

import { UserContext } from "../../Providers/userProvider";

import Button from "../button";

import { ReactComponent as Logo } from "../../assets/cac-logo.svg";
import { ReactComponent as Message } from "../../assets/messages-icon.svg";
import { ReactComponent as Notification } from "../../assets/notification-icon.svg";
import { ReactComponent as Search } from "../../assets/search-icon.svg";

import "./style.css";

const useOutsideAlerter = (ref, opener, handle) => {
  const handleClickOutside = event => {
    if (
      ref.current &&
      !ref.current.contains(event.target) &&
      !opener.current.contains(event.target)
    ) {
      handle();
    }
  };

  useEffect(() => {
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
};
const Header = () => {
  const user = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);

  const wrapperRef = useRef(null);
  const wrapperOpenerRef = useRef(null);
  useOutsideAlerter(wrapperRef, wrapperOpenerRef, () => setIsOpen(false));

  return (
    <div className="cac_header">
      <Logo alt="Club de Algoritmia CUCEI logo" className="cac_header_logo" />
      <div className="cac_user-interface">
        {!user.isLoading ? (
          <>
            <Search className="cac_header_icon search-icon" alt="search icon" />
            {user.logged ? (
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
                  ref={wrapperOpenerRef}
                  onClick={() => setIsOpen(!isOpen)}
                  src={user.photoURL}
                  alt="user"
                  className="cac_header_user-photo"
                />
                {isOpen && (
                  <div className="cac_header_options" ref={wrapperRef}>
                    <div className="cac_header_options-section">
                      <Link to="/profile" className="cac_header_option">
                        Your profile
                      </Link>
                      <div className="cac_header_option">Your likes</div>
                    </div>
                    <div className="cac_header_options-section">
                      <div className="cac_header_option">Help</div>
                      <div
                        className="cac_header_option"
                        onClick={() => signOut()}
                      >
                        Sign out
                      </div>
                    </div>
                  </div>
                )}
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
          </>
        ) : null}
      </div>
    </div>
  );
};
export default Header;
