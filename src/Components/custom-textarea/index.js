import React, { useRef } from 'react'

import ContentEditable from 'react-contenteditable';
import DefaultPhoto from '../../assets/default-photo.jpg'

import './style.css'


const CustomTextarea = ({ className = "" }) => {
  const text = useRef(``);
  const htmlRef = useRef(null);

  const handleChange = e => {
    text.current = e.target.value;
  }

  const handleBlur = () => {
    console.log(text.current);
    console.log(htmlRef.current.childNodes);
  }

  const onPaste = e => {
    const text = e.clipboardData.getData('text/plain');
    // e.preventDefault();
    // console.log(e.clipboardData.types);
  }

  return (
    <ContentEditable
      className={`contenteditable ${className}`}
      onPaste={onPaste}
      innerRef={htmlRef}
      html={text.current}
      onBlur={handleBlur}
      onChange={handleChange}
    />
  )
}

export default CustomTextarea;