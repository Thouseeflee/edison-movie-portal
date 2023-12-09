// Pagination.js
import React from 'react';

const Pagination = ({
  currentPage,
  totalPages,
  goToPage,
  goToPrevPage,
  goToNextPage,
}) => {
  const maxPageNumbers = 8;

  const startPage = Math.max(1, currentPage - Math.floor(maxPageNumbers / 2));
  const endPage = Math.min(totalPages, startPage + maxPageNumbers - 1);

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(
      <button
        key={i}
        onClick={() => goToPage(i)}
        className={`mx-1 px-3 py-1 rounded-md ${
          currentPage === i ? 'bg-gray-300' : 'bg-gray-200'
        }`}
      >
        {i}
      </button>
    );
  }

  return (
    <div className="flex justify-center items-center mt-4 flex-wrap">
      {currentPage > 1 && (
        <button
          onClick={goToPrevPage}
          className="mx-1 px-3 py-1 rounded-md bg-gray-200"
        >
          Prev
        </button>
      )}
      {startPage > 1 && (
        <button
          onClick={() => goToPage(1)}
          className="mx-1 px-3 py-1 rounded-md bg-gray-200"
        >
          1
        </button>
      )}
      {startPage > 2 && (
        <span className="mx-1 px-3 py-1 rounded-md bg-gray-200">...</span>
      )}
      {pages}
      {endPage < totalPages && (
        <span className="mx-1 px-3 py-1 rounded-md bg-gray-200">...</span>
      )}
      {currentPage < totalPages && (
        <button
          onClick={goToNextPage}
          className="mx-1 px-3 py-1 rounded-md bg-gray-200"
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Pagination;
