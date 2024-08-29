import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Login from "./Login";
import Registration from "./Register";
import ForgotPassword from "./ForgotPassword";

const Authenticate = () => {
  const location = useLocation();
  const isLogin = location.pathname === "/login";
  const [showLogin, setShowLogin] = useState(isLogin);
  const [showForgotPassword, setShowForgotPassword] = useState(false);


  // Update `showLogin` based on the current path
  React.useEffect(() => {
    setShowLogin(isLogin);
    setShowForgotPassword(false); // Reset the forgot password view when switching routes
  }, [location.pathname, isLogin]);

  return (
    <>
      {showForgotPassword ? (
        <ForgotPassword setShowForgotPassword={setShowForgotPassword} />
      ) : showLogin ? (
        <Login
          setShowLogin={setShowLogin}
          setShowForgotPassword={setShowForgotPassword}
        />
      ) : (
        <Registration setShowLogin={setShowLogin} />
      )}
    </>
  );
};

export default Authenticate;
