import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handlePasswordReset = async (e) => {
        e.preventDefault();

        if (!email || !oldPassword || !newPassword || !confirmPassword) {
            setError('All fields are required');
            setMessage('');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('New passwords do not match');
            setMessage('');
            return;
        }

        try {
            const res = await axios.post('http://localhost:5000/api/users/forgetpass', {
                email,
                oldPassword,
                newPassword,
            });

            setMessage(res.data.message);
            setError('');
            setEmail('');
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (err) {
            setError(err.response?.data?.message || 'Password update failed');
            setMessage('');
        }
    };


    return (

        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Forgot Password</h2>
                {message && <p style={{ color: 'green' }}>{message}</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}

                <form className="space-y-5" onSubmit={handlePasswordReset}>
                    <div>
                        <label className="block mb-1 font-medium text-gray-700">Email</label>
                        <input type="email" placeholder="Enter Email" value={email}
                            onChange={(e) => setEmail(e.target.value)} required
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium text-gray-700">Old Password:</label>
                        <input
                            type="text"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>


                    <div>
                        <label className="block mb-1 font-medium text-gray-700">New Password</label>
                        <input
                            type="text"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            placeholder="Enter new password"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium text-gray-700">Confirm Password</label>
                        <input
                            type="text"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            placeholder="Confirm new password"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-300"
                    >Save
                    </button>
                     <Link to="/login" className="text-sm text-blue-600 hover:underline" >
                        Login
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default ForgotPassword;
