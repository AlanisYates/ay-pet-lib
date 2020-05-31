const functions = require('firebase-functions');
const app = require('express')();
const auth = require('./util/auth')

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
    signUpUser,
    uploadProfilePhoto,
} = require('./API/users');

// Pets
app.get('/pets', getAllPets);
app.post('/pet', postOnePet);
app.delete('/pets/:petId', deletePet);
app.put('/pets/:petId', editPet);

// Users
app.post('/login', loginUser);
app.post('/signup', signUpUser);
app.post('/user/image', auth, uploadProfilePhoto);

exports.api = functions.https.onRequest(app);

