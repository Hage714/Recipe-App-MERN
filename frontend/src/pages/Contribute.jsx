import React from "react";


const Contribute = () => {
  

    

  return (
    <div className="container bgc">
      <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-8 mt-5">
          <h3
            className="mb-3 text-center"
            style={{
              fontFamily:
                "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif",
            }}
          >
            We need your help!
          </h3>
          <p>ThisRecipe is donation based - every contribution helps!</p>
          <p className="mb-4">
            Unfortunately, ThisRecipe doesn't get many donations since it is a
            fairly small platform. In order to keep things free while paying for
            server costs, we need your help. Please reconsider - your
            contribution is truly appreciated! 
          </p>
          <p className="mb-4">
            My goal is to keep ThisRecipe open to anyone, without burdening the
            experience with ads. However, as ThisRecipe grows, hosting costs for
            servers and images begin to add up.
          </p>

          <p className="fst-italic mt-3">
            By continuing, you're agreeing to the ThisRecipe{" "}
            <a href="/terms" className="contributetext">
              Terms of Service
            </a>
          </p>

          <div className="contribute-page mt-2 p-4">
            <h3
              className="mb-4 text-center"
              style={{
                fontFamily:
                  "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif",
              }}
            >
              Contribute to Our Recipe App
            </h3>
            <div className=" text-center">
              <a
                href="https://paystack.com/pay/syb9hn035h"
                className="btn homebtn1"
              >
                Donate
              </a>
            </div>
          </div>
          <div className="col-md-2"></div>
        </div>
      </div>
    </div>
  );
};

export default Contribute;
