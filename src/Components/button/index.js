import React from "react";

import "./style.css";

const Button = props => {
  const { onClick, children, className } = props;
  return (
    <div className={`cac_button ${className || ""}`} onClick={onClick}>
      {children}
    </div>
  );
};

const FormButton = props => {
  const { onClick, children, className } = props;
  return (
    <button className={`cac_button-form cac_button ${className || ""}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;

export {FormButton};