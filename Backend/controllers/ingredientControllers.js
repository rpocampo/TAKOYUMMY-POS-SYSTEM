const Ingredient = require('../models/ingredients');


// Get all ingredients
exports.getIngredients = async (req, res) => {
  try {
    const ingredients = await Ingredient.find();
    res.json(ingredients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update stock (add or subtract)
exports.updateStock = async (req, res) => {
  try {
    const { operation, quantity } = req.body;
    const ingredient = await Ingredient.findById(req.params.id);

    if (operation === 'add') {
      ingredient.quantity += quantity;
    } else if (operation === 'subtract') {
      ingredient.quantity -= quantity;
    }

    ingredient.status = ingredient.quantity > 0 ? 'In-stock' : 'Out of stock';
    await ingredient.save();

    res.json(ingredient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get low-stock ingredients
exports.getLowStock = async (req, res) => {
  try {
    const lowStockIngredients = await Ingredient.find({ quantity: { $lte: 5 } });
    res.json(lowStockIngredients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};