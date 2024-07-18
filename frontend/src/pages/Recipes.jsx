import React, { useContext, useState } from "react";
import { MyRecipesContext } from "../context/MyRecipesContext"; 
import { BASE_URL, IMAGES_BASE_URL } from "../utils/config";


import Search from "../components/Search";
import NewRecipe from "./NewRecipe";
import EditRecipe from "./EditRecipe";
import DeleteRecipe from "./DeleteRecipe";
import { FaEye } from "react-icons/fa";
import { BiSolidEditAlt } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

const Recipes = () => {
  const { recipes } = useContext(MyRecipesContext);
  console.log(recipes);

  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const [selectedRecipeTitle, setSelectedRecipeTitle] = useState(null);

  const handleSelectedRecipe = (id, title) => {
    setSelectedRecipeId(id);
    setSelectedRecipeTitle(title);
  };

  return (
    <div className="container mt-4">
      <Search />
      <NewRecipe recipes={recipes}/>
      <EditRecipe id={selectedRecipeId} title={selectedRecipeTitle} />
      <DeleteRecipe id={selectedRecipeId} title={selectedRecipeTitle} />

      <button
        className="bbtnsuccess"
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#newRecipe"
      >
        New recipe
      </button>

      <NewRecipe /> 
      <div className="row">
        {recipes.map((recipe) => {
          return <div className="col mb-4" key={recipe._id}>
            <div className="card h-100" style={{ width: "18rem" }}>
 <img
          src={`${IMAGES_BASE_URL}/${recipe?.image}`}
          className="card-img-top standard-image"
          alt="..."
        />

              <div className="card-body d-flex flex-column pb-0">
                <h5 className="card-title">{recipe.title}</h5>
                <p className="card-text">{recipe.ingredients}</p>

                <div className="mt-auto d-flex justify-content-between align-items-center">
                  <p className="btnsuccess fs-4">
                    <FaEye
                      onClick={setSelectedRecipeId}
                      data-bs-toggle="modal"
                      data-bs-target="#viewRecipe"
                      style={{ cursor: "pointer" }}
                    />
                  </p>
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
                        onClick={() => handleSelectedRecipe(recipe._id, recipe.title)}
                        data-bs-toggle="modal"
                        data-bs-target="#deleteRecipe"
                        style={{ cursor: "pointer" }}
                      />
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>;
        })}
      </div>
    </div>
  );
};

export default Recipes;
