const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const account = require('../models/userModel');
const SECRET_KEY = 'your_secret_key';

// Login a user and store token in cookie
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

        res.cookie('auth_token', token, {
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600000, 
        });

        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Logout user by clearing the cookie
const logoutUser = (req, res) => {
    res.clearCookie('auth_token');
    res.status(200).json({ message: 'Logged out successfully' });
};

// Middleware to validate token from cookies
const authenticateToken = (req, res, next) => {
    const token = req.cookies.auth_token;

    if (!token) {
        return res.status(401).json({ error: 'Access denied, token missing' });
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid or expired token' });
        }
        req.user = user;
        next();
    });
};

module.exports = {
    loginUser,
    logoutUser,
    authenticateToken,
};
