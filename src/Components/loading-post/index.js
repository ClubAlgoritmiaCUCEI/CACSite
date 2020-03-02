import React from "react";

import "./style.css";
import "../../animations.css";
const LoadingPost = ({ type = "large", showUser = true }) => {
  return (
    <div className={"cac_loading-post cac_loading-post--" + type}>
      {showUser && <div className="gradient cac_loading-post_image" />}
      <div className="cac_loading-post_author">
        <div className="gradient cac_loading-post_title" />
        <div className="gradient cac_loading-post_name" />
      </div>
      {type === "large" && (
        <div className="cac_loading-post_content-container">
          <div className="gradient cac_loading-post_content cac_loading-post_content--big" />
          <div className="gradient cac_loading-post_content cac_loading-post_content--medium" />
          <div className="gradient cac_loading-post_content cac_loading-post_content--medium" />
          <div className="gradient cac_loading-post_content cac_loading-post_content--small" />
        </div>
      )}
      {type === "medium" && (
        <div className="cac_loading-post_content-container">
          <div className="gradient cac_loading-post_content cac_loading-post_content--medium" />
          <div className="gradient cac_loading-post_content cac_loading-post_content--medium" />
          <div className="gradient cac_loading-post_content cac_loading-post_content--small" />
        </div>
      )}
      {type === "small" && (
        <div className="cac_loading-post_content-container">
          <div className="gradient cac_loading-post_content cac_loading-post_content--medium" />
          <div className="gradient cac_loading-post_content cac_loading-post_content--small" />
        </div>
      )}
    </div>
  );
};

export default LoadingPost;
