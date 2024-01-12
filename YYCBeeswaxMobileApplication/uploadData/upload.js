const admin = require("firebase-admin");

// you can find this json file in firebase under
// project overview (cogwheel) -> project settings -> service accounts -> generate new private key -> rename it
const serviceAccount = require("./ServiceAccountKey.json");

const filename = "beeSpeciesSurvey.json"; //specify the file to upload
const specifiedCollection = "quizzes"; //specify the collection to add the file to

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const data = require(`./data/${filename}`);

async function uploadData() {
    for (const doc of data) {
        await db.collection(specifiedCollection).add(doc);
    }
}

uploadData();
