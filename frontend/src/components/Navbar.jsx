import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate(); // Use useNavigate hook

     const handleNavigation = (path) => {
    navigate(path); // Navigate to the desired path
  };
   
  
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
                <a className="navbar-brand" href="/">Index</a>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

<div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0"> 
        <li className="nav-item">
          <a className="nav-link fw-bold" aria-current="page" href="/about">About us</a>
        </li>
        <li className="nav-item">
          <a className="nav-link fw-bold" href="/contribute">Contribute</a>
        </li>
        </ul>
        </div>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle fw-bold" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Accounts
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                <li><a className="dropdown-item" onClick={() => handleNavigation ('/register')} >Register</a></li>
                <li><a className="dropdown-item" onClick={() => handleNavigation ('/login')} >Login</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

