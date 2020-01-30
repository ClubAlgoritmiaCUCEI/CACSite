import React from 'react'


import './style.css'

const Button = (props) =>{
    const {onClick, children, className} = props;
    return (
        <div className={`cac_button ${className}`} onClick={onClick}>
            {children}
        </div>
    )
}

export default Button;