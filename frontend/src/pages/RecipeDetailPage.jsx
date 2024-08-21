import React, { useEffect, useState, useContext } from "react";
import { MyRecipesContext } from "../context/MyRecipesContext";
import Cookies from "js-cookie";
import { BASE_URL, IMAGES_BASE_URL } from "../utils/config";
import { useParams } from "react-router-dom";

const RecipeDetailPage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const { recipes, setRecipes } = useContext(MyRecipesContext);

  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [comments, setComments] = useState([]);

  console.log(id);
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`${BASE_URL}/recipes/${id}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          // Handle your data here
          setRecipe(data);
          setSelectedRecipe(data);
          console.log(data);
        } else {
          console.error("Failed to fetch recipe:", response.status);
        }
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    fetchRecipe();
  }, [id]);


  
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
    <div className="container recipe-container">
      {/* Render the specific recipe details */}
      {recipe ? (
        <div className="recipe-details">
          <h2>{recipe.title}</h2>
          <img src={`${IMAGES_BASE_URL}/${recipe.image}`} className="recipe-image" alt={recipe.title} />
          <p><strong>Category:</strong> {recipe.category}</p>
          <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
          <p><strong>Steps:</strong></p>
          <ul>
            {recipe.steps.map((step, index) => (
              <li key={index}>{index + 1}. {step}</li>
            ))}
          </ul>
          <h3>Average Rating: {recipe.averageRating.toFixed(1)}</h3>
          <div>
            <h4>Comments</h4>
            {comments.filter(comment => comment.recipe === recipe._id).map((item, index) => (
              <div key={index}>
                <p><strong>{item.comment}</strong></p>
                <p>{item.rating} Stars</p>
                <span>{item.createdAt.slice(0, 10)}</span>
              </div>
            ))}
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
        </div>
      ) : (
        <p>Loading recipe...</p>
      )}

          
        </div>

    
  );
};

export default RecipeDetailPage;
