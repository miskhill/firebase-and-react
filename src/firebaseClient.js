import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signOut } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//init services
const db = getFirestore(app);
const auth = getAuth();

//collection ref tidy the data
export const colRef = collection(db, "books");

  //logout function
  const handleLogout = () => {

    const logout = async () => {
      try {
        await signOut(auth);
        console.log("user logged out")
      } catch (error) {
        console.log(error.message);
      }
    };
  
    return { logout };
  };

export { db, auth, handleLogout };
