'use strict';

const express = require('express');
const { asyncHandler } = require('./middleware/async-handler'); //import async-handler middleware function
const bcrypt = require('bcrypt'); //need this to hash passwords

// construct a router instance
const router = express.Router();
// import User model via index.js in models folder and access its property
const { User } = require('../models');


/* USERS ROUTES */
// route that returns authenticated User
router.get('/users', asyncHandler(async (req, res) => {
    res.json().status(200);
}));

// route that creates new User
router.post('/users', asyncHandler(async (req, res) => {
    // store new user in database
    const user = await User.create(req.body); //use sequelize create method 
    // set status to 201 Created and end response
    return res.status(201).end();
}));

module.exports = router;