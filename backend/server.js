require('dotenv').config()


const express = require('express');
const mongoose = require('mongoose');
const account = require('./models/userModel'); // Path to your model file

const app = express();

const uri = 'mongodb+srv://Marv:Marv1003_@mern.ohwxw.mongodb.net/Login?retryWrites=true&w=majority';

// Middleware
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        account.init().catch((error) => {
            console.error('Error initializing account model:', error.message);
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error.message);
    })

// Routes
const userRoutes = require('./routes/users'); // Example route file
app.use('/api/users', userRoutes);

// Start the server
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});