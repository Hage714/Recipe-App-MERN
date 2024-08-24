import React, { useContext, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { IMAGES_BASE_URL } from '../utils/config';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


import { MyRecipesContext } from '../context/MyRecipesContext';

const HomePage = () => {
    const { recipes } = useContext(MyRecipesContext);
    const navigate = useNavigate();

    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    // Sort recipes by rating and get the top 3
    const topRatedRecipes = recipes
        .sort((a, b) => b.averageRating - a.averageRating) // Sort by highest rating
        .slice(0, 3); // Get top 3 recipes

  return (
    <div className='container'>
          <div className="hero-section text-center" style={{ backgroundImage: `url('/food1.avif')`, backgroundSize: 'cover', backgroundPosition: 'center', padding: '100px 0', color: '#fff', position: 'relative' }}>
              <div className="overlay" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.7)' }}></div>
              <div className="content" style={{ position: 'relative', zIndex: 1 }}>
                  <h1 className="display-4 mb-3" style={{ marginBottom: '20px' }}>Discover Delicious Recipes</h1>
                  <p className="lead mb-4 text-light" style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '24px' }}>Explore, cook, and share your favorite recipes!</p>
                  <button
                      className="btn btn-success mr-5"
                      type="button"
                      onClick={() => navigate("/recipes")}
                  >
                      Get started
                  </button>
              </div>
          </div>



          <div className="mt-5">
              <h2 className="text-center mb-4 text-success" style={{ fontFamily: 'Open Sans, sans-serif' }}>Top Rated Recipes</h2>
              <div className="row">
                  {topRatedRecipes.map((recipe) => (
                      <div className="col-md-4 mb-4" key={recipe._id}>
                        <div className='row'>
                            <div className='col-3'></div>
                              <div className='col-6'>
                                  <div className="card cardhome h-100 shadow-sm border-0 " data-aos="fade-up" style={{ width: "18rem", position: "relative" }} >
                              <img
                                  src={`${IMAGES_BASE_URL}/${recipe?.image}`}
                                          className="card-img-top standard-image"
                                  style={{ objectFit: "cover", height: "200px" }}
                                  alt={recipe.title}
                              />
                              <div className="card-body d-flex flex-column">
                                  <h5 className="card-title text-center">{recipe.title}</h5>
                                          <p className="card-text fs-5" style={{ fontFamily: 'Open Sans, sans-serif' }}><strong>Rating:</strong> {recipe.averageRating} / 5 </p>
                                          <p className="card-text fs-5" style={{ fontFamily: 'Open Sans, sans-serif' }}><strong>Ingredients:</strong> {recipe.ingredients.join(", ")}</p>
                                  <a href={`/recipe/${recipe._id}`} className="btn btn-outline-success mt-auto">View more</a>
                              </div>
                          </div>
                              </div>
                              <div className='col-3'></div>

                          </div>


                      </div>
                  ))}
              </div>
          </div>

          

          <div className="testimonials text-center my-5">
              <h2 className="mb-4 text-success" style={{ fontFamily: 'Open Sans, sans-serif' }}>What Our Users Say</h2>
              <blockquote className="blockquote" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                  <p className="mb-3">"I used to dread cooking, but this app has made it a fun and exciting activity. The recipes are so easy to follow, and I've discovered so many new dishes that my family loves. Plus, the shopping list feature is a game-changer!"</p>
                  <footer className="blockquote-footer">Jessica K. in <cite title="Source Title">ThisRecipe</cite></footer>
              </blockquote>
              <blockquote className="blockquote" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                  <p className="mb-3">"As a professional chef, I'm always on the lookout for new inspirations and recipes. This app has been an incredible resource, offering both innovative recipes and time-tested classics. It's a must-have for any home cook or culinary enthusiast!"</p>
                  <footer className="blockquote-footer">Jane Doe in <cite title="Source Title">ThisRecipe</cite></footer>
              </blockquote>
              <blockquote className="blockquote" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                  <p className="mb-3">"The recipe app is a game-changer for anyone who loves cooking. The user-friendly interface and diverse recipe collection have made meal prep a breeze."</p>
                  <footer className="blockquote-footer">David Kim in <cite title="Source Title">ThisRecipe</cite></footer>
              </blockquote>
          </div>

    </div>
  )
}

export default HomePage
