import React from 'react';
import { useParams , BrowserRouter,Route, Routes } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import Navbar from '../../ui/components/Navbar.jsx';
import Footer from '../../ui/components/Footer.jsx';
import Book from './book.jsx';
import ProtectedRoute from '../../data/protection/ProtectedRoute.jsx';

const GET_BOOK_DETAILS = gql`
  query GetBookDetails($id: Int!) {
    book(id: $id) {
      id
      title
      description
      img
      availability
      date
      author {
        id
        name
      }
      category {
        id
        name
      }
    }
  }
`;

function BookPage() {
  const { id } = useParams();

  const { loading, error, data } = useQuery(GET_BOOK_DETAILS, {
    variables: { id: Number(id) },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { book } = data;

  return (
    <div>
      <Navbar />
      <Book book={book} />
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
