exports.getAllPets = (req, res) => {
    pets = [
        {
            'id': '1',
            'name': 'Taco',
            'age': '3',
            'description': 'A wonderful Corgo',
            'breed': 'corgi'
        },
        {
            'id': '2',
            'name': 'KiKi',
            'age': '1',
            'description': 'A fluffy Husky',
            'breed': 'Husky'
        }
    ]
    return res.json(pets);
}