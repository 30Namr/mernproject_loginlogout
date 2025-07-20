import logo from './logo.svg';
import './App.css';
import FetchUsers from './Components/FetchUsers';
import { Routes, Route } from 'react-router-dom';
import Signup from './Components/Pages/Signup';
import Login from './Components/Pages/Login';
import ForgorPassword from './Components/Pages/ForgorPassword';
import { useEffect, useState } from 'react';
import Navbar from './Components/Pages/Navbar.js';
import Home from './Components/Pages/Home';
import { Router } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [showLogin, setShowLogin] = useState(false);
  // const [user, setUser] = useState(null);

  // const handleLoginSuccess = (userData) => {
  //   setIsLoggedIn(true);
  //   setUser(userData);
  // };

  // const handleLogout = () => {
  //   setIsLoggedIn(false);
  //   setUser(null);
  // }

  const [user, setUser] = useState(null);
  // Load user from localStorage on first render
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem('user',JSON.stringify(userData)); // save user data to localStorage
    //clear from localStorage on logout
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user'); // clear from localStorage on logout
  }

  return (
    <>

      <>
        {/* {!isLoggedIn && <Navbar />}
        <Routes>

          <Route path="/" element={isLoggedIn ? (
            <Home user={user} onLogout={handleLogout} />
          ) : (
            <Navigate to="/login" />
          )
          }
          />

          <Route path="/login" element={ isLoggedIn ? (
                <Navigate to="/" />
              ) : (
                <Login onLoginSuccess={handleLoginSuccess} />
              )
            }
          />

          <Route path="/signup" element={ isLoggedIn ? (
            <Navigate to="/" />
            ) : (
            <Signup onLoginSuccess={handleLoginSuccess} />
            )
            }
            />
           
          <Route path="/forget-password" element={<ForgorPassword />} />
            
          <Route path="*" element={<h2>404 - Page Not Found</h2>} />
        </Routes> */}

        {/* navigate */}
      </>

      <>
          {!user && <Navbar />}
          <Routes>
            <Route path='/' element={
              user ? (
                <Home user={user} onLogout={handleLogout} />

              ) : (
                <Navigate to={"/login"} />
              )
            } />
            <Route
              path="/login"
              element={
                user ? (
                  <Navigate to="/" />
                ) : (
                  <Login onLoginSuccess={handleLoginSuccess} />
                )
              }
            />
            <Route
              path="/signup"
              element={
                user ? (
                  <Navigate to="/" />
                ) : (
                  <Signup onLoginSuccess={handleLoginSuccess} />
                )
              }
            />
            <Route path="/forgetpass" element={<ForgorPassword />} />
            <Route path="*" element={<h2>404 - Page Not Found</h2>} />
          </Routes>
    
      </>

      {/* {!isLoggedIn && (<Navbar
        onLoginClick={() => setShowLogin(true)}
        onSignUpClick={() => setShowLogin(false)} />
      )}

      {isLoggedIn ? (
        <Home user={user} onLogout={handleLogout} />

      ) : (
        <>
          {
            showLogin ? (
              <Login onLoginSuccess={handleLoginSuccess} />

            ) : (
              <Signup onLoginSuccess={handleLoginSuccess} />
            )
          }
          <ForgorPassword />
        </>
      )} */}

      {/* <FetchUsers/> */}
      {/* <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgetpassword" element={<ForgorPassword />} />
      </Routes> */}
    </>

  );
}

export default App;
