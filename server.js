const express = require("express"); // Import the Express framework
const app = express(); // Initialize an Express application
const path = require("path"); // Import the path module for handling and transforming file paths
const userRoutes = require("./routes/user"); // Import user routes from a separate file
const adminRoutes = require("./routes/admin"); // Import admin routes from a separate file
const connectDB = require("./db/connectDB"); // Import a function to connect to the database
const session = require("express-session"); // Import express-session for session management
const nocache = require("nocache"); // Import nocache to disable client-side caching

// Disable client-side caching
app.use(nocache());

// Configure session middleware
app.use(session({
    query: 'session', // Session identifier
    secret: 'mysecret', // Secret used to sign the session ID cookie
    resave: false, // Don't save the session if it wasn't modified
    saveUninitialized: true, // Save new sessions even if they're not modified
    cookie: { secure: false } // Cookie settings (set to false for development, true for production with HTTPS)
}));

// Set up the view engine
app.set("views", path.join(__dirname, "views")); // Define the views directory
app.set("view engine", "hbs"); // Set Handlebars as the templating/view engine

// Parse URL-encoded bodies (for form data)
app.use(express.urlencoded({ extended: true }));

// Parse JSON bodies (for API requests)
app.use(express.json());

// Serve static files (like CSS, images, JavaScript) from the "public" directory
app.use(express.static("public"));

// Use the user routes for paths starting with "/user"
app.use("/user", userRoutes);

// Use the admin routes for paths starting with "/admin"
app.use("/admin", adminRoutes);

// Connect to the database
connectDB();

// Start the server on port 2255
app.listen(2255, () => {
    console.log("Server running at http://localhost:2255"); // Log the server address 
});
