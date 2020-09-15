exports.onHomeCreate = async (admin, firestore, snap) => {
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
      from: "posts"
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

exports.onHomeDelete = async (admin, firestore, snap) => {
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
      from: "posts"
    }
    if (notificationsData.exists) {
      await notificationsRef.update({
        notificationsList: admin.firestore.FieldValue.arrayRemove(notification),
      });
    }
  })
}


exports.onLike = async (firestore, admin, from, change, context) => {
  const before = change.before.data();
  const after = change.after.data();
  const authorId = after.author.id;

  if (after.likesList.length > before.likesList.length) {
    const notification = {
      type: "like",
      id: change.after.id,
      who: after.likesList[after.likesList.length - 1],
      likes: after.likesList.length,
      from: from,
      at: admin.firestore.FieldValue.serverTimestamp()
    }
    const notificationsDevRef = firestore.doc(`notificationsDev/${authorId}`);
    await notificationsDevRef.update({
      [`like-${change.after.id}`]: notification
    })
  }
}

exports.onCommentary = async (firestore, admin, from, change, context) => {
  const before = change.before.data();
  const after = change.after.data();
  const authorId = after.author.id;

  if (after.comments.length > before.comments.length) {
    const notification = {
      type: "commentary",
      id: change.after.id,
      who: after.comments[after.comments.length - 1].author,
      commentaries: after.comments.length,
      from: from,
      at: admin.firestore.FieldValue.serverTimestamp()
    }

    const notificationsDevRef = firestore.doc(`notificationsDev/${authorId}`);

    await notificationsDevRef.update({
      [`commentary-${change.after.id}`]: notification
    })
  }
}
