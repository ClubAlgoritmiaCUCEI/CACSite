import React from 'react'

import ReactMarkdown from 'react-markdown';
import htmlParser from 'react-markdown/plugins/html-parser';

import CodeBlock from '../code-block';
import ColoredName from '../colored-name';

import DefaultPhoto from '../../assets/default-photo.jpg';

import './style.css';

const parseHtml = htmlParser({
  isValidNode: node => node.type !== 'script',
})

const Post = ({ data }) => {
  const { author } = data;
  console.log(data);
  return <div className="cac_post">
    <div className="cac_post_heading">
      <img src={author.photoURL || DefaultPhoto} className="cac_post_heading_photo" alt={author.displayName} />
      <div className="cac_post_text-container">
        <span className="cac_post_title">{data.title}</span>
        <ColoredName className="cac_post_author" rank={author.rank}> {author.displayName}</ColoredName>
        <span className="cac_post_date">{data.date}</span>
      </div>
    </div>
    <ReactMarkdown
      className="cac_post_content"
      source={data.content}
      renderers={{ code: CodeBlock }}
      escapeHtml={false}
      astPlugins={[parseHtml]} />
  </div>
}

export default Post;