import React, { useState } from "react";

const ImportRecipe = () => {
  const [recipeName, setRecipeName] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/search-recipes?name=${recipeName}`);
      const data = await response.json();
      if (response.ok) {
        setSearchResults(data.results);
      } else {
        alert("Error searching recipes: " + data.message);
      }
    } catch (error) {
      alert("Error searching recipes: " + error.message);
    }
  };

  const handleImport = async (recipe) => {
    try {
      const response = await fetch("/api/import-recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: recipe.id }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Recipe imported successfully");
        setSelectedRecipe(recipe);
      } else {
        alert("Error importing recipe: " + data.message);
      }
    } catch (error) {
      alert("Error importing recipe: " + error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <div>
          <label htmlFor="recipeName">Recipe Name:</label>
          <input
            type="text"
            id="recipeName"
            value={recipeName}
            onChange={(e) => setRecipeName(e.target.value)}
            required
          />
        </div>
        <button type="submit">Import Recipe</button>
      </form>

      {searchResults.length > 0 && (
        <div>
          <h3>Search Results:</h3>
          <ul>
            {searchResults.map((recipe) => (
              <li key={recipe.id}>
                <span>{recipe.name}</span>
                <button onClick={() => handleImport(recipe)}>Import</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedRecipe && (
        <div>
          <h3>Imported Recipe:</h3>
          <p>{selectedRecipe.name}</p>
        </div>
      )}
    </div>
  );
};

export default ImportRecipe;
