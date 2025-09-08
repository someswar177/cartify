// routes/auth.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateToken } = require('../middleware/token');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/me', validateToken, authController.getUser);

module.exports = router;
