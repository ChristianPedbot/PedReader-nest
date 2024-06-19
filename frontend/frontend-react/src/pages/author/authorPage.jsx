import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from '../../ui/components/Navbar.jsx';
import Footer from '../../ui/components/Footer.jsx';
import EditAuthor from './EditAuthorPage.jsx';
import AddAuthor from './AddAuthor.jsx';
import ProtectedRouteAdmin from '../../data/protection/AdminProtectedRoute.jsx';

function ShowEditAuthor() {
  return (
    <div>
      <Navbar />
      <EditAuthor />
      <Footer />
    </div>
  );
}

function ShowAddAuthor() {
  return (
    <div>
      <Navbar />
      <AddAuthor />
      <Footer />
    </div>
  );
}

export default function AuthorApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/authors/:id/edit" element={<ProtectedRouteAdmin element={<ShowEditAuthor />} />} />
      </Routes>
      <Routes>
        <Route path="/authors/add" element={<ProtectedRouteAdmin element={<ShowAddAuthor />} />} />
      </Routes>
    </BrowserRouter>
  );
}


