import React from "react";

import { ReactComponent as Logo } from "../../assets/cac-logo-color.svg";

import "./style.css";

const Footer = () => {
  return (
    <div className="cac_footer">
      <p className="cac_footer_text">
        Club de Algoritmia CUCEI 2020 <br />
        <a href="https://github.com/ErickJoestar">Erick Borquez</a>
      </p>
      <Logo className="cac_footer_logo" />
    </div>
  );
};

export default Footer;
