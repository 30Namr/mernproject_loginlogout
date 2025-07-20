import React, { useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';



function Signup() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:5000/api/users/signup', {
                name,
                email,
                password,
            });
            setMsg('User registered successfully');
        } catch (err) {
            //optional error chaining
            //err.response exists // err.response.data.exists // error.response.data.message exists
            setMsg(err.response?.data?.message || 'Signup failed');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold text-center mb-6">Signup</h2>
                <p>{msg}</p>
                <form onSubmit={handleSignup} className="space-y-4">

                    <div>
                        <label className="block mb-1 font-medium">Name</label>
                        <input type="text" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Email</label>
                        <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Password</label>
                        <input type="text" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300">Signup</button>

                </form>
                <p className="text-sm text-center mt-4">
                    Already have an account?{''}
                    <Link to="/login" className="text-blue-500 hover:underline">
                        Log In
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Signup