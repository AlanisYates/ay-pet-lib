const { db } = require('../util/admin');


// Get all the pets
exports.getAllPets = (req, res) => {
    db
        .collection('pets')
        .orderBy('createdAt', 'desc')
        .get()
        .then((data) => {
            let pets = [];
            data.forEach((doc) => {
                pets.push({
                    petId: doc.id,
                    name: doc.data().name,
                    age: doc.data().age,
                    breed: doc.data().breed,
                    createdAt: doc.data().createdAt,
                    description: doc.data().description,
                    available: doc.data().available,
                });
            });
            return res.json(pets)
        })
        .catch((err) => {
            console.error(err);
            return res.status(500).json({ error: err.code });
        });
};

// Post One pet 
exports.postOnePet = (req, res) => {
    if (req.body.name.trim() === '') {
        return res.status(400).json({ name: 'Must not be empty' });
    }
    if (req.body.breed.trim() === '') {
        return res.status(400).json({ breed: 'Must not be empty' });
    }
    if (req.body.description.trim() === '') {
        return res.status(400).json({ description: 'Must not be empty' });
    }

    const newPetItem = {
        name: req.body.name,
        age: req.body.age,
        breed: req.body.breed,
        createdAt: new Date().toISOString(),
        description: req.body.description,
        available: true,
    }
    db
        .collection('pets')
        .add(newPetItem)
        .then((doc) => {
            const responsePetItem = newPetItem;
            responsePetItem.id = doc.id;
            return res.json(responsePetItem);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: 'Something went wrong' });
        });
};


// Delete pet

exports.deletePet = (req, res) => {
    const document = db.doc(`/pets/${req.params.petId}`);
    document
        .get()
        .then((doc) => {
            if (!doc.exists) {
                return res.status(404).json({ error: 'Pet not found' })
            }
            return document.delete();
        })
        .then(() => {
            res.json({ message: 'Delete successfull' });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: err.code });
        });
};

// Edit Pet
exports.editPet = (req, res) => {
    if (req.body.todoId || req.body.createdAt) {
        res.status(403).json({ message: 'Not allowed to edit' });
    }
    let document = db.collection('pets').doc(`${req.params.petId}`);
    document.update(req.body)
        .then(() => {
            res.json({ message: 'Updated successfully' })
        })
        .catch((err) => {
            console.error(err);
            return res.status(500).json({
                error: err.code
            })
        });
};

