import { useState } from "react";
import { db } from "../firebaseClient";
import { collection, addDoc } from "firebase/firestore";

const AddBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "books"), {
      title,
      author,
      createdAt: new Date(),
      completed: false,
    });
    setTitle("");
    setAuthor("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Book</h3>
      <div className="input_container">
        <input
          type="text"
          placeholder="Enter book to read..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
          <input
          type="text"
          placeholder="Enter author name ..."
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>
      <div className="btn_container">
        <button>Add</button>
      </div>
    </form>
  );
};

export default AddBook;