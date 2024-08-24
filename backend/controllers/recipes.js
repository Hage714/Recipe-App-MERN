const { Recipe } = require("../models/recipes");
const auth = require("../middleware/auth");

const getRecipes = async (req, res) => {
  const { title } = req.query;

  try {
    let recipes;

    if (title) {
      // If title is provided, search for recipes with the matching title created by the logged-in user
      recipes = await Recipe.find({ title: new RegExp(title, "i") }).populate("creator");
    } else {
      // If no title is provided, fetch all recipes created by the logged-in user
      recipes = await Recipe.find({ }).populate("creator");
    }

    res.status(200).send(recipes);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const createRecipe = async (req, res) => {
  const { title, ingredients, steps, category, type } = req.body;
//console.log(req.body);

  if (!title || !ingredients || !steps || !category)
    return res.status(400).send({ error: "Please fill all the fields" });

  try {
    const recipeSteps = steps.split(',').map(item => item.trim());

    const recipe = await Recipe.create({
      title: title,
      creator: req.user.id,
      ingredients: ingredients,
      steps: recipeSteps,
      category: category,
      type: type,
      image: req.file.filename,
    });
    if (!recipe)
      return res.status(400).send({ error: "Failed to create recipe" });
    
    console.log({
      title: title,
      creator: req.user.id,
      ingredients: ingredients,
      steps: steps,
      category: category,
      type: type,
      image: req.file.filename,
    })
    res.send(recipe).status(201);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: error.message });
  }
};

const getRecipeById = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const recipe = await Recipe.findById({ _id: id });
    if (!recipe) return res.status(404).send({ error: "Recipe not found" });
    res.send(recipe).status(200);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: error.message });
  }
};

const updateRecipe = async (req, res) => {
  const { id } = req.params;
  const { title, ingredients } = req.body;
console.log(req.body);
  if (!title || !ingredients)
    return res.status(400).send({ error: "Please fill all the fields" });

  try {
    const items = ingredients.split(',').map(item => item.trim());
    console.log(items)
    const recipe = await Recipe.findByIdAndUpdate(
      id,
      { title, ingredients: items },
      { new: true }
    );
  
    if (!recipe) return res.status(404).send({ error: "Recipe not found" });

    res.status(200).send({ message: "Recipe updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
};

const deleteRecipe = async (req, res) => {
  const { id } = req.params;

  try {
    const recipe = await Recipe.findByIdAndDelete(id);
    if (!recipe) return res.status(404).send({ error: "Recipe not found" });
    res.status(200).send({ message: "Recipe deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
};

//Implement recipe updating and deleting

module.exports = {
  getRecipes,
  createRecipe,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
};
