const mongoose = require('mongoose');
const connectionString = "mongodb://localhost:27017/recipedb";
const newConnectionString = "mongodb+srv://hagewoche99:Hage1234@cluster0.vlcxe5t.mongodb.net/recipedb?retryWrites=true&w=majority&appName=Cluster0"

const connectDatabase = async () => {
    await mongoose
        .connect(connectionString)
        .then(() => console.log('Database connected successfully'))
        .catch(error => console.log('Failed to connect to MongoDB'))
}


module.exports = { connectDatabase }