const jwt = require('jsonwebtoken');
const express = require('express');
const bcrypt = require('bcrypt');
const validator = require('validator'); // Import the validator package
const User = require('../models/User');

const createToken = (_id) => {
    return jwt.sign({_id }, process.env.JWT_SECRET, { expiresIn: '3d' });
}

/* register */

const registerUser = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    // Validate email
    if (!validator.isEmail(email)) {
        return res.status(400).json({ error: 'Invalid email' });
    }

    // Validate password
    if (!validator.isStrongPassword(password)) {
        return res.status(400).json({ error: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one symbol' });
    }

    try {
        const user = await User.register(firstName, lastName, email, password);

        const token = createToken(user._id);

        res.status(201).json({user, token}); 

    } catch (error) { 
        res.status(400).json({ error: error.message });
    }
};


/* lOGIN */

const logUser = async (req, res) => {
    const { email, password } = req.body;

    // Validate email
    if (!validator.isEmail(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }

    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);

        res.status(200).json({ email, token });
    }  catch (error) { 
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    registerUser,
    logUser
}
