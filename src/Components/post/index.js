import React, { useState } from "react";

import { firebase, firestore } from "../../firebase";

import ReactMarkdown from "react-markdown";
import htmlParser from "react-markdown/plugins/html-parser";
import TimeAgo from "react-timeago";

import CodeBlock from "../code-block";
import ColoredName from "../colored-name";

import DefaultPhoto from "../../assets/default-photo.jpg";
import { ReactComponent as Heart } from "../../assets/heart.svg";
import { ReactComponent as Comment } from "../../assets/chatbox.svg";
import { ReactComponent as Bookmark } from "../../assets/bookmark.svg";

import "./style.css";
import "github-markdown-css";

const parseHtml = htmlParser({
  isValidNode: node => node.type !== "script"
});

const Post = ({
  user,
  data,
  allUsers,
  preview = false,
  cropContent = false,
  onClick = () => null
}) => {
  let { author } = data;
  author = allUsers[author.id] || author;
  const [like, setLike] = useState(data.likesList.includes(user.uid));

  const onLikeClick = e => {
    e.stopPropagation();
    const updateLike = async () => {
      setLike(!like);
      const postRef = firestore.doc(`posts/${data.id}`);
      if (!like) {
        await postRef.update({
          likesList: firebase.firestore.FieldValue.arrayUnion(user.uid)
        });
      } else {
        await postRef.update({
          likesList: firebase.firestore.FieldValue.arrayRemove(user.uid)
        });
      }
    };
    updateLike();
  };
  return (
    <div
      className={`cac_post ${cropContent ? "cac_post--crop" : ""}`}
      onClick={onClick}
    >
      <div className="cac_post_heading">
        <img
          src={author.photoURL || DefaultPhoto}
          className="cac_post_heading_photo"
          alt={author.displayName}
        />
        <div className="cac_post_text-container">
          <span className="cac_post_title">{data.title}</span>
          <ColoredName className="cac_post_author" rank={author.rank}>
            {author.displayName}
          </ColoredName>
          {preview ? (
            <span className="cac_post_date">{data.date}</span>
          ) : (
            <TimeAgo className="cac_post_date" date={data.timestamp.toDate()} />
          )}
        </div>
        <div className="cac_post_icons"></div>
      </div>

      <ReactMarkdown
        className={`cac_post_content markdown-body ${
          cropContent ? "cac_post_content--crop" : ""
        }`}
        source={data.content}
        renderers={{ code: CodeBlock }}
        escapeHtml={false}
        astPlugins={[parseHtml]}
      />
      <div className="cac_post_interaction">
        <div className="cac_post_interaction-box" onClick={onLikeClick}>
          <Heart
            className={`cac_post_icon cac_post_heart ${
              like ? "cac_post_heart--filled" : ""
            }`}
          />
          <span className="cac_post_interaction-label">Like</span>
        </div>
        <div className="cac_post_interaction-box">
          <Comment className="cac_post_icon cac_post_comment" />
          <span className="cac_post_interaction-label">Comment</span>
        </div>
        <div className="cac_post_interaction-box">
          <Bookmark className={`cac_post_icon cac_post_bookmark ${""}`} />
          <span className="cac_post_interaction-label">Save</span>
        </div>
      </div>
    </div>
  );
};

export default Post;
