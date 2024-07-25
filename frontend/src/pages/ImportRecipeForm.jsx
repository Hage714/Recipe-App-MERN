import React, { useState } from "react";

const ImportRecipeForm = () => {
  const [url, setUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/import-recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Recipe imported successfully");
      } else {
        alert("Error importing recipe: " + data.message);
      }
    } catch (error) {
      alert("Error importing recipe: " + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="url">Recipe URL:</label>
        <input
          type="url"
          id="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
      </div>
      <button type="submit">Import Recipe</button>
    </form>
  );
};

export default ImportRecipeForm;
