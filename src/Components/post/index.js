import React, { useState } from "react";

import { firebase, firestore } from "../../firebase";
// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Link, useHistory } from "react-router-dom";



import MarkdownContent from "../markdown-content";
import TimeAgo from "react-timeago";
import ColoredName from "../colored-name";
import Commentary, { LoadingCommentary } from "../comentary";
import Button from "../button";
import Options from "../options";

import DefaultPhoto from "../../assets/default-photo.jpg";
import { ReactComponent as Heart } from "../../assets/heart.svg";
import { ReactComponent as Comment } from "../../assets/chatbox.svg";
import { ReactComponent as Bookmark } from "../../assets/bookmark.svg";

import "./style.css";
import "github-markdown-css";

const Post = ({
  user,
  from = "posts",
  showAuthor = true,
  enableLink = true,
  data,
  allUsers,
  preview = false,
  cropContent = false,
  commentary = { handleAddCommentary: () => null, showCommentaries: false },
  onClick = () => null,
  parentHandleDelete = () => null
}) => {
  let author;
  author = allUsers[data.author.id] || author;
  const [textValue, setTextValue] = useState("");
  const [like, setLike] = useState(!preview && user.logged && data.likesList.includes(user.uid));
  const [saved, setSaved] = useState(
    !preview && user.logged && user.saved.includes(data.id)
  );
  const history = useHistory();
  const [likesCount, setLikesCount] = useState(preview ? 0 : data.likesList.length)

  const onLikeClick = e => {
    e.stopPropagation();
    const updateLike = async () => {
      setLike(!like);
      const postRef = firestore.doc(`test-posts/${data.id}`);
      if (!like) {
        setLikesCount(likesCount + 1)
        await postRef.update({
          likesList: firebase.firestore.FieldValue.arrayUnion(user.uid)
        });
      } else {
        setLikesCount(likesCount - 1)
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
    commentary.handleAddCommentary(textValue);
    setTextValue("");
  };

  const handleDelete = () => {
    const postRef = firestore.doc(`test-posts/${data.id}`);
    console.log("eee")
    postRef.delete();
    parentHandleDelete();
  };

  const handleCommentaryDelete = async commentary => {
    const postRef = firestore.doc(`commentaries/${data.id}`);
    console.log(commentary);
    await postRef.update({
      commentaries: firebase.firestore.FieldValue.arrayRemove(commentary)
    });
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
                    date={data.createdAt ? data.createdAt.seconds * 1000 : new Date()}
                  />
                )}
            </div>
            <Options
              className="cac_post_options"
              user={user}
              author={author}
              handleDelete={handleDelete}
            >
            </Options>
          </div>
          <MarkdownContent
            content={data.content}
            className={`cac_post_content markdown-body ${
              cropContent ? "cac_post_content--crop" : ""
              }`}
          />

          <div className="cac_post_interaction">
            <div className="cac_post_interaction-box" onClick={onLikeClick}>
              <span className="cac_post_interaction-counter">
                {likesCount}
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
                {data.commentariesCount}
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
          {commentary.showCommentaries && (
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
                {!commentary.isLoading ? commentary.data
                  .sort((a, b) => b.date.toDate() - a.date.toDate())
                  .map((data, i) => (
                    <Commentary
                      handleDelete={() => handleCommentaryDelete(data)}
                      postRef={`${from}/${data.id}`}
                      key={i}
                      user={user}
                      author={{ id: data.author, ...allUsers[data.author] }}
                      content={data.content}
                      date={data.date}
                    />
                  )) : (
                    <>
                      <LoadingCommentary />
                      <LoadingCommentary />
                      <LoadingCommentary />
                    </>)}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Post;
