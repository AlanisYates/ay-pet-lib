const functions = require('firebase-functions');
const app = require('express')();

const {
    getAllPets,
    postOnePet,
    deletePet,
} = require('./API/pets')

app.get('/pets', getAllPets);
app.post('/pet', postOnePet);
app.delete('/pets/:petId', deletePet);

exports.api = functions.https.onRequest(app);

