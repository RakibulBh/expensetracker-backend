const express = require('express');

const {registerUser, logUser} = require('../controllers/auth.js');

const router = express.Router()

/* signup*/

router.post('/register', registerUser)

/* login */

router.post('/login', logUser)

module.exports = router;