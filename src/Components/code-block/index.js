import React from 'react'

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coy } from 'react-syntax-highlighter/dist/esm/styles/prism';


import './style.css'

const CodeBlock = ({ language = null, value }) => {
  return (
    <SyntaxHighlighter language={language} style={coy} >
      {value}
    </SyntaxHighlighter>
  );
}

export default CodeBlock;