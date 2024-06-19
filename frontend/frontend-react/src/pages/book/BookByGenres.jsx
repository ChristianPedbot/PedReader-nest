import React from 'react';
import { Link } from 'react-router-dom';
import '../../ui/styles/components/books.css';

export default function BooksByGenres({ books, setCurrentPage }) {

  if (books.length === 0) {
    setCurrentPage(1);
  }

  return (
    <div className='container-card'>
      <div className="cards">
        {books.map(book => (
          <div className={`card ${book.availability ? 'unavailable' : 'available'}`} key={book.id}>
            <Link to={`/books/${book.id}`} className="book-link" reloadDocument>
              <img src={book.img} alt={book.title} />
              <p className={`card-desc ${book.availability ? 'unavailable-desc' : 'available-desc'}`}>
                {book.title}<br />Rating: {book.rating} <br /> {book.description}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
