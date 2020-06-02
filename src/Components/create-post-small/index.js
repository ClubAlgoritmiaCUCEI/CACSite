import React, { useState, useContext } from 'react'

import { firebase, firestore } from '../../firebase';

import { PostsContext } from '../../Providers/postsProvider';

import { formateMarkdown } from '../../utilities';

import './style.css'
import Button from '../button';

const CreatePostSmall = ({ type, user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const postsContext = useContext(PostsContext);

  const handlePost = () => {
    const post = async () => {
      const postData = {
        title,
        content: formateMarkdown(text),
        type: type,
        comments: [],
        likesList: [],
        author: { id: user.uid, displayName: user.displayName },
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        key: Date.now()
      };
      try {
        await firestore.collection('test-posts').add(postData);
        clearData();
        postsContext.fetch(type, true);
      } catch (e) {
        console.error(e);
      }
      setIsPosting(false);
    }
    if (isPosting) return;
    setIsPosting(true);
    post();
  }
  const clearData = () => {
    setText("");
    setTitle("");
    setIsEditing(false);
  }
  return <div className={`cac_create_post_small ${isEditing ? "editing" : "not-editing"}`}>
    {isEditing ? (<>
      <textarea
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="cac_create_post_small_textarea cac_create_post_small_textarea--title" />
      <textarea placeholder="Content (Markdown)"
        value={text}
        onChange={e => setText(e.target.value)}
        className="cac_create_post_small_textarea cac_create_post_small_textarea--content" />
      <Button className={`cac_create_post_small_button cac_create_post_small_button--post ${
        isPosting || title === "" || text === ""
          ? "cac_create_post_small_button--disabled"
          : ""
        }`}
        onClick={handlePost}>
        Post
        </Button>
      <Button
        className="cac_create_post_small_button cac_create_post_small_button--cancel"
        onClick={clearData}
      >
        Cancel
          </Button>
    </>) : (<>
      <textarea
        className="cac_create_post_small_textarea"
        value=""
        placeholder="Create Post"
        onClick={() => setIsEditing(true)}
        onChange={e => {
          setIsEditing(true);
          setTitle(e.target.value);
        }} />
      <Button className={`cac_create_post_small_button cac_create_post_small_button--post ${
        isPosting || title === "" || text === ""
          ? "cac_create_post_small_button--disabled"
          : ""
        }`} >Post</Button>
    </>)}

  </div>
}

export default CreatePostSmall