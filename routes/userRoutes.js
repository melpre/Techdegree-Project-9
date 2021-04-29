'use strict';

const express = require('express');
const { asyncHandler } = require('../middleware/async-handler'); //import async-handler middleware
const { authenticateUser } = require('../middleware/auth-user'); // import authentication middleware

// import User model via index.js in models folder and access its property
const { User } = require('../models');

// construct a router instance
const router = express.Router();


/* USERS ROUTES */
// route that returns authenticated User
router.get('/users', authenticateUser, asyncHandler(async (req, res) => {
    const user = req.currentUser;

    res.json({ 
        email: user.emailAddress,
        firstName: user.firstName,
        lastName: user.lastName 
    }).status(200);
}));

// route that creates new User
router.post('/users', asyncHandler(async (req, res) => {
    try {
        // store new user in database
        await User.create(req.body); //use sequelize create method
        // set status to 201 Created and end response
        res.status(201).end();
    } catch (error) {
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            const errors = error.errors.map(err => err.message);
            res.status(400).json({ errors });
        } else {
            throw error;
        }
    }
}));

module.exports = router;