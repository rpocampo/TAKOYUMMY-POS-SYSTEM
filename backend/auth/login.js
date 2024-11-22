const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const account = require('../models/userModel')

const loginUser = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' })
    }

    try {
        // Check if the username exists in the database
        const user = await account.findOne({ username })
        if (!user) {
            return res.status(400).json({ error: 'User not found' })
        }

        // Compare the password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' })
        }

        // Create a JWT token
        const token = jwt.sign(
            { userId: user._id, username: user.username },
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );

        // Return the token to the client
        res.status(200).json({
            message: 'Login successful',
            token,
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error: ' + error.message })
    }
}


module.exports = loginUser;
