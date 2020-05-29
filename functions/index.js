const functions = require('firebase-functions');
const app = require('express')();

// Pets
const {
    getAllPets,
    postOnePet,
    deletePet,
    editPet
} = require('./API/pets')

// Users
const {
    loginUser,
} = require('./API/users');

// Pets
app.get('/pets', getAllPets);
app.post('/pet', postOnePet);
app.delete('/pets/:petId', deletePet);
app.put('/pets/:petId', editPet);

// Users
app.post('login', loginUser);

exports.api = functions.https.onRequest(app);

