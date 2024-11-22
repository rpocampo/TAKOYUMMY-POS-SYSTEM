const express = require('express')
const login = express.Router()
const loginUser = require('../auth/login')

// POST /api/login
login.post('/login', loginUser)

module.exports = login;
