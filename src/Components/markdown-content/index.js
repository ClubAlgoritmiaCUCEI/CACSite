import React from "react";

import ReactMarkdown from "react-markdown";
import htmlParser from "react-markdown/plugins/html-parser";
import CodeBlock from "../code-block";

import { removeDangerousHTML } from "../../utilities";

import './style.css'

const parseHtml = htmlParser({
  isValidNode: node => node.type !== "script" && node.type !== "break"
});

const MarkdownContent = ({ content = "", className = "" }) => {
  return (
    <ReactMarkdown
      className={` d ${className}`}
      source={removeDangerousHTML(content)}
      renderers={{ code: CodeBlock }}
      escapeHtml={false}
      astPlugins={[parseHtml]}
    />
  );
};

export default MarkdownContent;
