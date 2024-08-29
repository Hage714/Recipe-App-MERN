import React, { useEffect, useState } from "react";
import { BASE_URL, IMAGES_BASE_URL } from "../utils/config";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import EditRecipe from "./EditRecipe";
import DeleteRecipe from "./DeleteRecipe";
import { BiSolidEditAlt } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import NewRecipe from "./NewRecipe";

const MyCollections = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const [selectedRecipeTitle, setSelectedRecipeTitle] = useState(null);
  const [filterByRating, setFilterByRating] = useState(false);
  const [filterIngredient, setFilterIngredient] = useState(""); 
   const [sort, setSort] = useState("recent");
  const [userName, setUserName] = useState("");  // State for storing user name

  const token = Cookies.get("token");

  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${BASE_URL}/user`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });
        const data = await response.json();
        setUserName(data.name); 
      } catch (error) {
        console.error("Error fetching user", error);
      }
    };

    fetchUser();
  }, [token]);

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
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error("Error fetching recipes", error);
      }
    };

    fetchRecipes();
  }, [token]);

  const handleSelectedRecipe = (id, title) => {
    setSelectedRecipeId(id);
    setSelectedRecipeTitle(title);
  };

  // Filter by rating
  let filteredRecipes = recipes;

  if (filterByRating) {
    filteredRecipes = filteredRecipes.filter(
      (recipe) => recipe.averageRating >= 4
    );
  }

  const sortedRecipes = filteredRecipes.sort((a, b) => {
    if (sort === "recent") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else if (sort === "alphabetical") {
      return a.title.localeCompare(b.title);
    } else if (sort === "highestRated") {
      // Ensure ratings are numbers and fallback to 0 if not defined
      const ratingA = a.averageRating || 0;
      const ratingB = b.averageRating || 0;
      return ratingB - ratingA; // Sort descending (highest to lowest)
          } else {
      return 0; 
    }
  });

  

  const handleRatingFilterChange = (e) => {
    setFilterByRating(e.target.checked);
  };

  

  return (
    <div className="container pt-4">
      <div className="row">
        <div className="col-md-3 col-sm-12 p-4 ">
          <div className="d-flex align-items-center mb-4">
            <img
              src="https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="User Avatar"
              className="rounded-circle me-3"
              style={{ width: "50px", height: "50px", objectFit: "cover", transition: "transform 0.3s ease-in-out" }}
              onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
            />
            <h3 className="mb-0" >
              Hello, {user.name}
            </h3>
                      </div>
        </div>
      <div className="col-md-4 col-sm-12">
          <div className="statistics mb-4">
            <div className="card shadow-sm border-0">
              <div className="card-body p-4">
                <div className="d-flex flex-column align-items-center">
                  <div className="d-flex align-items-center justify-content-center ">
                    <div className="icon-container bg-success text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '50px', height: '50px' }}>
                      <i className="bi bi-bar-chart-fill fs-4"></i>
                    </div>
                    <p className="text-center fw-bold fs-5">
                      You have added <strong>{recipes.length}</strong> recipes to your collection.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>


      </div>
      <div className="col-md-5">
        
          <p className="text-center mb-4">
            Welcome! Here, you can manage and view all the recipes you've added.
            Use the filters and sorting options to organize your recipes as you like. Click on the "View more" button
            to see detailed information about each recipe or use the edit and delete icons to manage your recipes.
          </p>
        </div>
      </div>

      <div className="call-to-action text-center mb-2">
        <p>Keep your collection growing by adding more recipes. Click below to add a new recipe.</p>
        

        <button
          className="btn collectionbtn mr-5"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#newRecipe"
        >
          New recipe
        </button>

      </div>
      <NewRecipe recipes={recipes} />

      


{recipes.length > 0 &&
      <div className="d-flex justify-content-between mb-4">
        <div className="sorting-options">
            <label>
              <input
                type="checkbox" className="mt-4"
                checked={filterByRating}
              onChange={handleRatingFilterChange} style={{ marginRight: "8px" }}
              />
                Filter by Most Rated (4 stars and above)
            </label>
        </div>

        <div>
          <select className="form-select mb-1 fw-bold" value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="">Sort by</option>
            <option value="recent">Most Recent</option>
            <option value="alphabetical">Alphabetical</option>
            <option value="highestRated">Highest Rated</option>
          </select>
        </div>
      </div>
      }
      <EditRecipe id={selectedRecipeId} title={selectedRecipeTitle} />
      <DeleteRecipe id={selectedRecipeId} title={selectedRecipeTitle} />

      <div className="scrollable-row d-flex flex-nowrap overflow-auto mb-5 pt-4 bgc">
        {sortedRecipes.map((recipe) => (
          <div className="col mb-4 custom-card-spacing" key={recipe._id} style={{ display: "inline-block" }}>
            <div className="card h-100 shadow-sm border-0" style={{ width: "18rem" }}>
              <img
                src={`${IMAGES_BASE_URL}/${recipe?.image}`}
                className="card-img-top standard-image"
                style={{ objectFit: "cover", height: "200px" }}
                alt={recipe.title}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title text-center fs-4">{recipe.title}</h5>
                <p className="card-text"><strong>Ingredients:</strong> {recipe.ingredients.join(", ")}</p>
                <div className="mt-auto d-flex justify-content-between align-items-center">
                  <Link to={`/recipe/${recipe._id}`} className="btn homebtn">
                    View more
                  </Link>
                  <div className="d-flex">
                    <p className="text-success fs-4">
                      <BiSolidEditAlt
                        onClick={() => handleSelectedRecipe(recipe._id, recipe.title)}
                        data-bs-toggle="modal"
                        data-bs-target="#editRecipe"
                        className="icon-hover"
                        style={{ cursor: "pointer", marginRight: "15px" }}
                      />
                    </p>
                    <p className="text-success fs-4">
                      <MdDelete
                        onClick={() => handleSelectedRecipe(recipe._id, recipe.title)}
                        data-bs-toggle="modal"
                        data-bs-target="#deleteRecipe"
                        className="icon-hover"
                        style={{ cursor: "pointer" }}
                      />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCollections;
