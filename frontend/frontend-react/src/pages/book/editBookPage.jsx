import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import Navbar from '../../ui/components/Navbar.jsx';
import Footer from '../../ui/components/Footer.jsx';
import ProtectedRouteAdmin from '../../data/protection/AdminProtectedRoute.jsx';
import EditBooks from './EditBook.jsx';

function EditBookApp() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    const fetchBookAndAuthor = async () => {
      try {
        const bookResponse = await axios.get(`http://localhost:3000/books/${id}`);
        const fetchedBook = bookResponse.data;
        setBook(fetchedBook);

        if (fetchedBook.author.id) {
          const authorResponse = await axios.get(`http://localhost:3000/authors/${fetchedBook.author.id}`);
          setAuthor(authorResponse.data);
        } else {
          setAuthor(null);
        }
      } catch (error) {
        console.error('Error fetching book and author:', error);
      }
    };

    fetchBookAndAuthor();
  }, [id]);

  return (
    <div>
      <Navbar />
      <EditBooks book={book} author={author} />
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
