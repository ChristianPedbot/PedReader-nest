import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../ui/styles/user/userBooks.css'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function UserBooks({ userId }) {
  const [userBooks, setUserBooks] = useState([]);
  const [returnDates, setReturnDates] = useState({});

  useEffect(() => {
    const fetchUserBooks = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/users/${userId}/books`);
        const userBookIds = response.data.bookIds;

        const booksPromises = userBookIds.map(async (bookId) => {
          try {
            const bookResponse = await axios.get(`http://localhost:3000/book/${bookId}`);
            return bookResponse.data;
          } catch (error) {
            toast.error(`Error getting book details with ID ${bookId}: ${error.message}`);
            return null;
          }
        });

        const books = await Promise.all(booksPromises);
        const filteredBooks = books.filter(book => book !== null);

        setUserBooks(filteredBooks);
      } catch (error) {
        toast.error(`Error getting books from user: ${error.message}`);
      }
    };

    fetchUserBooks();
  }, [userId]);

  useEffect(() => {
    const fetchReturnDates = async () => {
      try {
        const returnDates = {};
        for (const book of userBooks) {
          const response = await axios.get(`http://localhost:3000/locations/${book.id}/returnDate`);
          const returnDate = response.data.return_date;
          const separatedDate = returnDate.split("T");
          const formattedDate = separatedDate[0];
          returnDates[book.id] = formattedDate;
        }
        setReturnDates(returnDates);
      } catch (error) {
        toast.error(`Error getting return dates: ${error.message}`);
      }
    };

    if (userBooks.length > 0) {
      fetchReturnDates();
    }
  }, [userBooks]);

  return (
    <div className="row row-cols-1 row-cols-md-3 g-4">
      {userBooks.map(book => (
        <div key={book.id} className="col">
          <div className="card-user-book">
            <div className="card-user-book-body">
              <h5 className="card-user-book-title">{book.title}</h5>
              <p className='mb-3 mt-3'>Return Date:</p>
              <p className="card-user-book-text"><li>{returnDates[book.id]}</li></p>
              <Link to={`/books/${book.id}`} className="book-link" reloadDocument>
                <a className="btn btn-primary">View book</a>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
