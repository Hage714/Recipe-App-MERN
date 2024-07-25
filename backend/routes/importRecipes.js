const express = require('express');
const { searchRecipes, importRecipe } = require('../controllers/importRecipes');
const router = express.Router();

router.get('/', searchRecipes);
router.post('/', importRecipe);

module.exports = router;
