import React from "react";

import "./style.css";

const ColoredName = ({ className, rank, children }) => {
  return (
    <span className={`cac_rank_name ${className || ""} ${rank || "default"}`}>
      {children}
    </span>
  );
};

export default ColoredName;
