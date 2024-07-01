import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import Navbar from '../../ui/components/Navbar.jsx';
import Footer from '../../ui/components/Footer.jsx';
import ProtectedRouteAdmin from '../../data/protection/AdminProtectedRoute.jsx';
import EditBooks from './EditBook.jsx';
import { GET_BOOK_DETAILS } from '../../data/mutations/getBookDetails.js';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function EditBookApp() {
  const { id } = useParams();

  const { loading, error, data } = useQuery(GET_BOOK_DETAILS, {
    variables: { id: parseInt(id) },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const book = data?.book;

  return (
    <div>
      <Navbar />
      {book ? <EditBooks book={book} /> : <p>No book found</p>}
      <Footer />
    </div>
  );
}

function ShowEditBook() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/books/:id/edit" element={<ProtectedRouteAdmin element={<EditBookApp />} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default ShowEditBook;
