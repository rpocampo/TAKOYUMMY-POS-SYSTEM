const account = require('../models/userModel')
const mongoose = require('mongoose')


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

    // Validate input
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    try {
        // Normalize username to lowercase
        const normalizedUsername = username.toLowerCase();

        // Check if the username already exists
        const existingUser = await account.findOne({ username: normalizedUsername });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        // Create a new user
        const user = await account.create({ username: normalizedUsername, password });
        res.status(201).json(user);
    } catch (error) {
        // Handle errors
        if (error.code === 11000) { // Duplicate key error
            res.status(400).json({ error: 'Username already exists' });
        } else {
            res.status(400).json({ error: error.message });
        }
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


module.exports = {
    createUser,
    getUsers,
    getUser,
    deleteUser,
    updateUser
}