const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  low_stock_limit: { type: Number, required: true },
  status: { type: String, required: true },
});

module.exports = mongoose.model('Ingredient', ingredientSchema);
