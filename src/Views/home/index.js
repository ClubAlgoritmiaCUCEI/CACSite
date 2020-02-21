import React, { useContext } from "react";

import { PostsContext } from "../../Providers/postsProviders";

import Post from "../../Components/post";

import "./style.css";

const content = `
Changes are automatically rendered as you type.
Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?

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

`;

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
  },
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
  }
];

const Home = () => {
  const posts = useContext(PostsContext);
  return (
    <div className="cac_home">
      {posts.map((post, i) => (
        <Post key={i} data={post} />
      ))}
    </div>
  );
};

export default Home;
