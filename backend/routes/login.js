const express = require('express'); 
const { loginUser, createUser, getUsers } = require('../controllers/userController');
const router = express.Router();

router.post('/login', loginUser);
router.post('/', createUser);
router.get('/', getUsers);

module.exports = router;
