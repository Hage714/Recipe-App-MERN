import React, { useEffect, useState } from "react";
import { BASE_URL, IMAGES_BASE_URL } from "../utils/config";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

import EditRecipe from "./EditRecipe";
import DeleteRecipe from "./DeleteRecipe";
import { BiSolidEditAlt } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

const MyCollections = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const token = Cookies.get("token");

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(`${BASE_URL}/collections`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });
        //setRecipes(response.data);
        const data = await response.json();
        setRecipes(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching recipes", error);
      }
    };

    fetchRecipes();
  }, [token]);

  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const [selectedRecipeTitle, setSelectedRecipeTitle] = useState(null);

  const handleSelectedRecipe = (id, title) => {
    setSelectedRecipeId(id);
    setSelectedRecipeTitle(title);
  };

  return (
    <div className="container mt-3">
      <EditRecipe id={selectedRecipeId} title={selectedRecipeTitle} />
      <DeleteRecipe id={selectedRecipeId} title={selectedRecipeTitle} />

      <div className="row">
        {recipes.map((recipe) => {
          return (
            <div className="col mb-4" key={recipe._id}>
              <div className="card h-100" style={{ width: "18rem" }}>
                <img
                  src={`${IMAGES_BASE_URL}/${recipe?.image}`}
                  className="card-img-top standard-image"
                  alt="..."
                />

                <div className="card-body d-flex flex-column pb-0">
                  <h5 className="card-title">{recipe.title}</h5>
                  <p className="card-text">{recipe.ingredients.join(",")}</p>

                  <div className="mt-auto d-flex justify-content-between align-items-center">
                    <Link
                      to={`/recipe/${recipe._id}`}
                      className="btn btn-success"
                    >
                      View more
                    </Link>

                    <div className="d-flex">
                      <p className="text-primary fs-4">
                        <BiSolidEditAlt
                          onClick={() =>
                            handleSelectedRecipe(recipe._id, recipe.title)
                          }
                          data-bs-toggle="modal"
                          data-bs-target="#editRecipe"
                          style={{ cursor: "pointer", marginRight: "15px" }}
                        />
                      </p>

                      <p className="text-danger fs-4">
                        <MdDelete
                          onClick={() =>
                            handleSelectedRecipe(recipe._id, recipe.title)
                          }
                          data-bs-toggle="modal"
                          data-bs-target="#deleteRecipe"
                          style={{ cursor: "pointer" }}
                        />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyCollections;
