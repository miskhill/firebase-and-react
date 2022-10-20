import "./App.css";
import { useEffect, useState } from "react";
import Book from './components/book';
import AddBook from './components/addBook';
import {
  collection,
  query,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./firebaseClient";

const App = () => {
  const [books, setBooks] = useState([]);

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

  const toggleComplete = async (book) => {
    await updateDoc(doc(db, "books", book.id), { completed: !book.completed });
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "books", id));
  };
  return (
    <div>
      <AddBook />
      <div className="task_container">
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
    </div>
  );
};

export default App;
