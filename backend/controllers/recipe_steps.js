const { Recipe, RecipeSteps } = require("../models/recipes")

const recipeSteps = async (req, res) => {
    const { id } = req.params

    try {
const recipe = await Recipe.findOne({ "_id": id })
if (!recipe) return res.status(404).send({ error: "Recipe not found" });

const recipeSteps = await RecipeSteps.find({recipe: recipe._id})
res.send(recipeSteps).status(200)

    } catch (error) {
        console.log(error)
        return res.status(500).send({ error: error.message });
    }
}

const createRecipeSteps = async(req, res) => {
const { recipe, name } = req.body

if (!recipe || !name) return res.status(400).send({ error: "Please fill all the fields" });

try {
    const recipe = await Recipe.findOne({ "_id": id })  //confirm if the recipe exists
    if (!recipe) return res.status(404).send({ error: "Recipe not found" });

    const recipeStep = await RecipeSteps.create({
        recipe: recipe._id,
        name: name
    });
    if (!recipeStep) return res.status(400).send({ error: "Recipe could not be created" });
    res.send(recipeStep).status(201);
    
} catch (error) {
    console.log(error)
    return res.status(500).send({ error: error.message });
}
}

module.exports = { recipeSteps, createRecipeSteps };