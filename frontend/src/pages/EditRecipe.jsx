import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/config";

const EditRecipe = ({ id, title }) => {
  const [recipeTitle, setRecipeTitle] = useState("");
  const [ingredients, setIngredients] = useState(""); 
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {  //making request to the backend
    const fetchRecipe = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/recipes/${id}`);
        setRecipeTitle(data.title);
        setIngredients(data.ingredients);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch recipe");
      }
    };
    if (id) { //if id is present 
      fetchRecipe();
    }
  }, [id]);

  /*
useEffect (() => {
  const getRecipe = async () => {
const response = await fetch (`${BASE_URL}/recipes/${id}`, {
method: 'GET',
headers: {
  'Content-Type': 'application/json'}
})
  const data = await response.json();
  console.log(data);
})
  }
})
  */

  const data = { title, ingredients };
  console.log(data);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!recipeTitle || !ingredients) {
      setError("Please fill all the fields");
      return;
    }

    try {
      await axios.put(
        `${BASE_URL}/recipes/${id}`,
        { title, ingredients },
        { headers: { "Content-Type": "application/json" } }
      );
      setSuccess("Recipe updated successfully");
      window.location.reload();
      // Navigate to home or another page after success
    } catch (error) {
      console.error(error);
      setError("Failed to update recipe");
    }
  };

  return (
    <div
      className="modal fade"
      id="editRecipe"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Edit recipe
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <p>
              Recipe Title: {title}, Recipe ID: {id}
            </p>
            <div className="container mt-5">
              {error && <div className="alert alert-danger">{error}</div>}
              {success && <div className="alert alert-success">{success}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
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
                    rows="5"
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                  ></textarea>
                </div>
                
                <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="submit" className="btn btn-primary">Edit recipe</button>
      </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditRecipe;
