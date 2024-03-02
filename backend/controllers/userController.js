// Models
const User = require('../models/User')



module.exports.createUser = (req, res) => {
    try {

        let newUser = new User({
            email: req.body.email,
            password: req.body.password,
            role: req.body.role,
        });

        console.log(newUser);

        // Save the new user to the database
        newUser.save()
            .then(savedUser => {
                res.status(201).json(savedUser);
            })
            .catch(saveError => {
                console.error('Error saving user to the database:', saveError);
                res.status(500).json({ error: 'Internal Server Error' });
            });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};




module.exports.live = (req, res) => {
    res.send('the server is alive?');
};








    

    