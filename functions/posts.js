exports.onPostCreate = async (admin, firestore, snap) => {
  const ref = firestore.doc(`commentaries/${snap.id}`);
  const postRef = firestore.doc(`test-posts/${snap.id}`);
  postRef.update({
    lastUpdate: Date.now(),
    timestamp: admin.firestore.FieldValue.serverTimestamp(),
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  });
  ref.set({ commentaries: [] });

  const postData = snap.data();
  if (postData.type === "home") {
    const usersSnapshot = await firestore.collection('users').get();
    const postData = snap.data();
    usersSnapshot.docs.forEach(async ({ id }) => {
      const notificationsRef = firestore.doc(`notifications/${id}`);
      const notificationsData = await notificationsRef.get();
      const notification = {
        title: postData.title,
        id: snap.id,
        description: postData.content,
        at: postData.timestamp,
        author: postData.author,
        from: "home",
        type: "home",
      }
      if (notificationsData.exists) {
        await notificationsRef.update({
          notificationsList: admin.firestore.FieldValue.arrayUnion(notification),
          unread: admin.firestore.FieldValue.increment(1)
        });
      } else {
        await notificationsRef.set({
          notificationsList: [notification], unread: 1
        })
      }
    })
  }
}

exports.onCommentaryUpdate = async (admin, firestore, snap) => {
  console.log(snap);
  const commentaryData = snap.after.data();
  const ref = firestore.doc(`test-posts/${snap.after.id}`);

  ref.update({
    lastUpdate: Date.now(),
    timestamp: admin.firestore.FieldValue.serverTimestamp(),
    commentariesCount: commentaryData.commentaries.length
  });
}

exports.updatePosts = async (admin, firestore, req, res) => {
  const allPosts = await firestore.collection('test-posts').get();
  allPosts.forEach(async snap => {
    const postData = snap.data();
    if (postData.createdAt) return;
    const postRef = firestore.doc(`test-posts/${snap.id}`);
    const commentaryData = (await firestore.doc(`commentaries/${snap.id}`).get()).data();
    console.log(commentaryData);
    postRef.update({
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  })
  return res.send("Succes!");
}

exports.onPostUpdate = async (admin, firestore, snap) => {
  const after = snap.after.data();
  const before = snap.before.data();
  const now = admin.firestore.Timestamp.fromDate(new Date());
  if (after.likesList.length !== before.likesList.length ||
    after.title !== before.title ||
    after.content !== before.content ||
    after.commentariesCount !== before.commentariesCount
  ) {
    await firestore.doc(`test-posts/${snap.after.id}`).update({ lastUpdate: Date.now(), timestamp: now });
  }
}

exports.onPostDelete = async (admin, firestore, snap) => {
  const id = snap.id;
  await firestore.collection('deletions').add({
    collection: 'test-posts',
    id: id,
    timestamp: admin.firestore.FieldValue.serverTimestamp(),
  });
}

// exports.updateLegacyPosts = async (firestore, req, res) => {
//   const homeSnapshot = await firestore.collection('posts').get();
//   const publicSnapshot = await firestore.collection('public').get();
//   const editorialSnapshot = await firestore.collection('editorial').get();
//   const weeklyProblems = await firestore.collection('weekly-problems').get();

//   const AllPosts = [];

//   homeSnapshot.docs.forEach(doc => {
//     AllPosts.push({ ...doc.data(), id: doc.id, type: "home" });
//   })

//   publicSnapshot.docs.forEach(doc => {
//     AllPosts.push({ ...doc.data(), id: doc.id, type: "public" });
//   })

//   editorialSnapshot.docs.forEach(doc => {
//     AllPosts.push({ ...doc.data(), id: doc.id, type: "editorial" });
//   })

//   weeklyProblems.docs.forEach(doc => {
//     AllPosts.push({ ...doc.data(), id: doc.id, type: "weekly-problem" });
//   })

//   AllPosts.forEach(post => {
//     const ref = firestore.doc(`test-posts/${post.id}`);
//     ref.update({ createdAt: post.timestamp });
//   })
//   return res.json({ AllPosts });
// }

// exports.moveAllCommentaries = async (firestore, req, res) => {
//   const posts = await firestore.collection('test-posts').get();
//   const allCommentaries = [];

//   posts.docs.forEach(async doc => {
//     const data = { commentaries: doc.data().comments }
//     const ref = firestore.doc(`commentaries/${doc.id}`);
//     const snap = await ref.get();
//     if (snap.exists) return;
//     ref.set(data);
//   })

//   return res.json({ allCommentaries });
// }

