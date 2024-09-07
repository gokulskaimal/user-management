const express = require('express'); // Import the Express framework
const router = express.Router(); // Create an Express Router instance
const userController = require('../controller/userController'); // Import the user controller for handling user-related logic
const auth = require('../middleware/auth'); // Import the authentication middleware

// Route to display the login page, only if the user is not already logged in
router.get('/login', auth.isLogin, userController.loadLogin);

// Route to display the registration page, only if the user is not already logged in
router.get("/register", auth.isLogin, userController.loadRegister);

// Route to display the home page, only accessible if the user is logged in (session check)
router.get("/home", auth.checkSession, userController.loadHome);

// Route to handle user login (POST request to submit login form data)
router.post("/login", userController.login);

// Route to handle user registration (POST request to submit registration form data)
router.post("/register", userController.registerUser);

// Route to log the user out (clears session or token)
router.get("/logout", userController.logout);
 
module.exports = router; // Export the router to be used in the main application
