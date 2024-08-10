import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Login from "./Login";
import Registration from "./Register";

const Authenticate = () => {
    const location = useLocation();
    const isLogin = location.pathname === "/login";
  const [showLogin, setShowLogin] = useState(isLogin);

    // Update `showLogin` based on the current path
    React.useEffect(() => {
        setShowLogin(isLogin);
    }, [location.pathname, isLogin]);

  return (
    <>
      {showLogin ? (
        <Login setShowLogin={setShowLogin} />
      ) : (
        <Registration setShowLogin={setShowLogin} />
      )}
    </>
  );
};

export default Authenticate;
