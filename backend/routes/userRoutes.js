const express = require('express');
const { signup, getUserDetailsByEmail } = require('../controllers/userController');
const router = express.Router();

router.post('/signup', signup);

router.get('/getUserDetailsByEmail/:email', getUserDetailsByEmail);

module.exports = router;  
