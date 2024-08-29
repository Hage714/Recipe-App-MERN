import React from 'react'

const Footer = () => {
  return (
    <div className="footer-container p-2 text-center bg-body-tertiary d-flex justify-content-between align-items-center">
      <div className="social-icons d-flex">
        <a href="https://www.facebook.com" className="soc-icon mx-2 fs-4"><i className="bi bi-facebook"></i></a>
        <a href="https://www.twitter.com" className="soc-icon mx-2 fs-4"><i className="bi bi-twitter"></i></a>
        <a href="https://www.instagram.com" className="soc-icon mx-2 fs-4"><i className="bi bi-instagram"></i></a>
      </div>
      <div className="text-end">
        <p className="mb-0">&copy; 2024 TheRecipe. All rights reserved.</p>
        <p className="mb-0">Contact us: hagewoche99@gmail.com</p>
      </div>
    </div>

  );
}

export default Footer
