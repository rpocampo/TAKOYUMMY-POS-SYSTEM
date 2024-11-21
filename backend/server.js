require('dotenv').config()

const mongoose = require('mongoose')
const express = require('express')
const userRoutes = require('./routes/users')

//express app
const app = express()

app.use(express.json())

//middleware
app.use((req, res, next) => {
    console.log(req.path, res.method);
    next();
})

//routes
app.use('/api/users', userRoutes)

//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //listen for requests
        app.listen(process.env.PORT, () => {
        console.log('connected to db & listening on port:', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })