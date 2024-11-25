const express = require('express');
const router = express.Router();

// Example routes
router.get('/', (req, res) => {
    res.send('Welcome to the Ingredient Routes');
});

router.post('/add', (req, res) => {
    res.send('Add ingredient route');
});

router.delete('/delete/:id', (req, res) => {
    res.send(`Delete ingredient with ID: ${req.params.id}`);
});

module.exports = router;
