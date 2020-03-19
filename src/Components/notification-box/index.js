import React from 'react'

import { ReactComponent as defaultPhoto } from '../../assets/default-photo.jpg'

import './style.css';

const NotificationBox = ({ data, author, history }) => {
  const redirectToAuthor = (e) => {
    e.stopPropagation();
    history.push(`/profile/${author.id}`)
  }

  const redirectToPost = e => {
    e.stopPropagation();
    history.push(`/posts/${data.id}`);
  }
  return <div className="cac_notification-box">
    {data.author && (<img onClick={redirectToAuthor} className="cac_notification_image" src={author.photoURL || defaultPhoto} alt={author.displayName} />)}
    <p>
      <span onClick={redirectToAuthor} className="cac_notification_black">{author.displayName}</span>
      {" posted "}
      <span className="cac_notification_black" onClick={redirectToPost} >{data.title}</span>
      {" on home."}</p>
  </div>
}

export default NotificationBox;