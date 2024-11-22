require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const account = require('./models/userModel'); // Path to your model file

const app = express();

// Middleware
app.use(express.json());

// Database connection
mongoose.connect('mongodb://localhost:27017/yourDatabaseName', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');

    // Ensure the unique index for the account model is created
    account.init().catch((error) => {
        console.error('Error initializing account model:', error.message);
    });
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
});

// Routes
const userRoutes = require('./routes/users'); // Example route file
app.use('/api/users', userRoutes);

// Start the server
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});