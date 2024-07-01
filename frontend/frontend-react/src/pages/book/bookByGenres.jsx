import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import Navbar from '../../ui/components/Navbar.jsx';
import Footer from '../../ui/components/Footer.jsx';
import BooksByGenres from './BookByGenre.jsx';
import Pagination from '../../ui/components/Pagination.jsx';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { GET_BOOKS_BY_CATEGORY } from '../../data/mutations/getBooksByCategory.js';

function ShowBookByGenre() {
  const [currentPage, setCurrentPage] = useState(1);
  const { categoryId } = useParams();

  const { loading, error, data } = useQuery(GET_BOOKS_BY_CATEGORY, {
    variables: { categoryId: Number(categoryId), page: currentPage },
  });

  useEffect(() => {
    if (error) {
      toast.error(`Error when searching for books: ${error.message}`);
    }
  }, [error]);

  const books = data ? data.booksByCategory : [];

  return (
    <div>
      <Navbar />
      <BooksByGenres books={books} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <Footer />
    </div>
  );
}

export default function AppBookByGenre() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/books/category/:categoryId" element={<ShowBookByGenre />} />
      </Routes>
    </BrowserRouter>
  );
}
