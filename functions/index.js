const functions = require('firebase-functions');
const app = require('express')();

const {
    getAllPets
} = require('./API/pets')

app.get('/pets', getAllPets);

exports.api = functions.https.onRequest(app);