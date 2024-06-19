import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../ui/components/Navbar.jsx';
import Footer from '../../ui/components/Footer.jsx';
import Books from '../../ui/components/Books.jsx';
import Pagination from '../../ui/components/Pagination.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { toast } from 'react-toastify';
import ProtectedRoute from '../../data/protection/ProtectedRoute.jsx';

function ShowBookPage() {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/books?page=${currentPage}`);
        setBooks(response.data);
        const nextResponse = await axios.get(`http://localhost:3000/books?page=${currentPage + 1}`);
        setHasNextPage(nextResponse.data.length > 0);
      } catch (error) {
        toast.error('Error when searching for books:', error);
      }
    };

    fetchBooks();
  }, [currentPage]);

  return (
    <div>
      <Navbar />
      <Books books={books} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} hasNextPage={hasNextPage} />
      <Footer />
    </div>
  );
}

export default function AppBookPage() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/books" element={<ProtectedRoute element={<ShowBookPage />} />} />
      </Routes>
    </BrowserRouter>
  )
}
