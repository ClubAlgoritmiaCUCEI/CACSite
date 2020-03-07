import React from "react";

import { ReactComponent as Logo } from "../../assets/cac-logo-color.svg";

import "./style.css";

const HeaderMobile = () => {
  return (
    <div className="cac_header_mobile">
      <Logo className="cac_header_logo" />
    </div>
  );
};

export default HeaderMobile;
