const mongoose = require("mongoose"); // Import the Mongoose library for working with MongoDB

// Function to connect to the MongoDB database
const connectDB = async () => {
    try {
        // Attempt to connect to MongoDB using Mongoose
        const conn = await mongoose.connect("mongodb://localhost:27017", {});
        // Log a message if the connection is successful
        console.log(`MongoDB is connected`);
    } catch (err) {
        // Log any errors that occur during the connection attempt
        console.log(err);
        // Exit the process with a failure code if an error occurs
        process.exit(1);
    }
};

// Export the connectDB function to be used in other parts of the application
module.exports = connectDB;
