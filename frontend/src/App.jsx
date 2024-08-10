import React from "react"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from "./components/Footer";

import Navbar from "./components/Navbar"
import Authenticate from "./auth/Authenticate";
import Recipes from "./pages/Recipes";
import Welcome from "./pages/Welcome";
import Contribute from "./pages/Contribute";
import TermsOfService from "./pages/TermsOfService";
import MyCollections from "./pages/MyCollections";
import CommentForm from "./pages/CommentForm";

import RecipeForm from "./pages/RecipeForm";

function App() {
  
  return (
    <>
      <Router>
        <div className="d-flex flex-column min-vh-100">
          <main className="flex-grow-1">
            <Navbar />
            <Routes>
              <Route path="/login" element={<Authenticate />} />
              <Route path="/register" element={<Authenticate />} />
              <Route path="/" element={<Recipes />} />
              <Route path="/about" element={<Welcome />} />
              <Route path="/contribute" element={<Contribute />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/mycollections" element={<MyCollections />} />
              <Route path="/commentform" element={<CommentForm />} />
              <Route path="/recipeform" element={<RecipeForm />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
      
    </>
  );
}

export default App
