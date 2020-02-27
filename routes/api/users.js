const express = require('express');
const router = express.Router();

// User Model
const User = require('../../models/user');

// @rout    GET api/users
// @desc    Get all users
// @access  Public
router.get('/', (req, res) => {
    User.find()
        .sort({ date: -1})
        .then(users => res.json(users))
});

// @rout    POST api/users
// @desc    Create a user
// @access  Public
router.post('/', (req, res) => {
    const newUser = new User({
        name: req.body.name
    });
    const { name, email, password } = req.body;

    //Simple Validation
    if(!name || !email || !password) {
        return res.status(400).json( "enter all fields" );
    }

    newUser.save().then(user => res.json(user));
});

// @rout    DELETE api/users/:id
// @desc    Delete a user
// @access  Public
router.delete('/:id', (req, res) => {
    user.findById(req.params.id)
        .then(user => user.remove().then(() => res.json({success: true})))     
        .catch(err => res.status(404).json({ success: false}));
});


module.exports = router;