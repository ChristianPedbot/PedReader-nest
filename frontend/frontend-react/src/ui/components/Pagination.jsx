import React from 'react';
import '../styles/components/pagination.css';

function Pagination({ currentPage, totalPages, setCurrentPage }) {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;
  const shouldDisableNext = currentPage >= totalPages;

  const handlePrevClick = () => {
    if (!isFirstPage) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (!isLastPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li key={i} className={currentPage === i ? 'active' : ''}>
          <a href="#" onClick={() => setCurrentPage(i)}>{i}</a>
        </li>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="container">
      <ul className="pagination">
        <li>
          <a href="#" onClick={handlePrevClick} disabled={isFirstPage}>
            Prev
          </a>
        </li>
        {renderPageNumbers()}
        <li>
          <a href="#" onClick={handleNextClick} disabled={isLastPage || shouldDisableNext}>
            Next
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Pagination;
