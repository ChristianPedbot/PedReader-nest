import React from 'react';
import { BrowserRouter, Routes, Route, createBrowserRouter } from 'react-router-dom';
import Carousel from '../../ui/components/Carousel.jsx';
import Genres from '../../ui/components/Genres.jsx';
import Footer from '../../ui/components/Footer.jsx';
import ProtectedRoute from '../../data/protection/ProtectedRoute.jsx';
import Navbar from '../../ui/components/Navbar.jsx';


function HomePage() {
  return (
    <div>
      <Navbar />  
      <Carousel />
      <Genres />
      <Footer />
    </div>
  );
}

export default function Home() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<ProtectedRoute element={<HomePage />} />} />
      </Routes>
    </BrowserRouter>
  );
}
