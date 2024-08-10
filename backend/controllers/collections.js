const { Recipe } = require("../models/recipes");
const auth = require("../middleware/auth");
const { User } = require("../models/user");

const getMyCollections = async (req, res) => {
    const { title } = req.query;
    const creator = req.user.id;

    try {
        let recipes;

        if (title) {
            // If title is provided, search for recipes with the matching title created by the logged-in user
            recipes = await Recipe.find({ title: new RegExp(title, "i"), creator }).populate("creator");
        } else {
            // If no title is provided, fetch all recipes created by the logged-in user
            recipes = await Recipe.find({ creator }).populate("creator");
        }

        res.status(200).send(recipes);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { getMyCollections };