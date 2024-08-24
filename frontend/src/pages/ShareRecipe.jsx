import React, { useState } from "react";
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
  const [showShareOptions, setShowShareOptions] = useState(false);

  // Construct the correct URL using the recipe ID
  const shareUrl = `${window.location.origin}/recipe/${recipe._id}`;

  const toggleShareOptions = () => {
    setShowShareOptions(!showShareOptions);
  };

  const handleShareClick = () => {
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  return (
    <div className="mt-3">
      <button className="btn text-success" onClick={toggleShareOptions}>
        <FaShareAlt size={20} />
      </button>

      {showShareOptions && (
        <div>
          <p>Share via:</p>
          <div className="d-flex justify-content-between mt-2">
            <FacebookShareButton
              url={shareUrl}
              onClick={handleShareClick}
            >
              <FacebookIcon size={30} round />
            </FacebookShareButton>
            <TwitterShareButton
              url={shareUrl}
              onClick={handleShareClick}
            >
              <TwitterIcon size={30} round />
            </TwitterShareButton>
            <WhatsappShareButton
              url={shareUrl}
              onClick={handleShareClick}
            >
              <WhatsappIcon size={30} round />
            </WhatsappShareButton>
            <EmailShareButton
              url={shareUrl}
              subject={recipe.title}
              body={`Check out this recipe: ${recipe.title}\n${shareUrl}`}
              onClick={handleShareClick}
            >
              <EmailIcon size={30} round />
            </EmailShareButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareRecipe;
