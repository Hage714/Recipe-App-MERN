const Comment = require("../models/comments");
const auth = require("../middleware/auth");
const { Recipe } = require("../models/recipes");


const addComment =  async (req, res) => {
    const { comment, rating } = req.body;
    const recipe = await Recipe.findById(req.params.recipeId);

    if (!recipe) {
        return res.status(404).json({ message: 'Recipe not found' });
    }

    const newComment = new Comment({
        recipe: req.params.recipeId,
        comment,
        rating
    });

    await newComment.save();
    await recipe.calculateAverageRating();

    res.status(201).json(newComment);
};

const getComments = async (req, res) => {
    const comments = await Comment.find({  });

    if (!comments) {
        return res.status(404).json({ message: 'No comments found' });
    }

    res.json(comments);
};

module.exports = { addComment, getComments };