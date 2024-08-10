import React, { useState } from "react";
import { BASE_URL, IMAGES_BASE_URL } from "../utils/config";
import { BiSolidEditAlt } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import EditRecipe from "./EditRecipe";
import DeleteRecipe from "./DeleteRecipe";
import { FacebookShareButton, TwitterShareButton, EmailShareButton, WhatsappShareButton } from 'react-share';
import { FacebookIcon, TwitterIcon, EmailIcon, WhatsappIcon } from 'react-share';

const RecipeCard = ({ recipe }) => {
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const [selectedRecipeTitle, setSelectedRecipeTitle] = useState(null);

  const handleSelectedRecipe = (id, title) => {
    setSelectedRecipeId(id);
    setSelectedRecipeTitle(title);
  };

  const shareUrl = `${BASE_URL}/recipes/${recipe._id}`;
  console.log(shareUrl);


  return (
    <div className="col mb-4">
      <div className="card h-100" style={{ width: "18rem" }}>
        <img
          src={`${IMAGES_BASE_URL}/${recipe?.image}`}
          className="card-img-top standard-image"
          alt="..."
        />
        <div className="card-body d-flex flex-column pb-0">
          <h5 className="card-title">{recipe.title}</h5>
          <p className="card-text">{recipe.ingredients}</p>
          <p className="card-text">{recipe.category}</p>
          <p>Average Rating: {recipe.averageRating.toFixed(1)}</p>

          <div className="mt-auto d-flex justify-content-between align-items-center">
            
            <div className="d-flex">
              <p className="text-primary fs-4">
                <BiSolidEditAlt
                  onClick={() => handleSelectedRecipe(recipe._id, recipe.title)}
                  data-bs-toggle="modal"
                  data-bs-target="#editRecipe"
                  style={{ cursor: "pointer", marginRight: "15px" }}
                />
              </p>

              <p className="text-danger fs-4">
                <MdDelete
                  onClick={setSelectedRecipeId}
                  data-bs-toggle="modal"
                  data-bs-target="#deleteRecipe"
                  style={{ cursor: "pointer" }}
                />
              </p>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-between mt-3">
          <FacebookShareButton url={shareUrl} quote={recipe.title}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          <TwitterShareButton url={shareUrl} title={recipe.title}>
            <TwitterIcon size={32} round />
          </TwitterShareButton>
          <WhatsappShareButton url={shareUrl} title={recipe.title}>
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
          <EmailShareButton url={shareUrl} subject={recipe.title} body={`Check out this recipe: ${recipe.title}\n${shareUrl}`}>
            <EmailIcon size={32} round />
          </EmailShareButton>
        </div>
      </div>

      <EditRecipe id={selectedRecipeId} title={selectedRecipeTitle} />
      <DeleteRecipe />
    </div>
  );
};

export default RecipeCard;
