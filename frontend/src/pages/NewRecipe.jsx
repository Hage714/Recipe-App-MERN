import React, { useState, useContext } from "react";
import { BASE_URL } from "../utils/config";
import axios from "axios";
import AuthContext from "../context/AuthContext";

const NewRecipe = ({ recipes }) => {
  const [recipeTitle, setRecipeTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [image, setImage] = useState("");

  const { token } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", recipeTitle);
    formData.append("ingredients", ingredients);
    formData.append("image", image);

    const recipeList = async () => {
      const response = await fetch(`${BASE_URL}/my-recipes/`, {
        method: "POST",
        headers: {
          Accept: "*",
          Authorization: `${token}`,
        },
        body: formData,
      });
      alert("Recipe added successfully!");
      // window.location.reload();
    };
    recipeList();
  };

  return (
    <div
      className="modal fade"
      id="newRecipe"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h3
              className="modal-title text-center w-100"
              id="exampleModalLabel"
            >
              Create New Recipe
            </h3>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="container mt-5">
              <form onSubmit={handleSubmit}>
                <div className="mb-3 mt-0">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    value={recipeTitle}
                    onChange={(e) => setRecipeTitle(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="ingredients" className="form-label">
                    Ingredients
                  </label>
                  <textarea
                    className="form-control"
                    id="ingredients"
                    rows="4"
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                  />
                </div>
                <div className="form-group  mb-3">
                  <label className="form-label fw-medium">Image:</label>
                  <input
                    type="file"
                    className="form-control custom-input"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    required
                  />
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary">
                    Create Recipe
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRecipe;
