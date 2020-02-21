import React from "react";

import Post from '../../Components/post';

import "./style.css";

const content = `
# Live demo

Changes are automatically rendered as you type.

## Table of Contents

* Implements [GitHub Flavored Markdown](https://github.github.com/gfm/)
* Renders actual, "native" React DOM elements
* Allows you to escape or skip HTML (try toggling the checkboxes above)
* If you escape or skip the HTML, no dangerouslySetInnerHTML is used! Yay!

## HTML block below

<blockquote>
  This blockquote will change based on qwethe HTML settings above.
</blockquote>

## How about some code?
\`\`\`cpp
int main() {
  int n;
  cin>>n;
  while(n--){
    cout<<n<<ENDL;
  }
  return 0;
}
\`\`\`

Pretty neat, eh?

## Tables?

| Feature   | Support |
| --------- | ------- |
| tables    | ✔ |
| alignment | ✔ |
| wewt      | ✔ |

## More info?

Read usage information and more on [GitHub](//github.com/rexxars/react-markdown)

---------------

A component by [Espen Hovlandsdal](https://espen.codes/)
`

const POSTS = [
  {
    id: "123123123",
    title: "Titulo de un post",
    date: "8 hours ago",
    author: {
      id: "1231231",
      displayName: "Erick Borquez",
      rank: "specialist"
    },
    content: content
  }, {
    id: "123123123",
    title: "Titulo de un post",
    date: "8 hours ago",
    author: {
      id: "1231231",
      displayName: "Erick Borquez",
      rank: "specialist"
    },
    content: content
  }

]

const Home = () => {
  return <div className="cac_home">
    {POSTS.map((post, i) => <Post key={i} data={post} />)}
  </div>;
};

export default Home;
