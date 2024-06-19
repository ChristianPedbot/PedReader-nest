import { BrowserRouter, Routes, Route, useParams, Navigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../ui/components/Navbar.jsx';
import Footer from '../../ui/components/Footer.jsx';
import Book from './book.jsx';
import axiosInstance from '../../data/axios/axios.js';
import ProtectedRoute from '../../data/protection/ProtectedRoute.jsx';


function BookPage() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const bookResponse = await axiosInstance.get(`/books/${id}`);
        setBook(bookResponse.data);

        const authorId = bookResponse.data.author_id;

        const authorResponse = await axiosInstance.get(`/authors/${authorId}`);
        setAuthor(authorResponse.data);
      } catch (error) {
      }
    };

    fetchBook();
  }, [id]);

  return (
    <div>
      <Navbar />
      <Book book={book} author={author} />
      <Footer />
    </div>
  );
}

function ShowBook() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/books/:id"
          element={<ProtectedRoute element={<BookPage />} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default ShowBook;
