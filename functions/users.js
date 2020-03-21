exports.createWhiteList = async (firestore, req, res) => {
  const usersSnapshot = await firestore.collection('users').get();
  const users = usersSnapshot.docs.map(doc => ({ id: doc.id, email: doc.data().email, displayName: doc.data().displayName }))

  users.forEach(user => {
    const ref = firestore.doc(`whiteList/${user.id}`);
    ref.set(user);
  })
  return res.json({ users });
}

exports.updateUsersTimestamp = async (admin, firestore, req, res) => {
  const usersSnapshot = await firestore.collection('users').get();
  usersSnapshot.forEach(async user => {
    await firestore.doc(`users/${user.id}`).update({ lastUpdate: Date.now(), timestamp: admin.firestore.FieldValue.serverTimestamp() });
  })

  return res.send("Succes!");
}

exports.onUserChange = async (admin, firestore, snap) => {
  const after = snap.after.data();
  const now = admin.firestore.Timestamp.fromDate(new Date());
  console.log(now);
  console.log(after.timestamp);
  if (now.seconds - after.timestamp.seconds > 10) {
    console.log("updating...");
    await firestore.doc(`users/${snap.after.id}`).update({ lastUpdate: Date.now(), timestamp: now });
  }
}