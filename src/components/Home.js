import React from "react";
import { useEffect, useState } from 'react';
import { onSnapshot, collection, query, doc, getDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import AddBook from './addBook';
import Book from './book';
import { db } from '../firebaseClient';
import { useNavigate } from 'react-router-dom';

export default function Home() {

  const handleLogout = () => {
    sessionStorage.removeItem('Auth Token');
    navigate('/login')
}

let navigate = useNavigate();
  useEffect(() => {
      let authToken = sessionStorage.getItem('Auth Token')

      if (authToken) {
          navigate('/home')
      }

      if (!authToken) {
          navigate('/login')
      }
  }, [])

  
  const [books, setBooks] = useState([]);
  const toggleComplete = async (book) => {
    await updateDoc(doc(db, "books", book.id), { completed: !book.completed });
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "books", id));
  };
  
  useEffect(() => {
    const q = query(collection(db, "books"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let booksArray = [];
      querySnapshot.forEach((doc) => {
        booksArray.push({ ...doc.data(), id: doc.id });
      });
      setBooks(booksArray);
    });
    return () => unsub();
  }, []);

  return (
    <>
      <div>Home Page for Books</div>
      <div>
        <AddBook />
        <div className='task_container'>
          {books.map((book) => (
            <Book
              key={book.id}
              book={book}
              author={book.author}
              toggleComplete={toggleComplete}
              handleDelete={handleDelete}
            />
          ))}
        </div>
        <button onClick={handleLogout}>Log out</button>
      </div>
    </>
  );
}
