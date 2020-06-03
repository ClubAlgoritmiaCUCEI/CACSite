import React, { useMemo } from 'react'

import ReactMarkdown from "react-markdown";
import htmlParser from "react-markdown/plugins/html-parser";
import CodeBlock from "../code-block";

import MathJax from 'react-mathjax2';
import RemarkMathPlugin from 'remark-math';

// import { formateMarkdown } from "../../utilities";

import './style.css'

const parseHtml = htmlParser({
  isValidNode: node => node.type !== "script" && node.type !== "break"
});
const MarkdownContent = ({ content = "", className = "" }) => {

  const markdown = useMemo(() => {
    const newProps = {
      className: `cac_markdown ${className}`,
      source: content,
      plugins: [RemarkMathPlugin],
      renderers: {
        code: CodeBlock,
        math: (props) => {
          return <MathJax.Node>{props.value}</MathJax.Node>
        },
        inlineMath: (props) => {
          return <MathJax.Node inline>{props.value}</MathJax.Node>
        }
      },
      escapeHtml: false,
      astPlugins: [parseHtml]
    }


    return (
      <MathJax.Context input="tex">
        <ReactMarkdown {...newProps} />
      </MathJax.Context>
    );
  }, [content, className]);
  return markdown;
};

export default MarkdownContent;
