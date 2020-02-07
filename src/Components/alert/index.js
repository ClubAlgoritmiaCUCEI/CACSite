import React, { useState } from 'react'

import './style.css'

import { ReactComponent as AlertIcon } from "../../assets/alert-icon.svg";

const Alert = ({ className, text }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`cac_alert ${className && className}`} onClick={() => setIsOpen(!isOpen)}>
      <AlertIcon className="cac_alert_icon" />
      {isOpen &&
        <div className="cac_alert_box">
          {text}
        </div>}
    </div>
  )
}
export default Alert;