import React, { useContext } from "react";

// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Link, useHistory } from "react-router-dom";
import { signOut, firestore } from "../../firebase";

import { UserContext, AllUsersContext } from "../../Providers/userProvider";

import Button from "../button";
import Options from '../options';

import { ReactComponent as Logo } from "../../assets/cac-logo.svg";
import { ReactComponent as Message } from "../../assets/messages-icon.svg";
import { ReactComponent as Notification } from "../../assets/notification-icon.svg";
import { ReactComponent as Search } from "../../assets/search-icon.svg";

import "./style.css";
import NotificationBox from "../notification-box";

const Header = () => {
  const user = useContext(UserContext);
  const allUsers = useContext(AllUsersContext);
  const history = useHistory();
  const { notifications } = user || {};

  const hadleNotificationsClick = async () => {
    const notificationsRef = firestore.doc(`notifications/${user.uid}`);
    notificationsRef.update({ unread: 0 });
  }

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
                <Options
                  className="cac_header_icon-wrapper"
                  containerClassName="cac_header_notification-container"
                  opener={
                    <>
                      <Notification
                        className="cac_header_icon notification-icon"
                        alt="notification icon"
                        onClick={hadleNotificationsClick}
                      />
                      {notifications && notifications.unread > 0 && <span className="cac_header_icon_number">{notifications.unread}</span>}
                    </>
                  }
                  styleChildren={false}
                  defaultContent={false}
                >{notifications &&
                  notifications.notificationsList.length > 0 ?
                  (
                    notifications.notificationsList.map(notification => (
                      <NotificationBox
                        history={history}
                        key={notification.id}
                        data={notification}
                        author={allUsers.usersMap[notification.author.id]} />))
                  ) : (
                    // eslint-disable-next-line jsx-a11y/accessible-emoji
                    <span className="cac_header_placeholder-notification">You dont have any notification 👀</span>
                  )
                  }
                </Options>
                <Options
                  opener={<img
                    src={user.photoURL}
                    alt="user"
                    className="cac_header_user-photo"

                  />}
                  styleChildren={false}
                  defaultContent={false}
                  user={user}
                >
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
                </Options>
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
    </div >
  );
};
export default Header;
