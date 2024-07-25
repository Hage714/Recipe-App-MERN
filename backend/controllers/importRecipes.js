const ImportRecipes = require('../models/importRecipes');
const axios = require('axios');

const searchRecipes = async (req, res) => {
    const { name } = req.query;
    const tastyApiKey = process.env.TASTY_API_KEY;

    try {
        const response = await axios.get(`https://tasty.p.rapidapi.com/recipes/list?query=${name}`, {
            headers: {
                'x-rapidapi-key': tastyApiKey,
                'x-rapidapi-host': 'tasty.p.rapidapi.com',
            },
        });

        const recipes = response.data.results;
        res.status(200).json({ results: recipes });
    } catch (error) {
        res.status(500).json({ message: 'Failed to search recipes', error: error.message });
    }
};

const importRecipe = async (req, res) => {
    const { id } = req.body;
    const tastyApiKey = process.env.TASTY_API_KEY;

    try {
        const response = await axios.get(`https://tasty.p.rapidapi.com/recipes/get-more-info?id=${id}`, {
            headers: {
                'x-rapidapi-key': tastyApiKey,
                'x-rapidapi-host': 'tasty.p.rapidapi.com',
            },
        });

        const { name, sections, instructions } = response.data;

        const ingredients = sections.flatMap(section => section.components.map(component => component.raw_text));
        const instructionsText = instructions.map(instruction => instruction.display_text);

        const newRecipe = new Recipe({
            title: name,
            ingredients,
            instructions: instructionsText,
        });

        await newRecipe.save();
        res.status(201).json(newRecipe);
    } catch (error) {
        res.status(500).json({ message: 'Failed to import recipe', error: error.message });
    }
};

module.exports = { searchRecipes, importRecipe };