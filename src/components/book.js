import React from "react";

const Book = ({ book, toggleComplete, handleDelete }) => {
  return (
    <div className="task">
      <p
        style={{ textDecoration: book.completed && "line-through" }}
        onClick={() => toggleComplete(book)}
      >
        {book.title} by {book.author}
      </p>

      <button onClick={() => handleDelete(book.id)}>X</button>
    </div>
  );
};

export default Book;