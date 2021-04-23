'use strict';

const express = require('express');
const { asyncHandler } = require('../middleware/async-handler'); //import async-handler middleware function
const { authenticateUser } = require('../middleware/auth-user'); // import authentication middleware
const bcrypt = require('bcrypt'); //need this to hash passwords

// construct a router instance
const router = express.Router();
// import Course model via index.js in models folder and access its property
const { Course } = require('../models');
const user = require('../models/user');


/* COURSES ROUTES*/
// route returns list of Courses and User that owns each Course
router.get('/courses', asyncHandler(async (req, res) => {
    const courses = await Course.findAll({ // how to retrieve current User's associated Courses?
        include: [
            {
                model: User,
            }
        ],
    });
    res.json({ courses }).status(200);
}));

// route returns corresponding Course and User that owns Course
router.get('/courses/:id', asyncHandler(async (req, res) => {
    res.json().status(200);
}));

// route creates new Course
router.post('/courses', authenticateUser, asyncHandler(async (req, res) => {
    // get created course from request body 
    const newCourse = req.body;
    // set the Location header to the URI for the newly created course
    res.set('Location', '/courses/:id');
    // set status 201 Created and end response
    return res.status(201).end();
}));

// route updates corresponding Course
router.put('/courses/:id', authenticateUser, asyncHandler(async (req, res) => {
    // update response and return in json

    // set status 204 and return no content

}));

// route deletes corresponding Course
router.delete('/courses/:id', authenticateUser, asyncHandler(async (req, res) => {
    // delete response

    // set status 204 and return no content

}));

module.exports = router;

