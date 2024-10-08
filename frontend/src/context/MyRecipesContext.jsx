import React, { useState, useEffect, createContext } from "react";
import { BASE_URL } from "../utils/config";

//const BACKEND_URL = "http://localhost:5000/api/v1";

export const MyRecipesContext = createContext();

export const MyRecipesProvider = ({ children }) => {
const [recipes, setRecipes] = useState([]);

useEffect(() => {
const getRecipes = async () => {
    const response = await fetch(`${BASE_URL}/recipes`, {
        method: 'GET',
        headers: { "Content-Type": "application/json" }
    });
    const data = await response.json();
    setRecipes(data);
}
getRecipes()
}, []);

return <MyRecipesContext.Provider value={{recipes, setRecipes}}>
    {children}
</MyRecipesContext.Provider>

}
