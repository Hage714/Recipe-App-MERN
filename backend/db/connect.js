const mongoose = require('mongoose');
const connectionString = "mongodb://localhost:27017/recipedb";

const connectDatabase = async () => {
    await mongoose
        .connect(connectionString)
        .then(() => console.log('Database connected successfully'))
        .catch(error => console.log('Failed to connect to MongoDB'))
}

module.exports = { connectDatabase }