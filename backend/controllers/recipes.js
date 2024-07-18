const { Recipe } = require("../models/recipes");

const getRecipes = async (req, res) => {
  const { title } = req.query;
  let recipes = await Recipe.find({}).populate("creator");

  if (title) {
    //if title is found, update the recipe
    recipes = await Recipe.find({ title: new RegExp(title, "i") });
  }
  res.send(recipes).status(200);
};

const createRecipe = async (req, res) => {
  const { title, ingredients } = req.body;
console.log(req.body);

  if (!title || !ingredients)
    return res.status(400).send({ error: "Please fill all the fields" });

  try {
    const recipe = await Recipe.create({
      title: title,
      creator: req.user.id,
      ingredients: ingredients,
      image: req.file.filename,
    });
    if (!recipe)
      return res.status(400).send({ error: "Failed to create recipe" });
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
