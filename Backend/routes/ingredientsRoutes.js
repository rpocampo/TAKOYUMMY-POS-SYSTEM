const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Ingredient Schema
const ingredientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    stock: { type: Number, required: true },
  }, { 
    versionKey: false // Disables the `__v` field
  });

const Ingredient = mongoose.model('Ingredient', ingredientSchema);

// Route: Get All Ingredients
router.get('/', async (req, res) => {
  try {
    const ingredients = await Ingredient.find();
    res.json(ingredients); // Send all ingredients as JSON
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route: Add Ingredient
router.post('/add', async (req, res) => {
  try {
    const { name, stock } = req.body;

    // Create a new ingredient document
    const newIngredient = new Ingredient({
      name,
      stock,
    });

    // Save the ingredient to the database
    await newIngredient.save();

    res.json({ message: 'Ingredient added successfully!', ingredient: newIngredient });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route: Delete Ingredient by ID
router.delete('/delete/:id', async (req, res) => {
  try {
    const ingredientId = req.params.id;

    // Delete the ingredient from the database
    await Ingredient.findByIdAndDelete(ingredientId);

    res.json({ message: 'Ingredient deleted successfully!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
