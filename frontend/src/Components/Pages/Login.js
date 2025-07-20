import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [loginStatus, setLoginStatus] = useState('');
  const [error, setError] = useState('');

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await axios.post('http://localhost:5000/api/users/login', { email, password });
  //     setLoginStatus(`Welcome, ${res.data.user.name}!`);
  //     setError('');
  //   } catch (err) {
  //     setError(err.response?.data?.error || 'Login Failed');
  //     setLoginStatus('');
  //   }
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError('');
  //   try {
  //     const res = await axios.post('http://localhost:5000/api/users/login', { email, password });
  //     if (res.data && res.data.user) {
  //       onLoginSuccess(res.data.user);
  //     }
  //   }

  //   catch (err) {
  //     setError(err.response?.data?.message || 'Login failed');
  //   }
  // };
  //without jsn token

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try{
      const res = await axios.post('http://localhost:5000/api/users/login',{email,password});
      if(res.data && res.data.user && res.data.token){
        const userData = {
          ...res.data.user,
          //include id , name, email,isAdmin
          token:res.data.token,
        };

        //saveuser and token to localstorage
        localStorage.setItem('user',JSON.stringify(userData));

        //passuser + token to app
        onLoginSuccess(userData);
      }
      else{
        setError("Login failed : Missing token or user");
      }
    }
    catch(err){

      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        {/* {loginStatus && <p className="text-green-600 mb-4 text-center">{loginStatus}</p>} */}
        {error && <p className="text-red-600 mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 font-medium text-gray-700">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
          >
            Login
          </button>
        </form>

        <div className="mt-4 flex justify-between">
          <Link to="/forgetpassword" className="text-sm text-blue-600 hover:underline" >
            Forgot Password?
          </Link>

          {/* <button type="button" className="text-sm text-red-600 hover:underline" onClick={() => {
            setEmail('');
            setPassword('');
            // setLoginStatus('');
            setError('');
          }}
          >
            Logout
          </button> */}
        </div>
      </div>
    </div>
  );
}

export default Login;
