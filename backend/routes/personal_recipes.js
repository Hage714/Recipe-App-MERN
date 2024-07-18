const express = require("express");
const { upload } = require('../utils/fileHandler');

const {
  createRecipe, updateRecipe, deleteRecipe} = require("../controllers/recipes");

const router = express.Router();

router.post("/", upload.single("image"), createRecipe);
router.put("/:id", updateRecipe);
router.delete("/:id", deleteRecipe);

module.exports = router;
