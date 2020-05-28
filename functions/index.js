const functions = require('firebase-functions');
const app = require('express')();

const {
    getAllPets,
    postOnePet,
} = require('./API/pets')

app.get('/pets', getAllPets);
app.post('/pet', postOnePet);

exports.api = functions.https.onRequest(app);

