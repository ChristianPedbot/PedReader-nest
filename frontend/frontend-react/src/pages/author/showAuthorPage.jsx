import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { useParams , BrowserRouter,Route, Routes } from 'react-router-dom';
import Navbar from '../../ui/components/Navbar.jsx';
import Footer from '../../ui/components/Footer.jsx';
import Author from './Author.jsx';
import ProtectedRoute from '../../data/protection/ProtectedRoute.jsx';

const GET_AUTHOR = gql`
  query GetAuthor($id: Int!) {
    author(id: $id) {
      id
      name
      biography
      img
    }
  }
`;

function ShowAuthorPage() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_AUTHOR, {
    variables: { id: parseInt(id) }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <Navbar />
      <Author author={data.author} />
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
