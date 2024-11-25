const jwt = require('jsonwebtoken')
const SECRET_KEY = 'your_secret_key'
const account = require('../models/userModel')
const bcrypt = require('bcrypt')


// Login a user
const loginUser = async (req, res) => {
    const { username, password } = req.body;


    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    try {
        const user = await account.findOne({ username: username.toLowerCase() });
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}



const logoutUser = (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
        blacklistedTokens.add(token); // Add token to blacklist
        res.status(200).json({ message: 'Logged out successfully' });
    } else {
        res.status(400).json({ error: 'No token provided' });
    }
};



// Middleware to validate token and check blacklist
const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Access denied, token missing' });
    }

    if (blacklistedTokens.has(token)) {
        return res.status(401).json({ error: 'Invalid token' });
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid or expired token' });
        req.user = user;
        next();
    });
};

module.exports = {
    loginUser,
    logoutUser,
    authenticateToken
}