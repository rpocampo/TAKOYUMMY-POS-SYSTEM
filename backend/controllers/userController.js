const account = require('../models/userModel')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRET_KEY = 'your_secret_key'


//get all users
const getUsers = async (req, res) => {
    const users = await account.find({}).sort({createdAt: -1})
    res.status(200).json(users)
}


// get a user
const getUser = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'No User Found'})
    }

    const user = await account.findById(id)

    if (!user) {
        return res.status(400).json({error: 'Cannot find User'})
    }
    
    res.status(200).json(user)
}


//create a user
const createUser = async (req, res) => {
    const { username, password } = req.body;

    // Check if both username and password are provided
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    try {
        // Normalize username
        const normalizedUsername = username.trim().toLowerCase();

        // Check if the username already exists
        const existingUser = await account.findOne({ username: normalizedUsername });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(`Hashed password for ${normalizedUsername}: ${hashedPassword}`);

        // Create and save the new user
        const user = await account.create({
            username: normalizedUsername,
            password: hashedPassword,
        });

        console.log('User created:', user);
        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        console.error('Error creating user:', error.message || error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



//delete a user
const deleteUser = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'No User Found'})
    }

    const user = await account.findOneAndDelete({_id: id})

    if (!user) {
        return res.status(400).json({error: 'Cannot find User'})
    }
    res.status(200).json(user)
}


//update user
const updateUser = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'No User Found'})
    }

    const user = await account.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!user) {
        return res.status(400).json({error: 'Cannot find User'})
    }
    res.status(200).json(user)
}

// Login a user
const loginUser = async (req, res) => {
    const { username, password } = req.body;

    // Check if both username and password are provided
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    try {
        // Normalize username
        const normalizedUsername = username.trim().toLowerCase()

        // Find user in the database
        const user = await account.findOne({ username: normalizedUsername });
        if (!user) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' });

        // Respond with success message and token
        res.status(200).json({
            message: 'Login successful',
            token,
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}



module.exports = {
    createUser,
    getUsers,
    getUser,
    deleteUser,
    updateUser,
    loginUser
}