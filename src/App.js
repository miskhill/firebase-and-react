import "./App.css";
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Form from "./components/Form";
import Home from "./components/Home";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const navigate = useNavigate();

  //session storage destroyed when browser is closed.
  const handleAction = (id) => {
    const authentication = getAuth();
    if (id === 1) {
      signInWithEmailAndPassword(authentication, email, password)
        .then((response) => {
          navigate('/home')
          sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
        })
        .catch((error) => {
          console.log(error.code)
          if (error.code === 'auth/wrong-password') {
            toast.error('Please check the Password');
          }
          if (error.code === 'auth/user-not-found') {
            toast.error('Please check the Email');
          }
          if (error.code === 'auth/missing-email') {
            toast.error('Giles!!!');
          }
        })
    }
    if (id === 2) {
      createUserWithEmailAndPassword(authentication, email, password)
        .then((response) => {
          navigate('/home')
          sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
        })
        .catch((error) => {
          if (error.code === 'auth/email-already-in-use') {
            toast.error('Email Already in Use');
          }
        })
    }
  }

  useEffect(() => {
    let authToken = sessionStorage.getItem('Auth Token')

    if (authToken) {
      navigate('/home')
    }
  }, [])

  return (
    <div className='App'>
      <>
        <ToastContainer />
        <Routes>
          <Route
            path='/login'
            element={
              <Form
                title='Login'
                setEmail={setEmail}
                setPassword={setPassword}
                handleAction={() => handleAction(1)}
              />
            }
          />
          <Route
            path='/register'
            element={
              <Form
                title='Register'
                setEmail={setEmail}
                setPassword={setPassword}
                handleAction={() => handleAction(2)}
              />
            }
          />

          <Route path='/home' element={<Home />} />
        </Routes>
      </>
    </div>
  );
};

export default App;
