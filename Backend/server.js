require('dotenv').config();  // Load environment variables

const express = require('express');
const mongoose = require('mongoose');
const ingredientRoutes = require('./routes/ingredientRoutes');

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Routes
app.use('/api/ingredients', ingredientRoutes);

// Connect to MongoDB and start the server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server running on http://localhost:${process.env.PORT || 3000}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
