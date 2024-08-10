import React, { useState, useEffect, useContext } from "react";
import { BASE_URL, IMAGES_BASE_URL } from "../utils/config";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Search from "../components/Search";
import NewRecipe from "./NewRecipe";
import RecipeCard from "./RecipeCard";
import { MyRecipesContext } from '../context/MyRecipesContext'
import CommentForm from "./CommentForm";


const Recipes = () => {
  const {recipes, setRecipes} = useContext(MyRecipesContext);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [comments, setComments] = useState([]);

  const navigate = useNavigate();
/*
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${BASE_URL}/recipes`);
      const data = await response.json();
      setRecipes(data);
      console.log(data);
    };
    fetchData();
  }, []);
  */

  useEffect(() => {

  const fetchComments = async () => {
    try {
      const response = await fetch(`${BASE_URL}/comments`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      }
       
      )
      //setComments(response.data);
      const data = await response.json();
      setComments(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  fetchComments();
}, []);

  const handleCommentAdded = (newComment) => {
    setComments([...comments, newComment]);

    // Update averageRating for the selected recipe
    const updatedRecipes = recipes.map((recipe) => {
      if (recipe._id === selectedRecipe._id) {
        const updatedAverageRating = (
          (recipe.averageRating * comments.length + newComment.rating) /
          (comments.length + 1)
        ).toFixed(1);

        return {
          ...recipe,
          averageRating: parseFloat(updatedAverageRating),
        };
      }
      return recipe;
    });

    setRecipes(updatedRecipes);
  };


  const token = Cookies.get("token");
  

  const handleViewMore = (recipe) => {
    setSelectedRecipe(recipe);
  };

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

  const categorizedRecipes = groupByCategory(recipes);


  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(1);
  console.log(selectedRecipe)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const commentData = { comment, rating };
      console.log('commentData:', commentData);


      const response = await fetch(`${BASE_URL}/comments/${selectedRecipe._id}`, {
        method: "POST",
        headers: 
        { "content-type": 'application/json' },
        body: JSON.stringify(commentData),

      });

     window.location.reload();

    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div className="container">
      <div className="d-flex align-items-center mb-4">
        <div className="flex-grow-1 mt-5">
          <Search />
        </div>
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

      <NewRecipe recipes={recipes} />

      {Object.keys(categorizedRecipes).map((category) => (
        <div key={category} className="mb-5">
          <h3 className="mb-3">{category}</h3>
          <div className="scrollable-row ">
            {categorizedRecipes[category].map((recipe) => (
              <div className="col mb-4" key={recipe._id}>
                <div className="card h-100" style={{ width: "18rem" }}>
                  <img
                    src={`${IMAGES_BASE_URL}/${recipe?.image}`}
                    className="card-img-top standard-image"
                    alt="..."
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{recipe.title}</h5>
                    <p className="card-text">{recipe.category} recipe</p>
                    <p className="card-text">{recipe.ingredients}</p>
                    <div className="mt-auto d-flex justify-content-between">
                      <button
                        className="btn btn-success"
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#viewRecipe"
                        onClick={() => handleViewMore(recipe)}
                      >
                        View more
                      </button>
                    </div>
                  </div>
                </div>
              </div>            ))}
          </div>
        </div>
      ))}

{/*
      <div className="row">
        {recipes.map((recipe) => (
          <div className="col mb-4" key={recipe._id}>
            <div className="card h-100" style={{ width: "18rem" }}>
              <img
                src={`${IMAGES_BASE_URL}/${recipe?.image}`}
                className="card-img-top standard-image"
                alt="..."
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{recipe.title}</h5>
                <p className="card-text">{recipe.ingredients}</p>
                <p className="card-text">{recipe.category} recipe</p>
                <div className="mt-auto d-flex justify-content-between">
                  <button
                    className="btn btn-success"
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#viewRecipe"
                    onClick={() => handleViewMore(recipe)}
                  >
                    View more
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      */}

      {selectedRecipe && (
        <div
          className="modal fade"
          id="viewRecipe"
          tabIndex="-1"
          aria-labelledby="viewRecipeLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="viewRecipeLabel">
                  {selectedRecipe.title}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p><strong>Ingredients:</strong> {selectedRecipe.ingredients}</p>
                <p><strong>Steps:</strong> </p>

                <h2>Average Rating: {selectedRecipe.averageRating.toFixed(1)}</h2>
                <div>
                  <h3>Comments</h3>
                  {comments.filter(comment => comment.recipe === selectedRecipe._id).map((item, index) => {
                    return (
                      <div key={index}>
                        <p>
                          <strong>{item.comment}</strong>
                          <span className="float-end">{item.createdAt.slice(0, 10)}</span>
                        </p>
                        <p>{item.rating} Stars</p>
                      </div>
                    )})}
                  
                </div>

                <form onSubmit={handleSubmit}>
                  <div>
                    <label>Rating:</label>
                    <select value={rating} onChange={(e) => setRating(e.target.value)}>
                      {[1, 2, 3, 4, 5].map(num => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label>Comment:</label>
                    <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
                  </div>
                  <button type="submit">Submit</button>
                </form>
                <ul className="list-group">
                  {selectedRecipe.steps.map((step, index) => (
                    <li key={index} className="list-group-item">{index+1}. {step}</li>

                  ))}
         
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Recipes;
