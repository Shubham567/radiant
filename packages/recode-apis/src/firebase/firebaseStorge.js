const { initializeApp, cert } = require('firebase-admin/app');
const { getStorage } = require('firebase-admin/storage');

const serviceAccount = require('../../keys/firebase.json');

const storageBucket = getStorage().bucket();
module.exports = storageBucket;
