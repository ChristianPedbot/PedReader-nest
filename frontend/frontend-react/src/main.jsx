import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Home from './pages/home/HomePage.jsx';
import ShowBook from './pages/book/bookPage.jsx';
import AddingBook from './pages/book/addBookPage.jsx';
import ShowUser from './pages/user/userPage.jsx';
import AppBookPage from './pages/book/showBooksPage.jsx';
import AuthorApp from './pages/author/authorPage.jsx';
import ShowAuthor from './pages/author/showAuthorPage.jsx';
import ShowEditBook from './pages/book/editBookPage.jsx';
import IndexApp from './pages/index/indexPage.jsx';
import AppBookByGenre from './pages/book/bookByGenres.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql', 
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <IndexApp />
      <Home />
      <AppBookByGenre />
      <AppBookPage />
      <ShowBook />
      <AuthorApp />
      <ShowAuthor />
      <AddingBook />
      <ShowEditBook />
      <ShowUser />
      <ToastContainer />
    </ApolloProvider>
  </React.StrictMode>
);
