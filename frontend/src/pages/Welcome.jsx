import React from "react";

const Welcome = () => {
  

  return (
    <div>
      <div className=" m-5">
        <h2 className="mb-5 text-center" style={{ fontFamily: "fantasy" }}>
          Welcome to RecipeApp!
        </h2>

        <div className=" container ">
          <div className="row mb-5">
            <div className="col-5 text-start">
              <p className=" fs-5">
                A free recipe keeper and meal planner for Web, IOS, and
                Android.Feel free to add recipes you find interesting to make
                the community enjoy using the app by viewing many different
                recipes.
              </p>
              <p>
                <a
                  href="/register"
                  className="text-decoration-underline fs-5 text-reset"
                >
                  Want to add a recipe?
                </a>
              </p>
            </div>
            <div className="col-2"></div>
            <div className="col-5 text-start">
              <p className="fs-5">
                Say goodbye to recipe chaos and hello to effortless
                organisation! You can easily find and manage your recipes, no
                matter how many you have.Editing your recipes incase you've
                found more interesting ways to prepare a certain meal is also
                enabled. You can also delete outdated recipes.
              </p>
              <a
                href="/login"
                className="text-decoration-underline fs-5 text-reset"
              >
                Want to edit or delete your recipe?
              </a>
            </div>
          </div>
        </div>

        <div className="container mt-5">
          <div className="row mt-5">
            <div className="col-md-2"></div>

            <div className="col-md-3 mt-5 ml-5">
              <h3 className="fs-3">Find any recipe instantly</h3>
              <p>Quickly lookup your recipes by name.</p>
              <p>
                Got some leftovers in the fridge? Search for a recipe to use
                them up.
              </p>
              <p>
                Cook more of your favorite meals and rediscover those long
                forgotten recipes to make meal times interesting again.
              </p>
            </div>
            <div className="col-md-5">
              <div
                id="carouselExampleAutoplaying"
                className="carousel slide mt-5"
                data-bs-ride="carousel"
              >
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg1hhQMMP30fDSL5zWDmfj3hoXq1B6KLXhnw&s"
                      className="d-block carousel-image"
                      alt="..."
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      src="https://img.taste.com.au/awCoiGh-/w720-h480-cfill-q80/taste/2016/11/easy-italian-chicken-bake-87897-1.jpeg"
                      className="d-block carousel-image"
                      alt="..."
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxqtkhrB3Do1KKwwFmXl2rUCCeaVUsMNgQ-g&s"
                      className="d-block carousel-image"
                      alt="..."
                    />
                  </div>
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExampleAutoplaying"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExampleAutoplaying"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>
            <div className="col-md-2"></div>
          </div>
        </div>
      </div>

      <section className="container-fluid bg-dark text-white mt-5 p-4">
        <h4
          className="mb-4 mt-5 text-center fs-3"
          style={{
            fontFamily:
              "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif",
          }}
        >
          ThisRecipe!
        </h4>
        <p>
          Any aspiring cook knows that being skilled in the kitchen comes with
          some organizational challenges. You have to find a place for all the
          tools you accumulate over time, and figure out how to use all those
          highly specific ingredients that are now overflowing your cupboards.
          And then there are the recipes.{" "}
        </p>
        <p>
          The app also has a social element, so you can share recipes with
          fellow Whisk users and review the ones you’ve tried. People in the
          community can also collaborate and create collections of recipes based
          on cuisine, meal, cook time, and more.{" "}
        </p>
        <h4
          className="mt-5"
          style={{
            fontFamily:
              "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif",
          }}
        >
          Why ThisRecipe?
        </h4>
        <ul className="mb-5">
          <li>Easy to use</li>
          <li>Available on desktop and all mobile devices</li>
          <li>Open source</li>
        </ul>{" "}
      </section>
    </div>
  );
};

export default Welcome;
