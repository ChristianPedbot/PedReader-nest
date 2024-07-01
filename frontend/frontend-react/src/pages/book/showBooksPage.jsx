import React from 'react';
import { useQuery, gql } from '@apollo/client';
import Navbar from '../../ui/components/Navbar.jsx';
import Footer from '../../ui/components/Footer.jsx';
import Books from '../../ui/components/Books.jsx';
import Pagination from '../../ui/components/Pagination.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { toast } from 'react-toastify';
import ProtectedRoute from '../../data/protection/ProtectedRoute.jsx';

const GET_BOOKS = gql`
  query {
    books {
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

function ShowBookPage() {
  const [currentPage, setCurrentPage] = React.useState(1);

  const { loading, error, data, fetchMore } = useQuery(GET_BOOKS, {
    variables: { page: currentPage },
  });

  React.useEffect(() => {
    if (error) {
      toast.error(`Error fetching books: ${error.message}`);
    }
  }, [error]);

  const loadNextPage = () => {
    fetchMore({
      variables: {
        page: currentPage + 1,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          ...prev,
          books: [...prev.books, ...fetchMoreResult.books],
        };
      },
    });
    setCurrentPage(currentPage + 1);
  };

  if (loading) return <p>Loading books...</p>;
  if (error) return <p>Error fetching books: {error.message}</p>;

  return (
    <div>
      <Navbar />
      <Books books={data.books} />
      <Pagination currentPage={currentPage} onNextPage={loadNextPage} hasNextPage={data.books.length > 0} />
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
  );
}
