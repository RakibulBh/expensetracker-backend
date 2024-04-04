const jwt = require('jsonwebtoken');
const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const createToken = (_id) => {

    return jwt.sign({_id }, process.env.JWT_SECRET, { expiresIn: '3d' });

}

/* register */

const registerUser = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        const user = await User.register(firstName, lastName, email, password);

        const token = createToken(user._id);

        res.status(201).json({user, token}); 

    } catch (error) { 
        res.status(400).json({ message: error.message });
    }
};


/* lOGIN */

const logUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);

        res.status(200).json({ email, token });
    }  catch (error) { 
        res.status(400).json({ message: error.message });
    }
};


module.exports = {
    registerUser,
    logUser
}

