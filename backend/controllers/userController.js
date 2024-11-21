const account = require('../models/userModel')


//get all users
const getUsers = async (req, res) => {
    const users = await account.find({}).sort({createdAt: -1})
    res.status(200).json(users)
}



// get a user
const getUser = async (req, res) => {
    const { id } = req.params

    const user = await account.findById(id)

    if (!user) {
        return res.status(400).json({error: 'Cannot find User'})
    }
    
    res.status(200).json(user)
}


//create a user
const createUser = async (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        // Create user in the database
        const user = await account.create({ email, password });
        res.status(201).json(user);
    } catch (error) {
        // Handle duplicate key error
        if (error.code === 11000) {
            res.status(400).json({ error: 'Email already exists' });
        } else {
            res.status(400).json({ error: error.message });
        }
    }
};


//delete a user


//update user


module.exports = {
    createUser,
    getUsers,
    getUser
}