
const functions = require('firebase-functions');
const admin = require('firebase-admin');

const users = require('./users');
const mails = require('./mails');
const notifications = require('./notifications');

admin.initializeApp();

const firestore = admin.firestore();
firestore.settings({ timestampsInSnapshots: true });

const config = {
  mail: {
    user: functions.config().mail.user,
    password: functions.config().mail.password
  }
}

/// Emails functions

exports.sendMail = functions.https
  .onRequest(async (req, res) => {
    await mails.sendMail(config, req, res);
    return;
  });


/// Users

exports.updateWhiteList = functions.https
  .onRequest(async (req, res) => {
    await users.createWhiteList(firestore, req, res);
    return;
  })

exports.setUserTimestamps = functions.https
  .onRequest(async (req, res) => {
    await users.updateUsersTimestamp(admin, firestore, req, res);
    return;
  })

exports.updateUserTimestamp = functions.firestore.document('users/{user}')
  .onUpdate(async (snap, context) => {
    await users.onUserChange(admin, firestore, snap);
    return;
  })

///// Notifications

exports.notifyOnHomeCreate = functions.firestore.document('posts/{post}')
  .onCreate(async (snap, context) => {
    await notifications.onHomeCreate(admin, firestore, snap);
    return;
  })

exports.notifyOnHomeDelete = functions.firestore.document('posts/{post}')
  .onDelete(async (snap, context) => {
    await notifications.onHomeDelete(admin, firestore, snap);
    return;
  })

exports.notifyOnHomeInteraction = functions.firestore.document('posts/{post}')
  .onUpdate(async (change, context) => {
    await notifications.onLike(firestore, admin, 'posts', change, context);
    await notifications.onCommentary(firestore, admin, 'posts', change, context);
    return;
  });

exports.notifyOnPublicInteraction = functions.firestore.document('public/{post}')
  .onUpdate(async (change, context) => {
    await notifications.onLike(firestore, admin, 'public', change, context);
    await notifications.onCommentary(firestore, admin, 'public', change, context);
    return;
  });