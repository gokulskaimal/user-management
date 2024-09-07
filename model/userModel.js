const mongoose = require('mongoose'); // Import the Mongoose library for working with MongoDB

// Define the schema for the "User" model
const userSchema = new mongoose.Schema({
    // Define the email field
    email: {
        type: String, // The type is String
        required: true, // Email is a required field
        unique: true, // Ensures each email is unique across all documents in the collection
    },
    // Define the password field
    password: {
        type: String, // The type is String
        required: true, // Password is a required field
    }
});

// Export the User model, based on the userSchema
module.exports = mongoose.model('User', userSchema);
