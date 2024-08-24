const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config(); 

const PORT = process.env.PORT || 5000;
const app = express();  //instance of express

//middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Serve static files from the 'client/build' directory
app.use(express.static(path.join(__dirname, 'public')));

//Database configuration
const { connectDatabase } = require("./db/connect")
connectDatabase();

//Middleware to check if user is authenticated
const { verifyUser } = require("./middleware/auth");

//Routes imports
const authRoutes = require("./routes/auth");
const recipesRoutes = require("./routes/recipes");
const personalRecipesRoutes = require("./routes/personal_recipes");
const contributeRoutes = require("./routes/contribute");
const collectionsRoutes = require("./routes/collections");
const commentsRoutes = require("./routes/comments");
const userRoutes = require("./routes/user");

//Base route(home page of the server)
app.get('/', (req, res) => {
    res.send({ msg: "Welcome to the Express Server!" }).status(200);
});

app.use("/api/v1/auth",authRoutes); 
app.use("/api/v1/recipes", recipesRoutes);
app.use("/api/v1/my-recipes", verifyUser, personalRecipesRoutes); //only authenticated users can access this route
app.use("/api/v1/contribute", verifyUser, contributeRoutes); //only authenticated users can access this route
app.use("/api/v1/collections", verifyUser, collectionsRoutes); //only authenticated users can access this route
app.use("/api/v1/comments", commentsRoutes); 
app.use("/api/v1/user", userRoutes);  //user routes for managing user data

// start the server
app.listen(PORT, () => {
    console.log(`Server running on: http://localhost:${PORT}`)
})