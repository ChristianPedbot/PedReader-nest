import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../ui/components/Navbar.jsx';
import Footer from '../../ui/components/Footer.jsx';
import BooksByGenress from './testebook2.jsx';
import Pagination from '../../ui/components/Pagination.jsx';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
function ShowBookByGenre() {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { categoryId } = useParams();

  useEffect(() => {
    const fetchBooks = async () => {
      if (categoryId && !isNaN(categoryId)) {
        try {
          const response = await axios.get(`http://localhost:3000/books/category/${categoryId}?page=${currentPage}`);
          setBooks(response.data);
        } catch (error) {
          toast.error(`Error when searching for books: ${error}`);
        }
      } else {
        toast.error('Invalid category ID');
      }
    };

    fetchBooks();
  }, [currentPage, categoryId]);

  return (
    <div>
      <Navbar />
      <BooksByGenress books={books} currentPage={currentPage} setCurrentPage={setCurrentPage} />
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
