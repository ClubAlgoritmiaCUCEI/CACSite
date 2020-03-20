
exports.onLike = async (firestore, admin, from, change, context) => {
  const before = change.before.data();
  const after = change.after.data();
  const authorId = after.author.id;

  if (after.likesList.length > before.likesList.length) {
    console.log("new like :)");
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
    console.log("new commentary");
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