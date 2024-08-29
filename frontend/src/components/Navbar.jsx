import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { IoMdLogOut } from "react-icons/io";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // state to track login status
  const [activeItem, setActiveItem] = useState(""); // state to track active nav item
  const token = Cookies.get("token"); // get the token from cookies

  const navigate = useNavigate(); // Use useNavigate hook

  useEffect(() => {
    const token = Cookies.get("token"); // get the token from cookies
    setIsLoggedIn(!!token); // update state based on token presence
  }, []);

  const handleNavigation = (path, item) => {
    setActiveItem(item); // Set the clicked item as active
    navigate(path); // Navigate to the desired path
  };

  const handleLogout = () => {
    Cookies.remove("token"); // remove the token from cookies
    localStorage.removeItem("user");
    setIsLoggedIn(false); // update state to reflect logout
    setActiveItem(""); // Clear active item on logout
    navigate("/login"); // navigate to the login page
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <img
          className="img-fluid"
          src="data:image/jpeg;base64,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A42lkpg3AFsZDdevSNxcbbN2C20LvSvum46b85d19I8jCMjHmXR2efyGT0D3IHyGT0D3IOFnpE6Onu8FoMjRc78f6LllmIrzcNReK03lE8gyh1TEAbkvAA5yuNLxxQiYs1JvERKyfkMnoHuUtZHyGT0D3IHyGT0D3IHyGT0D3IJIgICCO8ILrZPn9Vg7ZGBc8vklF1s7YLKOc7BV2zzO79GULrxsO9jT3BWkdHrqeWHusthAQcrLmQIattpG2cPJe3Bw69o5iuWXDXJHOHLJhrkjmrjLeadRTEkN4yP04wcB9pusd451V5dLenOOcKzLpb05xzhH1HRZYrLV8K2GBWWJYoxLEreJay6GR8gVFWfmYyW7XuwYPvbegXK60x2v0dMWnyZfLCzM2MyYaQiR9pZh5zhyWn7Ddh5zj0KdjwRTn7rfT6KmLnPOUqXdNEBAQQjhcfajj56ho/45D4KPqfIrf1SdsMd1cZrvtWU37xEO14HiouPleFRpZ2zV7r+Vk9SICAgICAg4ueWTZKqkkhi0dNxZbSNhYPa4423ArTJWbV2hH1WO2TFNa9VaHg2rv2P/ALD/APKi/t7qf/xuX8f5W7k+Msija7ymxsabarhoB71MjovqxtWIbCy2EBAQfCEHJynm3S1FzJE3SPnNu13WW6+tcb4Md+sON8FL9YRur4OWH9VO9vNI1ru8aKjW0Me0ottBWfLLmycHVR5ssJ6eMHgVp+yt94cZ0F/vDAcHNSdckI65D/KkaO/3P/H3+8Nym4Nf92o6o2WP4nHwXSuj+8t4/Tv9VkhybmTRw2PF8Y7fMdL8vk9ykV09K+yVj0mKntukLWACwFgNQC7JG0RyZIyICAgIIrwh5DmrYI44A0lsumdJ2jgGPHvcuOak2rtCFrsF81IrX7oZknMKuinhkc2PRZLG82kGprwTs3Bca4bxaJV+L9Py1yRaduUrdUxeiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICDhsM1seMv8AeQZ3l/a/mQCZd0v5kHWhvoi+uwv02QZoCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg//9k="
        ></img>
        <a className="navbar-brand fw-bold" href="/">
          ThisRecipe
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse d-flex justify-content-center" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a
                className={`nav-link fw-bold fs-6 ${activeItem === "about" ? "active" : ""}`}
                aria-current="page"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation("/recipes", "recipes");
                }}
              >
                Home
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link fw-bold fs-6 ${activeItem === "about" ? "active" : ""}`}
                aria-current="page"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation("/about", "about");
                }}
              >
                About us
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link fw-bold fs-6 ${activeItem === "contribute" ? "active" : ""}`}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation("/contribute", "contribute");
                }}
              >
                Contribute
              </a>
            </li>
            {token && (
              <li className="nav-item">
                <a
                  className={`nav-link fw-bold fs-6 ${activeItem === "mycollections" ? "active" : ""}`}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation("/mycollections", "mycollections");
                  }}
                >
                  My Collection
                </a>
              </li>
            )}
          </ul>
        </div>

        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNavDropdown"
        >
          <ul className="navbar-nav">
            {isLoggedIn ? (
              <li className="nav-item">
                <a
                  className="nav-link fw-bold"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLogout();
                  }}
                >
                  <IoMdLogOut size={24} />
                </a>
              </li>
            ) : (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle fw-bold fs-6"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Accounts
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavigation("/register", "");
                      }}
                    >
                      Register
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavigation("/login", "");
                      }}
                    >
                      Login
                    </a>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
