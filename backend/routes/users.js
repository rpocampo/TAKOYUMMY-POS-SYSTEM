const express = require('express')
const {
    createUser,
    getUsers,
    getUser
} = require('../controllers/userController')



const user = express.Router()

//get all users
user.get('/', getUsers)



//get a user
user.get('/:id', getUser)



//post a new user
user.post('/', createUser)



//delete a user
user.delete('/:id', (req, res) => {
    res.json({mssg: 'Delete a user'})
})




//update a user
user.patch('/:id', (req, res) => {
    res.json({mssg: 'Update a user'})
})




module.exports = user