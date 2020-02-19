import React from "react";

import "./style.css";

const Popup = ({ children }) => {
  return <div className="cac_popup">{children}</div>;
};

export default Popup;

const TopPopup = ({ children, className, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`cac_popup-top ${className ? className : ""}`}
    >
      {children}
    </div>
  );
};

export { TopPopup };
