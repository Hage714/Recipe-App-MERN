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

  const getStars = (rating) => {
    return (
      <>
        {'★'.repeat(rating)}
        {'☆'.repeat(5 - rating)}
      </>
    );
  };


  return (
    <div className="container bgc recipe-container">
      {/* Render the specific recipe details */}
      {recipe ? (
        <div className="recipe-details">
          <h2 className="">{recipe.title}</h2>

          <div className="row">
            <div className="col-5">
              <div>
                <img src={`${IMAGES_BASE_URL}/${recipe.image}`} className="recipe-image" alt={recipe.title} style={{ width: '450px', height: 'auto' }} />
              </div>
            </div>
            <div className="col-2"></div>
            <div className="col-2">
              <div>
                <p><strong>Category:</strong> {recipe.category}</p>
                <p><strong>Recipe type:</strong> {recipe.type}</p>

                <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
              </div>
            </div>

          </div>
          <p><strong>Steps:</strong></p>
          <ol className="steps-list">
            {recipe.steps.map((step, index) => (
              <li key={index}> {step}</li>
            ))}
          </ol>
          <h3>Average Rating: {recipe.averageRating.toFixed(1)}</h3>



          <div className="comments-section">
            <h4>Comments</h4>
            {comments.filter(comment => comment.recipe === recipe._id).map((item, index) => (
              <div key={index} className="comment">
                <p><strong>{item.comment}</strong></p>
                <p className="star-rating">
                  {'★'.repeat(item.rating)}
                  {'☆'.repeat(5 - item.rating)}
                </p>
                <span><strong>{item.createdAt.slice(0, 10)}</strong></span>
              </div>
            ))}
          </div>
          <form className="comment-form" onSubmit={handleSubmit}>
            <div className="form-group">
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
            <div className="text-center">
            <button type="submit">Submit</button>
            </div>

          </form>
        </div>
      ) : (
        <p>Loading recipe...</p>
      )}

          
        </div>
      
    
  );
};

export default RecipeDetailPage;
