const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

const serviceAccount = require('../../keys/firebase.json');

initializeApp({
  credential: cert(serviceAccount),
  storageBucket: 'code-recode.appspot.com'
});

const firebaseDb = getFirestore();

module.exports = firebaseDb;
