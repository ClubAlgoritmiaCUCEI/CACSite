import React from "react";

import ReactMarkdown from "react-markdown";
import htmlParser from "react-markdown/plugins/html-parser";
import TimeAgo from "react-timeago";

import CodeBlock from "../code-block";
import ColoredName from "../colored-name";

import DefaultPhoto from "../../assets/default-photo.jpg";
import HeartFilled from "../../assets/heart-outline.svg";

import "./style.css";
import "github-markdown-css";

const parseHtml = htmlParser({
  isValidNode: node => node.type !== "script"
});

const Post = ({ user, data, allUsers, preview = false }) => {
  let { author } = data;
  author = allUsers[author.id] || author;
  return (
    <div className="cac_post">
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
      </div>
      <ReactMarkdown
        className="cac_post_content markdown-body"
        source={data.content}
        renderers={{ code: CodeBlock }}
        escapeHtml={false}
        astPlugins={[parseHtml]}
      />
    </div>
  );
};

export default Post;
