import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../ui/styles/user/userBooks.css';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function UserBooks({ userId }) {
  const [userBooks, setUserBooks] = useState([]);

  useEffect(() => {
    const fetchUserBooks = async () => {
        const response = await axios.get(`http://localhost:3000/locations/user/${userId}`);
        const locations = response.data;

        const booksWithReturnDates = locations.map(location => ({
          ...location.book,
          returnDate: location.return_date.split("T")[0]
        }));

        setUserBooks(booksWithReturnDates);
    };

    fetchUserBooks();
  }, [userId]);

  return (
    <div className="row row-cols-1 row-cols-md-3 g-4">
      {userBooks.map((book, index) => (
        <div key={`${book.id}-${index}`} className="col">
          <div className="card-user-book">
            <div className="card-user-book-body">
              <h5 className="card-user-book-title">{book.title}</h5>
              <p className='mb-3 mt-3'>Return Date:</p>
              <p className="card-user-book-text"><li>{book.returnDate}</li></p>
              <Link to={`/books/${book.id}`} className="book-link" reloadDocument>
                <button className="btn btn-primary">View book</button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
