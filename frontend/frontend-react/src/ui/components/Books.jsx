import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/books.css'

export default function Books({ books, setCurrentPage }) {

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
                <b>{book.title}</b><br /> {book.description}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
