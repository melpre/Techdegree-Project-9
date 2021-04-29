'use strict';

// import npm library for basic authentication
const auth = require('basic-auth');
// import bcrypt module
const bcrypt = require('bcryptjs');
// import User model via index.js in models folder and access its property
const { User } = require('../models');


exports.authenticateUser = async (req, res, next) => {
    let message; // store the message to display
    let user;

    // Parse the user's credentials from the Authorization header.
    const credentials = auth(req);

    // If the user's credentials are available...
    if (credentials) {
        // Attempt to retrieve the user from the data store
        // by their username (i.e. the user's "key"
        // from the Authorization header).
        user = await User.findOne({ where: {emailAddress: credentials.name} });

        // If a user was successfully retrieved from the data store...
        // Use the bcrypt npm package to compare the user's password
        // (from the Authorization header) to the user's password
        // that was retrieved from the data store.
        if (user) {
            const authenticated = bcrypt.compareSync(credentials.pass, user.password)
            // If the passwords match...
            if (authenticated) {
                console.log(`Authentication successful for user: ${user.emailAddress}`);
                // Store the retrieved user object on the request object
                // so any middleware functions that follow this middleware function
                // will have access to the user's information.
                req.currentUser = user;
            } else {
                message = `Authentication failure for user: ${credentials.name}`;
            }
        } else {
            message = `User not found for: ${credentials.name}`;
        }
    } else {
        message = 'Auth header not found';
    }

    // If user authentication failed...
    if (message) {
        console.warn(message);
        // Return a response with a 401 Unauthorized HTTP status code.
        // res.status(401).json({ message: 'Access denied' });
        // Extra credit: return 403 HTTP status code
        res.status(403);
    } else {
        // Or if user authentication succeeded...
        next ();
    }
};