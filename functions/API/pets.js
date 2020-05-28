const { db } = require('../util/admin');

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
            return res.statue(500).json({ error: err.code });
        });
};