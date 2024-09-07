const express = require("express"); // Import the Express framework
const router = express.Router(); // Create an Express Router instance
const adminController = require("../controller/adminController"); // Import the admin controller for handling admin-related logic
const adminAuth = require("../middleware/adminAuth"); // Import the admin authentication middleware

// Route to display the admin login page, only if the admin is not already logged in
router.get("/login", adminAuth.isLogin, adminController.loadLogin);

// Route to handle admin login (POST request to submit login form data)
router.post("/login", adminController.login);

// Route to display the admin home page, accessible only if the admin is logged in (session check)
router.get("/home", adminAuth.checkSession, adminController.loadHome);

// Route to handle editing a user, only accessible if the admin is logged in (session check)
router.post("/edituser", adminAuth.checkSession, adminController.edituser);

// Route to handle deleting a user, identified by their user ID, accessible only if admin is logged in
router.get("/deleteuser/:id", adminAuth.checkSession, adminController.deleteuser);

// Route to handle adding a new user, accessible only if the admin is logged in (session check)
router.post("/adduser", adminAuth.checkSession, adminController.adduser);

// Route to log the admin out, accessible only if the admin is logged in (session check)
router.get("/logout", adminAuth.checkSession, adminController.logout);

module.exports = router; // Export the router to be used in the main application
