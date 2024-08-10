import React, { useState } from 'react';

const RecipeForm = () => {
    const [title, setTitle] = useState('');
    const [ingredient, setIngredient] = useState('');
    const [ingredients, setIngredients] = useState([]);

    const handleAddIngredient = () => {
        if (ingredient.trim()) {
            setIngredients([...ingredients, ingredient.trim()]);
            setIngredient('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const recipe = {
            title,
            ingredients
        };

        try {
            const response = await fetch('/recipes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(recipe),
            });

            const data = await response.json();
            console.log(data);
            alert('Recipe submitted successfully!');
            setTitle('');
            setIngredients([]);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h1>Submit a Recipe</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Recipe Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="ingredient">Ingredient</label>
                    <input
                        type="text"
                        className="form-control"
                        id="ingredient"
                        value={ingredient}
                        onChange={(e) => setIngredient(e.target.value)}
                    />
                    <button
                        type="button"
                        className="btn btn-primary mt-2"
                        onClick={handleAddIngredient}
                    >
                        Add Ingredient
                    </button>
                </div>

                <ul className="list-group mt-3">
                    {ingredients.map((ing, index) => (
                        <li key={index} className="list-group-item">
                            {ing}
                        </li>
                    ))}
                </ul>

                <button type="submit" className="btn btn-success mt-3">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default RecipeForm;