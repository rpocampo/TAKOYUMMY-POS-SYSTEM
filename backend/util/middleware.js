const express = require('express')
const { authenticateToken } = require('../controllers/userController')
const { authenticateToken } = require('../controllers/authController')
const router = express.Router()


router.get('/protected', authenticateToken, (req, res) => {
    res.status(200).json({ message: 'Access granted to protected route' });
});

module.exports = router;
