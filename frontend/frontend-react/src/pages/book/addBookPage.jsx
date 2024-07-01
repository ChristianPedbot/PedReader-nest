import React from 'react';
import { useQuery } from '@apollo/client';
import Navbar from '../../ui/components/Navbar.jsx';
import Footer from '../../ui/components/Footer.jsx';
import ProtectedRouteAdmin from '../../data/protection/AdminProtectedRoute.jsx';
import AddBook from './AddBook.jsx';
import { GET_AUTHORS } from '../../data/mutations/getAuthors.js';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


function AddBookPage() {
  const { loading, error, data } = useQuery(GET_AUTHORS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <Navbar />
      <AddBook authors={data.authors} />
      <Footer />
    </div>
  );
}

export default function AddingBook() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/book/add" element={<ProtectedRouteAdmin element={<AddBookPage />} />} />
      </Routes>
    </BrowserRouter>
  );
}
