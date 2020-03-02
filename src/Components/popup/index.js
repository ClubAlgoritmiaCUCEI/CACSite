import React, { useEffect } from "react";

import "./style.css";

const Popup = ({ children }) => {
  return <div className="cac_popup">{children}</div>;
};

export default Popup;

const TopPopup = ({ children, className = "error", onClick = () => null }) => {
  useEffect(() => {
    const timeOut = setTimeout(() => {
      onClick();
    }, 5000);
    return () => clearTimeout(timeOut);
  });

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
