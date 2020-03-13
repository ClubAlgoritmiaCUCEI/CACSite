import React from "react";
// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Link } from "react-router-dom";

import ColoredName from "../colored-name";
import TimeAgo from "react-timeago";
import Options from "../options";
import MarkdownContent from "../markdown-content";

import DefaultImage from "../../assets/default-photo.jpg";

import "./style.css";

const Commentary = ({
  handleDelete = () => console.log("?>?"),
  user,
  author,
  date,
  content
}) => {
  return (
    <div className="cac_commentary">
      <div className="cac_commentary_heading">
        <img
          src={author ? author.photoURL || DefaultImage : DefaultImage}
          alt={author ? author.displayName : ""}
          className="cac_commentary_photo"
        />
        <div className="cac_commentary_heading_text">
          <Link
            to={`/profile/${author.id}`}
            className="cac_commentary_name--link"
          >
            <ColoredName
              className="cac_commentary_name"
              rank={author ? author.rank : null}
            >
              {author ? author.displayName : ""}
            </ColoredName>
          </Link>
          <TimeAgo className="cac_post_date" date={date.toDate()} />
        </div>
        <Options
          handleDelete={handleDelete}
          className="cac_commentary_options"
          user={user}
          author={author}
        />
      </div>
      <MarkdownContent content={content} className="cac_commentary_content" />
    </div>
  );
};

export default Commentary;
