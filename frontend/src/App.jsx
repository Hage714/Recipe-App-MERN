import React from "react"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from "./components/Footer";

import Navbar from "./components/Navbar"
import Register from "./auth/Register"
import Login from "./auth/Login";
import Recipes from "./pages/Recipes";
import Welcome from "./pages/Welcome";
import Contribute from "./pages/Contribute";
import TermsOfService from "./pages/TermsOfService";



function App() {
  
  return (
    <>
    <Router>
            <div className="d-flex flex-column min-vh-100">
        <main className="flex-grow-1">

      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        
        <Route path="/" element={<Recipes />} />
        <Route path="/about" element={<Welcome />} />
        <Route path="/contribute" element={<Contribute />} />
        <Route path="/terms" element={<TermsOfService />} />
      </Routes>
      
      </main>
      <Footer />
      </div>
      </Router>
    </>
  )
}

export default App
