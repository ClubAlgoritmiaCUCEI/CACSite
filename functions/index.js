
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const cors = require('cors')({ origin: true });
admin.initializeApp();

const firestore = admin.firestore();
firestore.settings({ timestampsInSnapshots: true });

const config = {
  mail: {
    user: functions.config().mail.user,
    password: functions.config().mail.password
  }
}

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.mail.user,
    pass: config.mail.password
  }
})

exports.sendMail = functions.https.onRequest((req, res) => {
  cors(req, res, () => {

    const mailOptions = {
      from: `Club de Algoritmia CUCEI <${config.mail.user}>`,
      to: "erickp.borquez@alumnos.udg.mx",
      subject: 'wey que onda jeje', // email subject
      html: `<p style="font-size: 16px;">Pickle Riiiiiiiiiiiiiiiick!!</p>
              <br />
              <img src="https://images.prod.meredith.com/product/fc8754735c8a9b4aebb786278e7265a5/1538025388228/l/rick-and-morty-pickle-rick-sticker" />
          ` // email content in HTML
    };

    // returning result
    return transporter.sendMail(mailOptions, (erro, info) => {
      if (erro) {
        return res.send(erro.toString());
      }
      return res.send('Sended');
    });
  });
});

exports.updateWhiteList = functions.https.onRequest(async (req, res) => {
  //const emails = firestore.collection('email');
  const usersSnapshot = await firestore.collection('users').get();
  const users = usersSnapshot.docs.map(doc => ({ id: doc.id, email: doc.data().email, displayName: doc.data().displayName }))

  users.forEach(user => {
    const ref = firestore.doc(`whiteList/${user.id}`);
    ref.set(user);
  })
  return res.json({ users });
})


exports.notifyOnHomeCreate = functions.firestore.document('posts/{post}').onCreate(async (snap, context) => {
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
})

exports.notifyOnHomeDelete = functions.firestore.document('posts/{post}').onDelete(async (snap, context) => {
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
})