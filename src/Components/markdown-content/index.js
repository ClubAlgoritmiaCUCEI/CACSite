import React, { useMemo } from "react";

import ReactMarkdown from "react-markdown";
import htmlParser from "react-markdown/plugins/html-parser";
import CodeBlock from "../code-block";

import MathJax from 'react-mathjax';
import RemarkMathPlugin from 'remark-math';

import { removeDangerousHTML, escapeLatexSpaces } from "../../utilities";

import './style.css'

const parseHtml = htmlParser({
  isValidNode: node => node.type !== "script" && node.type !== "break"
});

const MarkdownContent = ({ content = "", className = "" }) => {

  const markdown = useMemo(() => {
    let formated = escapeLatexSpaces(content);
    const newProps = {
      className: `cac_markdown ${className}`,
      source: removeDangerousHTML(formated),
      plugins: [RemarkMathPlugin],
      renderers: {
        code: CodeBlock,
        math: (props) =>
          <MathJax.Node formula={props.value} />,
        inlineMath: (props) =>
          <MathJax.Node inline formula={props.value} />
      },
      escapeHtml: false,
      astPlugins: [parseHtml]
    }


    return (
      <MathJax.Provider input="tex">
        <ReactMarkdown {...newProps} />
      </MathJax.Provider>
    );
  }, [content, className]);

  return markdown;
};

export default MarkdownContent;
