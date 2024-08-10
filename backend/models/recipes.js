const mongoose = require('mongoose'); 

const RecipeSchema = new mongoose.Schema({
    title: String,
    image: String,
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    ingredients: Array,
    steps: Array,
    category: String,
    averageRating: { 
        type: Number,
         default: 0
         },
createdAt: {
        type: Date,
        default: Date.now
    }
});

//method to calculate the average rating
RecipeSchema.methods.calculateAverageRating = async function () {
    const Comment = mongoose.model('Comment');
    const comments = await Comment.find({ recipe: this._id });

    if (comments.length === 0) {
        this.averageRating = 0;
    } else {
        // Calculate the total rating and the average rating
        const totalRating = comments.reduce((sum, comment) => sum + comment.rating, 0);
        this.averageRating = totalRating / comments.length;
    }

    await this.save();
};




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