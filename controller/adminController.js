const adminModel = require('../model/adminModel'); // Import the Admin model for interacting with the admin collection
const userModel = require('../model/userModel'); // Import the User model for interacting with the users collection
const bcrypt = require('bcrypt'); // Import bcrypt for hashing passwords

const saltRounds = 10; // Number of salt rounds for hashing passwords

// Function to render the admin login page
const loadLogin = async (req, res) => {
    try {
        return res.render('admin/login'); // Render the login page
    } catch (error) {
        console.error(error); // Log any errors that occur
        return res.status(500).send('Internal server error'); // Send a 500 status code with an error message
    }
};

// Function to handle admin login
const login = async (req, res) => {
    try {
        const { email, password } = req.body; // Extract email and password from request body

        // Check if admin exists
        const admin = await adminModel.findOne({ email });
        if (!admin) {
            return res.render('admin/login', { message: 'Invalid Credentials' }); // Render login page with an error message
        }

        // Check if password is correct
        const isMatch = await bcrypt.compare(password, admin.password); // Compare provided password with hashed password
        if (!isMatch) {
            return res.render('admin/login', { message: 'Password incorrect' }); // Render login page with an error message
        }

        req.session.admin = true; // Set session to indicate admin is logged in
        return res.redirect('/admin/home'); // Redirect to home page after successful login
    } catch (error) {
        console.error(error); // Log any errors that occur
        return res.status(500).send('Internal server error'); // Send a 500 status code with an error message
    }
};

// Function to render the admin home page and list all users
const loadHome = async (req, res) => {
    try {
        // Check if admin is logged in
        const admin = req.session.admin;
        if (!admin) {
            return res.redirect('/admin/login'); // Redirect to login page if not logged in
        }

        // Fetch all users
        const users = await userModel.find({});
        return res.render('admin/home', { users }); // Render the home page with the list of users
    } catch (error) {
        console.error(error); // Log any errors that occur
        return res.status(500).send('Internal server error'); // Send a 500 status code with an error message
    }
};

// Function to handle user editing
const edituser = async (req, res) => {
    try {
        const { email, password, id } = req.body; // Extract email, password, and user ID from request body

        // Ensure that password is provided before hashing
        if (!password) {
            return res.status(400).send('Password is required'); // Send a 400 status code if password is missing
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Update user information
        const user = await userModel.findOneAndUpdate(
            { _id: id },
            { email: email, password: hashedPassword }, // Update email and hashed password
            { new: true } // Option to return the updated document
        );

        // Check if user was found and updated
        if (!user) {
            return res.status(404).send('User not found'); // Send a 404 status code if user was not found
        }

        // Fetch all users to update the user list
        const allusers = await userModel.find({});
        return res.render('admin/home', { users: allusers }); // Render home page with updated user list
    } catch (error) {
        console.error(error); // Log any errors that occur
        return res.status(500).send('Internal server error'); // Send a 500 status code with an error message
    }
};

// Function to handle user deletion
const deleteuser = async (req, res) => {
    try {
        const { id } = req.params; // Extract user ID from route parameters

        // Delete the user by ID
        const user = await userModel.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).send('User not found'); // Send a 404 status code if user was not found
        }

        // Fetch all users to update the user list
        const allusers = await userModel.find({});
        return res.render('admin/home', { users: allusers }); // Render home page with updated user list
    } catch (error) {
        console.error(error); // Log any errors that occur
        return res.status(500).send('Internal server error'); // Send a 500 status code with an error message
    }
};

// Function to handle adding a new user
const adduser = async (req, res) => {
    try {
        const { email, password } = req.body; // Extract email and password from request body

        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        
        // Create and save the new user
        const newUser = new userModel({ email, password: hashedPassword });
        await newUser.save();

        // Fetch all users to update the user list
        const allusers = await userModel.find({});
        return res.render('admin/home', { users: allusers }); // Render home page with updated user list
    } catch (error) {
        console.error(error); // Log any errors that occur
        return res.status(500).send('Internal server error'); // Send a 500 status code with an error message
    }
};

// Function to handle admin logout
const logout = async (req, res) => {
    try {
        req.session.admin = null; // Clear the session admin
        return res.redirect('/admin/login'); // Redirect to login page
    } catch (error) {
        console.error(error); // Log any errors that occur
        return res.status(500).send('Internal server error'); // Send a 500 status code with an error message
    }
};

// Function to handle user search
const searchuser = async (req, res) => {
    try {
        const { search } = req.body; // Extract search term from request body

        // Find users whose email matches the search term
        const users = await userModel.find({ email: { $regex: search, $options: 'i' } });
        return res.render('admin/home', { users }); // Render home page with search results
    } catch (error) {
        console.error(error); // Log any errors that occur
        return res.status(500).send('Internal server error'); // Send a 500 status code with an error message
    }
};

// Export the functions for use in other parts of the application
module.exports = { loadLogin, login, loadHome, edituser, deleteuser, adduser, logout, searchuser };
