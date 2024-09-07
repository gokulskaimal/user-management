const mongoose = require("mongoose"); // Import the Mongoose library for working with MongoDB

// Define the schema for the "admin" model
const adminSchema = new mongoose.Schema({
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

// Export the Admin model, based on the adminSchema
module.exports = mongoose.model("admin", adminSchema);
