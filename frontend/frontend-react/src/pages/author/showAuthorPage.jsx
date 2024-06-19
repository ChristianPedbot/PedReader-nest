import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../ui/components/Navbar.jsx';
import Footer from '../../ui/components/Footer.jsx';
import Author from './Author.jsx';
import ProtectedRoute from '../../data/protection/ProtectedRoute.jsx';

function ShowAuthorPage() {
  const { id } = useParams();
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const authorResponse = await axios.get(`http://localhost:3000/authors/${id}`);
        setAuthor(authorResponse.data);
      } catch (error) {
      }
    };

    fetchAuthor();
  }, [id]);

  return (
    <div>
      <Navbar />
      <Author author={author} />
      <Footer />
    </div>
  );
}

function ShowAuthor() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/authors/:id" element={<ProtectedRoute element={<ShowAuthorPage />} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default ShowAuthor;
