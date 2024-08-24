import React, { useState, useContext } from "react";
import { IMAGES_BASE_URL } from "../utils/config";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import Search from "../components/Search";
import NewRecipe from "./NewRecipe";
import { MyRecipesContext } from "../context/MyRecipesContext";
import ShareRecipe from "./ShareRecipe";

const token = Cookies.get("token");

const Recipes = () => {
  const { recipes, setRecipes } = useContext(MyRecipesContext);
  const [selectedType, setSelectedType] = useState(""); // State for the selected recipe type

  const navigate = useNavigate();

  // Filter recipes based on the selected type
  const filteredRecipes = selectedType
    ? recipes.filter(recipe => recipe.type === selectedType)
    : recipes;

  const groupByCategory = (recipes) => {
    return recipes.reduce((acc, recipe) => {
      const category = recipe.category;
      if (category) {
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(recipe);
      }
      return acc;
    }, {});
  };

  const categorizedRecipes = groupByCategory(filteredRecipes);

  return (
    <div className="container">
      


      <div className="d-flex align-items-center mb-3" style={{ gap: '1rem' }}>
        <div className="d-flex flex-grow-5 mt-4 align-items-center" style={{ marginRight: 'auto' }}>
          <Search />
        </div>
        <div className="d-flex align-items-center mb-4">
          <label htmlFor="filterType" className="form-label me-2 mt-3">Filter by Recipe Type:</label>
          <select
            id="filterType"
            className="form-control"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)} style={{ width: '250px' }}
          >
            <option value="">All Types</option>
            <option value="Appetizers">Appetizers</option>
            <option value="Main Course">Main Course</option>
            <option value="Desserts">Desserts</option>
            <option value="Drinks">Drinks</option>
          </select>
        </div>
        <div className="ms-3 mb-4">
        {token ? (
          <button
            className="btn btn-success mr-5"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#newRecipe"
          >
            New recipe
          </button>
        ) : (
          <button
            className="btn btn-success mr-5"
            type="button"
            onClick={() => navigate("/register")}
          >
            New recipe
          </button>
        )}
        </div>
      </div>

      <NewRecipe recipes={recipes} />

      

      {Object.keys(categorizedRecipes).map((category) => (
        <div key={category} className="mb-5">
          <h3 className="mb-3 text-success">{category}</h3>
          <div className="scrollable-row d-flex flex-nowrap overflow-auto">
            {categorizedRecipes[category].map((recipe) => (
              <div className="col mb-4 me-5 custom-card-spacing" key={recipe._id} style={{ display: "inline-block" }}>
                <div className="card h-100 shadow-sm " style={{ width: "18rem", border: "none" }}>
                  <img
                    src={`${IMAGES_BASE_URL}/${recipe?.image}`}
                    className="card-img-top standard-image"
                    alt={recipe.title} style={{ objectFit: "cover", height: "200px" }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title text-center fs-4">{recipe.title}</h5>
                    <p className="card-text"><strong>Category:</strong> {recipe.category}</p>
                    <p className="card-text"><strong>Recipe type:</strong> {recipe.type}</p>
                    <p className="card-text"><strong>Ingredients:</strong> {recipe.ingredients.join(",")}</p>
                    <div className="mt-auto d-flex justify-content-between align-items-center">
                      <Link
                        to={`/recipe/${recipe._id}`}
                        className="btn btn-outline-success mt-4"
                      >
                        View more
                      </Link>
                      <ShareRecipe recipe={recipe} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Recipes;  
