const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp(serviceAccount);

const db = admin.firestore();
module.exports = { admin, db };
