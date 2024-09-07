const User = require('../model/userModel'); // Import the User model for interacting with the users collection
const bcrypt = require('bcrypt'); // Import bcrypt for hashing passwords

const saltRounds = 10; // Number of salt rounds for hashing passwords

// Function to handle user registration
const registerUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Ensure email is not null or empty
        if (!email) {
            return res.status(400).render('user/register', { message: 'Email is required' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.render('user/register', { message: 'User already exists' });
        }

        // Create and save new user
        const hashedPassword = await bcrypt.hash(password, saltRounds); // Hash the password
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save(); // Save the new user to the database

        // Redirect to login page after successful registration
        return res.render('user/login', { message: 'User registered successfully' });
    } catch (error) {
        console.error(error); // Log any errors that occur
        return res.status(500).render('user/register', { message: 'Registration failed. Please try again.' });
    }
};

// Function to handle user login
const login = async (req, res) => {
    try {
        const { email, password } = req.body; // Extract email and password from request body

        const user = await User.findOne({ email }); // Find the user by email

        // Check if user exists
        if (!user) {
            return res.render('user/login', { message: 'User not found' });
        }

        // Check if password is correct
        const isMatch = await bcrypt.compare(password, user.password); // Compare the provided password with the hashed password

        if (!isMatch) {
            return res.render('user/login', { message: 'Incorrect password' });
        }

        // Set session to indicate user is logged in
        req.session.user = true;

        // Redirect to home page after successful login
        return res.render('user/home');
    } catch (error) {
        console.error(error); // Log any errors that occur
        return res.status(500).render('user/login', { message: 'Login failed. Please try again.' });
    }
};

// Function to render the home page
const loadHome = async (req, res) => {
    try {
        res.render('user/home'); // Render the home page
    } catch (error) {
        console.error(error); // Log any errors that occur
        return res.status(500).render('user/home', { message: 'Error loading home page. Please try again.' });
    }
};

// Function to render the login page
const loadLogin = async (req, res) => {
    try {
        res.render('user/login'); // Render the login page
    } catch (error) {
        console.error(error); // Log any errors that occur
        return res.status(500).render('user/login', { message: 'Error loading login page. Please try again.' });
    }
};

// Function to handle user logout
const logout = async (req, res) => {
    try {
        req.session.user = null; // Clear the session user
        res.redirect('/user/login'); // Redirect to login page
    } catch (error) {
        console.error(error); // Log any errors that occur
        return res.status(500).render('user/login', { message: 'Logout failed. Please try again.' });
    }
};

// Function to render the registration page
const loadRegister = async (req, res) => {
    try {
        res.render('user/register'); // Render the registration page
    } catch (error) {
        console.error(error); // Log any errors that occur
        return res.status(500).render('user/register', { message: 'Error loading registration page. Please try again.' });
    }
};

// Export the functions for use in other parts of the application
module.exports = { registerUser, loadLogin, loadRegister, login, loadHome, logout };
