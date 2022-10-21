import "./App.css";
import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Book from "./components/book";
import AddBook from "./components/addBook";
import Form from "./components/Form";
import {
  collection,
  query,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db, auth, handleLogout } from "./firebaseClient";

const App = () => {
  const [books, setBooks] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  //create an onclick for a firebase signup
  // const handleSignup = async () => {
  //   try {
  //     const userCredential = await auth.createUserWithEmailAndPassword(
  //       setEmail,
  //       setPassword
  //     );
  //     console.log(userCredential);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  //creata a handleClick function
  // const handleClick = (e) => {
  //   console.log("clicked");
  //   e.preventDefault();
  // };

  return (
    <Router>
      <div className="App">
      <Form />
    </div>
      {/* <form className='signup'>
        <button onClick={handleSignup}>signup</button>
        <button onClick={handleClick}>login</button>
        <button onClick={handleLogout}>logout</button>
        <h6>Sign Up</h6>
        <div className='input_container'>
          <input type='text' placeholder='Enter your email' />
          <input type='text' placeholder='Enter your password' />
        </div>
        <h6>Login</h6>
        <div className='input_container'>
          <input type='text' placeholder='Enter your email' />
          <input type='text' placeholder='Enter your password' />
        </div>
      </form> */}
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
      </div>
      </Router>
  );
};

export default App;
