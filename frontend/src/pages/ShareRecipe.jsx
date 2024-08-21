import React, { useState} from "react";
import { BASE_URL } from "../utils/config";
import { FaShareAlt } from "react-icons/fa";
import {
  FacebookShareButton,
  TwitterShareButton,
  EmailShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  EmailIcon,
  WhatsappIcon,
} from "react-share";

const ShareRecipe = ({ recipe }) => {
  const [showShareOptions, setShowShareOptions] = useState(false); //When true, the social media share buttons are displayed.

  const shareUrl = `${BASE_URL}/recipes/${recipe._id}`;

  const toggleShareOptions = () => {
    setShowShareOptions(!showShareOptions);
  };

  const handleShareClick = () => {
    // Reload the page after a short delay
    setTimeout(() => {
      window.location.reload();
    }, 500); // Adjust the delay if necessary
  };

  return (
    <div className=" mt-3">
      <button className="btn text-success" onClick={toggleShareOptions}>
        <FaShareAlt size={20} />
      </button>

      {showShareOptions && (
        <div>
          <p>Share via:</p>
          <div className="d-flex justify-content space-between mt-2">
      <FacebookShareButton url={shareUrl} quote={recipe.title} onClick={handleShareClick}>
        <FacebookIcon size={30} round />
      </FacebookShareButton>
      <TwitterShareButton url={shareUrl} title={recipe.title} onClick={handleShareClick}>
        <TwitterIcon size={30} round />
      </TwitterShareButton>
      <WhatsappShareButton url={shareUrl} title={recipe.title} onClick={handleShareClick}>
        <WhatsappIcon size={30} round />
      </WhatsappShareButton>
      <EmailShareButton
        url={shareUrl}
        subject={recipe.title}
              body={`Check out this recipe: ${recipe.title}\n${shareUrl}`} onClick={handleShareClick}
      >
        <EmailIcon size={30} round />
      </EmailShareButton>
    </div>

        </div>
  )}
</div >
  )
};

export default ShareRecipe;
