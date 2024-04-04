const express = require('express');

const User  = require('../models/User.js')
const { getUser, updateUser, deleteUser} = require('../controllers/users.js');


const router = express.Router()

/* Read */

router.get('/:id', getUser);

/* Update */

router.patch('/:id', updateUser);

/* Delete */

router.delete('/:id', deleteUser);

module.exports = router;