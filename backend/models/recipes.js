const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    title: String,
    image: String,
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    ingredients: Array,
    createdAt: {
        type: Date,
        default: Date.now
    }
});


const RecipeStepsSchema = new mongoose.Schema({
    recipe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe'
    },
    name: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Recipe = mongoose.model('Recipe', RecipeSchema);
const RecipeSteps = mongoose.model('RecipeSteps', RecipeStepsSchema);

module.exports = { Recipe, RecipeSteps };