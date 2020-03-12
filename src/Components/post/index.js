import React, { useState, useRef } from "react";

import { firebase, firestore } from "../../firebase";
// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Link, useHistory } from "react-router-dom";
import useOutsideAlerter from "../../Hooks/useOutsideAlerter";

import ReactMarkdown from "react-markdown";
import htmlParser from "react-markdown/plugins/html-parser";
import TimeAgo from "react-timeago";

import CodeBlock from "../code-block";
import ColoredName from "../colored-name";
import Commentary from "../comentary";
import Button from "../button";

import DefaultPhoto from "../../assets/default-photo.jpg";
import { ReactComponent as Heart } from "../../assets/heart.svg";
import { ReactComponent as Comment } from "../../assets/chatbox.svg";
import { ReactComponent as Bookmark } from "../../assets/bookmark.svg";
import { ReactComponent as Ellipsis } from "../../assets/ellipsis.svg";

import { removeDangerousHTML } from "../../utilities";

import "./style.css";
import "github-markdown-css";

const parseHtml = htmlParser({
  isValidNode: node => node.type !== "script" && node.type !== "break"
});

const Post = ({
  user,
  from = "posts",
  showAuthor = true,
  enableLink = true,
  data,
  allUsers,
  preview = false,
  cropContent = false,
  showCommentaries = false,
  onClick = () => null,
  parentHandleDelete = () => null
}) => {
  let author;
  author = allUsers[data.author.id] || author;
  const [publishingCommentary, setPublishingCommentary] = useState(false);
  const [textValue, setTextValue] = useState("");
  const like = !preview && user.logged && data.likesList.includes(user.uid);
  const [saved, setSaved] = useState(
    !preview && user.logged && user.saved.includes(data.id)
  );
  const wrapperRef = useRef(null);
  const wrapperOpenerRef = useRef(null);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  useOutsideAlerter(
    wrapperRef,
    () => setIsOptionsOpen(false),
    wrapperOpenerRef
  );

  const history = useHistory();
  const onLikeClick = e => {
    e.stopPropagation();
    const updateLike = async () => {
      const postRef = firestore.doc(`${from}/${data.id}`);
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
    if (!preview && user.logged) {
      updateLike();
    } else {
      alert("You need to sign in to like posts");
    }
  };

  const onSaveClick = e => {
    e.stopPropagation();
    const updateSaves = async () => {
      const userRef = firestore.doc(`users/${user.uid}`);
      setSaved(!saved);
      if (!saved) {
        await userRef.update({
          saved: firebase.firestore.FieldValue.arrayUnion(data.id)
        });
      } else {
        await userRef.update({
          saved: firebase.firestore.FieldValue.arrayRemove(data.id)
        });
      }
    };
    if (!preview && user.logged) {
      updateSaves();
    } else {
      alert("you need to sign in to save posts");
    }
  };

  const publishCommentary = () => {
    const publish = async () => {
      setPublishingCommentary(true);
      const postRef = firestore.doc(`${from}/${data.id}`);
      const commentContent = {
        author: user.uid,
        content: textValue,
        date: new Date()
      };
      await postRef.update({
        comments: firebase.firestore.FieldValue.arrayUnion(commentContent)
      });
      setPublishingCommentary(false);
      setTextValue("");
    };
    if (!publishingCommentary && textValue) publish();
  };

  const handleOptionsClick = e => {
    e.stopPropagation();
    const handleKeyPress = e => {
      if (e.key === "Escape") setIsOptionsOpen(false);
    };
    if (isOptionsOpen) {
      window.removeEventListener("keydown", handleKeyPress);
    } else {
      window.addEventListener("keydown", handleKeyPress);
    }
    setIsOptionsOpen(!isOptionsOpen);
  };

  const handleDelete = () => {
    const postRef = firestore.doc(`${from}/${data.id}`);
    setIsOptionsOpen(false);
    postRef.delete();
    parentHandleDelete();
  };

  return (
    <>
      {author && (
        <div
          className={`cac_post ${cropContent ? "cac_post--crop" : ""}`}
          onClick={onClick}
        >
          <div className="cac_post_heading">
            {showAuthor && (
              <img
                src={author.photoURL || DefaultPhoto}
                className="cac_post_heading_photo"
                alt={author.displayName}
                onClick={e => {
                  e.stopPropagation();
                  history.push(`/profile/${author.id}`);
                }}
              />
            )}
            <div className="cac_post_text-container">
              {enableLink ? (
                <Link
                  to={`/${from}/${data.id}`}
                  className="cac_post_title cac_post_title--link"
                >
                  {data.title}
                </Link>
              ) : (
                <span className="cac_post_title">{data.title}</span>
              )}
              {showAuthor && (
                <span
                  onClick={e => {
                    e.stopPropagation();
                    history.push(`/profile/${author.id}`);
                  }}
                  className="cac_post_author--link"
                >
                  <ColoredName className="cac_post_author" rank={author.rank}>
                    {author.displayName}
                  </ColoredName>
                </span>
              )}
              {preview ? (
                <span className="cac_post_date">{data.date}</span>
              ) : (
                <TimeAgo
                  className="cac_post_date"
                  live={false}
                  date={data.timestamp ? data.timestamp.toDate() : new Date()}
                />
              )}
            </div>
            <div className="cac_post_options">
              <Ellipsis
                className="cac_post_options_icon"
                onClick={handleOptionsClick}
                ref={wrapperOpenerRef}
              />
              {isOptionsOpen && (
                <div
                  className="cac_post_options-container"
                  ref={wrapperRef}
                  onClick={e => e.stopPropagation()}
                >
                  <div className="cac_post_options_section">
                    <span className="cac_post_options_option">Report Post</span>
                    {(author.id === user.uid || user.isAdmin) && (
                      <span
                        className="cac_post_options_option"
                        onClick={handleDelete}
                      >
                        Delete
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <ReactMarkdown
            className={`cac_post_content markdown-body ${
              cropContent ? "cac_post_content--crop" : ""
            }`}
            source={removeDangerousHTML(data.content)}
            renderers={{ code: CodeBlock }}
            escapeHtml={false}
            astPlugins={[parseHtml]}
          />
          <div className="cac_post_interaction">
            <div className="cac_post_interaction-box" onClick={onLikeClick}>
              <span className="cac_post_interaction-counter">
                {data.likesList.length}
              </span>
              <Heart
                className={`cac_post_icon cac_post_heart ${
                  like ? "cac_post_heart--filled" : ""
                }`}
              />
              <span className="cac_post_interaction-label">Like</span>
            </div>
            <div className="cac_post_interaction-box cac_post_interaction-box--comment">
              <span className="cac_post_interaction-counter">
                {data.comments.length}
              </span>
              <Comment className="cac_post_icon cac_post_comment" />
              <span className="cac_post_interaction-label">Comment</span>
            </div>
            <div className="cac_post_interaction-box" onClick={onSaveClick}>
              <Bookmark
                className={`cac_post_icon cac_post_bookmark ${
                  saved ? "cac_post_bookmark--filled" : ""
                }`}
              />
              <span className="cac_post_interaction-label">Save</span>
            </div>
          </div>
          {showCommentaries && (
            <div className="cac_post_commentaries-section">
              {user.logged && (
                <div className="cac_post_create-commentary">
                  <textarea
                    className="cac_post_create-commentary_textarea"
                    value={textValue}
                    onChange={e => setTextValue(e.target.value)}
                  />
                  <Button
                    className="cac_poist_create-commentary_button"
                    onClick={publishCommentary}
                  >
                    {"Comment"}
                  </Button>
                </div>
              )}
              <div className="cac_post_commentaries">
                {data.comments
                  .sort((a, b) => b.date.toDate() - a.date.toDate())
                  .map(({ author, content, date }, i) => (
                    <Commentary
                      key={i}
                      author={{ id: author, ...allUsers[author] }}
                      content={content}
                      date={date}
                    />
                  ))}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Post;
