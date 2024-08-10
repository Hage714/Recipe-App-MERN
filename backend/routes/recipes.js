const express = require('express');
const { getRecipes, getRecipeById, createRecipe, updateRecipe, deleteRecipe } = require('../controllers/recipes');
const { verifyUser } = require('../middleware/auth');
const router = express.Router(); 


router.get('/', getRecipes);
router.get('/:id', getRecipeById);
router.put('/:id', updateRecipe);
router.delete('/:id', deleteRecipe);

module.exports = router;