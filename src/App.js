import { colRef } from './Firebase-config';
import { useEffect } from 'react';
import './App.css';

function App() {

  // useEffect(() => { 
  //   //fetch books from firestore
  //   colRef.get()
  //     .then((snapshot) => {
  //       let books = [];
  //       snapshot.docs.forEach((doc) => {
  //         books.push({ ...doc.data(), id: doc.id });
  //       });
  //       console.log(books);
  //     }).catch ((err) => {
  //       console.log(err);
  //     })
  // },[])
    
    
  return (
    <div className="App">
    <p>lol</p>
    </div>
  );
}

export default App;
