'use strict';

const express = require('express');
const { asyncHandler } = require('../middleware/async-handler'); //import async-handler middleware function
const { authenticateUser } = require('../middleware/auth-user'); // import authentication middleware

// import Course model via index.js in models folder and access its property
const { Course } = require('../models');
// import User model via index.js in models folder and access its property
const { User } = require('../models');

// construct a router instance
const router = express.Router();


/* COURSES ROUTES*/
// route returns list of Courses and User that owns each Course
router.get('/courses', asyncHandler(async (req, res) => {
    const courses = await Course.findAll({ // how to retrieve current User's associated Courses?
        include: [
            {
                model: User,
                as: 'instructor',
            }
        ],
    });
    // log courses and users with associations
    console.log(courses.map(course => course.get({ plain: true })));
    res.json({ courses }).status(200);
}));

// route returns corresponding Course and User that owns Course
router.get('/courses/:id', asyncHandler(async (req, res) => {
    const course = await Course.findOne({ where: {id: req.params.id }});
    // log corresponding course
    console.log(course);
    res.json({ course }).status(200);
}));

// route creates new Course
router.post('/courses', asyncHandler(async (req, res) => {
    // get created course from request body 
    const newCourse = await Course.create({ 
        title: req.body.title,
        description: req.body.description,
        userId: req.body.userId,
    });
    // log new course
    console.log(newCourse);
    // set the Location header to the URI for the newly created course
    res.set('Location', '/courses/:id');
    // set status 201 Created and end response
    return res.status(201).end();
}));

// route updates corresponding Course
router.put('/courses/:id', asyncHandler(async (req, res) => {
    // update response and return in json
    const updateCourse = await Course.findOne({ where: { id: req.params.id }}).save(
        {
            title: req.body.title,
            description: req.body.description,
            userId: req.body.userId,
        }
    );
    // log updated course
    console.log(updateCourse);
    // set status 204 and return no content
    return res.status(204).end();
}));

// route deletes corresponding Course
router.delete('/courses/:id', authenticateUser, asyncHandler(async (req, res) => {
    // delete response
    const deleteCourse = await Course.findOne({ where: { id: req.params.id }});
    await deleteCourse.destroy();
    // log deleted course
    console.log(`${deleteCourse} has been deleted`);
    // set status 204 and return no content
    return res.status(204).end();
}));

module.exports = router;

