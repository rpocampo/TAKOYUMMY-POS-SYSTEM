const express = require('express')
const {
    createUser,
    getUsers,
    getUser,
    deleteUser,
    updateUser
} = require('../controllers/userController')



const user = express.Router()

//get all users
user.get('/all', getUsers)



//get a user
user.get('/:id', getUser)



//post a new user
user.post('/new', createUser)



//delete a user
user.delete('/:id', deleteUser)




//update a user
user.patch('/:id', updateUser)




module.exports = user