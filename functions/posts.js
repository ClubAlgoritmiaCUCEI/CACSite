exports.moveAllPosts = async (firestore, req, res) => {
  const homeSnapshot = await firestore.collection('posts').get();
  const publicSnapshot = await firestore.collection('public').get();
  const editorialSnapshot = await firestore.collection('editorial').get();
  const weeklyProblems = await firestore.collection('weekly-problems').get();

  const AllPosts = [];

  homeSnapshot.docs.forEach(doc => {
    AllPosts.push({ ...doc.data(), id: doc.id, type: "home" });
  })

  publicSnapshot.docs.forEach(doc => {
    AllPosts.push({ ...doc.data(), id: doc.id, type: "public" });
  })

  editorialSnapshot.docs.forEach(doc => {
    AllPosts.push({ ...doc.data(), id: doc.id, type: "editorial" });
  })

  weeklyProblems.docs.forEach(doc => {
    AllPosts.push({ ...doc.data(), id: doc.id, type: "weekly-problem" });
  })

  // users.forEach(user => {
  //   const ref = firestore.doc(`whiteList/${user.id}`);
  //   ref.set(user);
  // })
  AllPosts.forEach(post => {
    const ref = firestore.doc(`test-posts/${post.id}`);
    ref.set(post);
  })
  return res.json({ AllPosts });
}

exports.moveAllCommentaries = async (firestore, req, res) => {
  const posts = await firestore.collection('test-posts').get();


  const allCommentaries = [];

  posts.docs.forEach(doc => {
    const data = { commentaries: doc.data().comments }
    const ref = firestore.doc(`commentaries/${doc.id}`);
    ref.set(data);
  })
  // users.forEach(user => {
  //   const ref = firestore.doc(`whiteList/${user.id}`);
  //   ref.set(user);
  // })

  return res.json({ allCommentaries });
}