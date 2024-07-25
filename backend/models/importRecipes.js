const mongoose = require('mongoose');

const ImportRecipesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    ingredients: {
        type: [String],
        required: true,
    },
    instructions: {
        type: [String],
        required: true,
    },
    url: {
        type: String,
        required: true,
        unique: true,
    },
}, {
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('ImportRecipes', ImportRecipesSchema);

